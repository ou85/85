#!/usr/bin/env python3
"""Check local links and resources in this static website."""

from __future__ import annotations

import argparse
import os
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


SKIP_DIRECTORIES = {".git", ".github", "node_modules", "tmp"}
EXTERNAL_SCHEMES = {"http", "https", "mailto", "tel", "data", "javascript", "blob"}
CSS_URL_PATTERN = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE | re.DOTALL)
CSS_IMPORT_PATTERN = re.compile(r"@import\s+(['\"])(.*?)\1", re.IGNORECASE)
JS_LINK_PATTERN = re.compile(r"\b(?:link|href)\s*:\s*(['\"])(.*?)\1", re.DOTALL)
JS_SET_ATTRIBUTE_PATTERN = re.compile(
    r"setAttribute\(\s*(['\"])(?:href|src|poster)\1\s*,\s*(['\"])(.*?)\2\s*\)",
    re.IGNORECASE | re.DOTALL,
)
JS_IMAGE_TEMPLATE_PATTERN = re.compile(
    r"\$\{\s*(\w+)\s*\}\s*/\s*\$\{\s*(\w+)\s*\}\.(jpg|jpeg|png|gif|webp|avif)",
    re.IGNORECASE,
)
JS_DIRECTORY_PATTERN = re.compile(r"\b(?:const|let|var)\s+(\w+)\s*=\s*(['\"])(.*?)\2")
JS_LOOP_RANGE_PATTERN = re.compile(
    r"for\s*\(\s*(?:const|let|var)\s+(\w+)\s*=\s*(\d+)\s*;\s*\1\s*<=\s*(\d+)",
    re.IGNORECASE,
)
JS_IMAGE_COUNT_PATTERN = re.compile(r"\bamountOf\w*\s*=\s*(\d+)", re.IGNORECASE)


