const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
        const r = cell.dataset.r;
        const c = cell.dataset.c;

        cells.forEach(x => {
            if (x.dataset.r === r || x.dataset.c === c) {
                x.classList.add('highlight');
            }
        });
    });

    cell.addEventListener('mouseleave', () => {
        cells.forEach(x => x.classList.remove('highlight'));
    });
});
