'use strict';

const bars = [
	['end', 'top'],
	['side', 'top', 'left'],
	['side', 'top', 'right'],
	['middle'],
	['side', 'bottom', 'left'],
	['side', 'bottom', 'right'],
	['end', 'bottom']
];

const main = document.querySelector('main');

if (!main) {
	throw new Error('Элемент main не найден');
}

function formatNumber(number, padding = 2) {
	return String(number)
		.padStart(padding, '0')
		.slice(-padding);
}

function createDigit(value) {
	const digit = document.createElement('figure');

	digit.className = 'digit';
	digit.dataset.digit = value;

	bars.forEach(classes => {
		const segment = document.createElement('span');

		segment.classList.add(...classes);
		digit.append(segment);
	});

	return digit;
}

function createDigitGroup(number, classes = []) {
	const group = document.createElement('div');

	group.classList.add('group', ...classes);

	const digits = [...formatNumber(number)].map(createDigit);

	group.append(...digits);

	return {
		element: group,

		setNumber(value) {
			const formattedValue = formatNumber(value);

			[...formattedValue].forEach((digit, index) => {
				digits[index].dataset.digit = digit;
			});
		}
	};
}

function addDigits(number) {
	const container = document.createElement('div');

	container.className = 'digits';

	const normalGroup = createDigitGroup(number);

	const shadowGroup1 = createDigitGroup(
		number,
		['shadow', 'shadow1']
	);

	const shadowGroup2 = createDigitGroup(
		number,
		['shadow', 'shadow2']
	);

	container.append(
		normalGroup.element,
		shadowGroup1.element,
		shadowGroup2.element
	);

	main.append(container);

	return {
		setNumber(value) {
			normalGroup.setNumber(value);
			shadowGroup1.setNumber(value);
			shadowGroup2.setNumber(value);
		}
	};
}

function createColon(classes = []) {
	const colon = document.createElement('figure');
	const dots = document.createElement('span');

	colon.classList.add('colon', ...classes);
	colon.append(dots);

	return colon;
}

function addColon() {
	const container = document.createElement('div');

	container.className = 'colon-group';

	container.append(
		createColon(),
		createColon(['shadow', 'shadow1']),
		createColon(['shadow', 'shadow2'])
	);

	main.append(container);
}

function isSafari() {
	return (
		/Safari/i.test(navigator.userAgent) &&
		!/Chrome|Chromium|CriOS|Android/i.test(navigator.userAgent)
	);
}

function initClock() {
	const now = new Date();

	const hoursDisplay = addDigits(now.getHours());

	addColon();

	const minutesDisplay = addDigits(now.getMinutes());

	addColon();

	const secondsDisplay = addDigits(now.getSeconds());

	let previousHours = now.getHours();
	let previousMinutes = now.getMinutes();
	let previousSeconds = now.getSeconds();

	function updateClock() {
		const currentTime = new Date();

		const hours = currentTime.getHours();
		const minutes = currentTime.getMinutes();
		const seconds = currentTime.getSeconds();

		if (hours !== previousHours) {
			hoursDisplay.setNumber(hours);
			previousHours = hours;
		}

		if (minutes !== previousMinutes) {
			minutesDisplay.setNumber(minutes);
			previousMinutes = minutes;
		}

		if (seconds !== previousSeconds) {
			secondsDisplay.setNumber(seconds);
			previousSeconds = seconds;
		}

		main.setAttribute(
			'aria-label',
			`Current time: ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
		);

		const delay = 1000 - currentTime.getMilliseconds();

		window.setTimeout(updateClock, delay);
	}

	updateClock();

	console.log(
		'Часы созданы. Количество цифр:',
		document.querySelectorAll('.digit').length
	);
}

if (isSafari()) {
	document.body.classList.add('safari');
}

initClock();