class PageParser(HTMLParser):
    """Collect local references, anchors, and inline CSS/JavaScript."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, int, str, bool]] = []
        self.anchors: set[str] = set()
        self.inline_styles: list[tuple[str, int]] = []
        self.inline_scripts: list[tuple[str, int]] = []
        self.base_href: str | None = None
        self._capture: str | None = None
        self._capture_line = 0
        self._capture_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        line = self.getpos()[0]

        for key in ("id", "name"):
            if values.get(key):
                self.anchors.add(values[key] or "")

        if tag == "base" and values.get("href") and self.base_href is None:
            self.base_href = values["href"]

        reference_attributes = {
            "a": ("href",),
            "area": ("href",),
            "link": ("href",),
            "script": ("src",),
            "img": ("src",),
            "source": ("src",),
            "video": ("src", "poster"),
            "audio": ("src",),
            "track": ("src",),
            "iframe": ("src",),
            "embed": ("src",),
            "object": ("data",),
            "input": ("src",),
        }
        for attribute in reference_attributes.get(tag, ()):
            value = values.get(attribute)
            if value:
                is_anchor = tag in {"a", "area"} and attribute == "href"
                self.references.append((value, line, attribute, is_anchor))

        if values.get("srcset"):
            for candidate in values["srcset"].split(","):
                value = candidate.strip().split()
                if value:
                    self.references.append((value[0], line, "srcset", False))

        if values.get("style"):
            self.inline_styles.append((values["style"], line))

        if tag in {"style", "script"}:
            self._capture = tag
            self._capture_line = line
            self._capture_parts = []

    def handle_data(self, data: str) -> None:
        if self._capture:
            self._capture_parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag != self._capture:
            return
        content = "".join(self._capture_parts)
        if tag == "style":
            self.inline_styles.append((content, self._capture_line))
        else:
            self.inline_scripts.append((content, self._capture_line))
        self._capture = None
        self._capture_parts = []


class LinkChecker:
    def __init__(self, root: Path) -> None:
        self.root = root.resolve()
        self.errors: set[str] = set()
        self.checked_css: set[Path] = set()
        self.checked_js: set[tuple[Path, Path]] = set()
        self.html_cache: dict[Path, PageParser] = {}
        self.css_count = 0
        self.js_count = 0
        self.numbered_image_count = 0

    def html_files(self) -> list[Path]:
        files: list[Path] = []
        for current, directories, names in os.walk(self.root):
            directories[:] = [
                name
                for name in directories
                if name not in SKIP_DIRECTORIES and not name.startswith(".")
            ]
            current_path = Path(current)
            files.extend(
                current_path / name for name in names if name.lower().endswith((".html", ".htm"))
            )
        return sorted(files)

    def parse_html(self, path: Path) -> PageParser:
        path = path.resolve()
        if path not in self.html_cache:
            parser = PageParser()
            try:
                parser.feed(path.read_text(encoding="utf-8", errors="replace"))
            except OSError as error:
                self.errors.add(f"{self.relative(path)}: cannot read HTML ({error})")
            self.html_cache[path] = parser
        return self.html_cache[path]

    def relative(self, path: Path) -> str:
        try:
            return path.resolve().relative_to(self.root).as_posix()
        except ValueError:
            return path.as_posix()

    def resolve_reference(self, value: str, document: Path, base_directory: Path | None = None) -> tuple[Path | None, str]:
        value = value.strip()
        if not value:
            return None, ""

        parts = urlsplit(value)
        if parts.scheme.lower() in EXTERNAL_SCHEMES or parts.netloc:
            return None, parts.fragment

        path_text = unquote(parts.path)
        if not path_text:
            target = document
        elif path_text.startswith("/"):
            target = self.root / path_text.lstrip("/")
        else:
            target = (base_directory or document.parent) / path_text

        target = target.resolve()
        if target.is_dir():
            target = target / "index.html"
        return target, parts.fragment

    def check_reference(
        self,
        value: str,
        source: Path,
        line: int,
        attribute: str,
        is_anchor: bool = False,
        base_directory: Path | None = None,
    ) -> None:
        target, fragment = self.resolve_reference(value, source, base_directory)
        if target is None:
            return

        label = f"{self.relative(source)}:{line}: {attribute}={value!r}"
        if not target.exists():
            self.errors.add(f"{label} -> missing {self.relative(target)}")
            return

        if is_anchor and fragment and target.suffix.lower() in {".html", ".htm"}:
            parser = self.parse_html(target)
            if unquote(fragment) not in parser.anchors:
                self.errors.add(f"{label} -> missing anchor #{unquote(fragment)} in {self.relative(target)}")

        if target.suffix.lower() == ".css":
            self.check_css(target)
        elif target.suffix.lower() in {".js", ".mjs"}:
            self.check_js(target, source)

    def check_css_text(self, text: str, source: Path, base_directory: Path, line_offset: int = 0) -> None:
        patterns = (
            (CSS_URL_PATTERN, 2),
            (CSS_IMPORT_PATTERN, 2),
        )
        for pattern, group in patterns:
            for match in pattern.finditer(text):
                value = match.group(group).strip()
                line = line_offset + text.count("\n", 0, match.start()) + 1
                self.check_reference(value, source, line, "CSS URL", base_directory=base_directory)

    def check_css(self, path: Path) -> None:
        path = path.resolve()
        if path in self.checked_css:
            return
        self.checked_css.add(path)
        self.css_count += 1
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError as error:
            self.errors.add(f"{self.relative(path)}: cannot read CSS ({error})")
            return
        self.check_css_text(text, path, path.parent)

    def check_js(self, path: Path, document: Path) -> None:
        path = path.resolve()
        key = (path, document.resolve())
        if key in self.checked_js:
            return
        self.checked_js.add(key)
        self.js_count += 1
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError as error:
            self.errors.add(f"{self.relative(path)}: cannot read JavaScript ({error})")
            return

        for match in JS_LINK_PATTERN.finditer(text):
            value = match.group(2).strip()
            line = text.count("\n", 0, match.start()) + 1
            self.check_reference(value, path, line, "JavaScript link", base_directory=document.parent)

        for match in JS_SET_ATTRIBUTE_PATTERN.finditer(text):
            value = match.group(3).strip()
            line = text.count("\n", 0, match.start()) + 1
            self.check_reference(value, path, line, "JavaScript attribute", base_directory=document.parent)

        self.check_dynamic_images(text, path, document)

    def run(self) -> int:
        pages = self.html_files()
        for page in pages:
            parser = self.parse_html(page)
            base_directory = page.parent
            if parser.base_href:
                base_target, _ = self.resolve_reference(parser.base_href, page)
                if base_target:
                    base_directory = base_target if parser.base_href.endswith("/") else base_target.parent

            for value, line, attribute, is_anchor in parser.references:
                self.check_reference(value, page, line, attribute, is_anchor, base_directory)

            for css, line in parser.inline_styles:
                self.check_css_text(css, page, page.parent, line - 1)

            for script, _line in parser.inline_scripts:
                self.check_inline_js(script, page)

        # print("****************************************************************")
        print(
            f"=== Checked {len(pages)} HTML pages, {self.css_count} CSS files, "
            f"{self.js_count} JavaScript files, and {self.numbered_image_count} numbered image paths."
        )
        if self.errors:
            print(f"--- Found {len(self.errors)} broken local references:")
            for error in sorted(self.errors):
                print(f"  - {error}")
            return 1

        print("=== No broken local references found.")
        print("=== External URLs and other runtime-generated paths are not checked.")
        # print("****************************************************************")
        return 0

    def check_inline_js(self, text: str, document: Path) -> None:
        for match in JS_LINK_PATTERN.finditer(text):
            self.check_reference(
                match.group(2), document, 1, "inline JavaScript link", base_directory=document.parent
            )
        for match in JS_SET_ATTRIBUTE_PATTERN.finditer(text):
            self.check_reference(
                match.group(3), document, 1, "inline JavaScript attribute", base_directory=document.parent
            )
        self.check_dynamic_images(text, document, document)

    def check_dynamic_images(self, text: str, source: Path, document: Path) -> None:
        """Check numbered image paths built from a directory and numeric range."""
        directories = {
            match.group(1): match.group(3)
            for match in JS_DIRECTORY_PATTERN.finditer(text)
        }
        loops = {
            match.group(1): (int(match.group(2)), int(match.group(3)))
            for match in JS_LOOP_RANGE_PATTERN.finditer(text)
        }
        image_count = JS_IMAGE_COUNT_PATTERN.search(text)

        for match in JS_IMAGE_TEMPLATE_PATTERN.finditer(text):
            directory_name, index_name, extension = match.groups()
            directory = directories.get(directory_name)
            number_range = loops.get(index_name)
            if number_range is None and image_count:
                number_range = (1, int(image_count.group(1)))
            if directory is None or number_range is None:
                continue

            start, end = number_range
            if end - start > 10000:
                continue
            self.numbered_image_count += end - start + 1
            line = text.count("\n", 0, match.start()) + 1
            for number in range(start, end + 1):
                value = f"{directory.rstrip('/')}/{number}.{extension}"
                self.check_reference(
                    value,
                    source,
                    line,
                    "JavaScript image template",
                    base_directory=document.parent,
                )


def main() -> int:
    script_root = Path(__file__).resolve().parent.parent
    argument_parser = argparse.ArgumentParser(
        description="Check local links, anchors, HTML resources, and CSS references."
    )
    argument_parser.add_argument(
        "--root",
        type=Path,
        default=script_root,
        help="website root directory (defaults to the repository root)",
    )
    args = argument_parser.parse_args()
    root = args.root.resolve()
    if not root.is_dir():
        print(f"Not a directory: {root}", file=sys.stderr)
        return 2
    return LinkChecker(root).run()


if __name__ == "__main__":
    raise SystemExit(main())
