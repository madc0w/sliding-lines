let ctx,
	t = 0,
	maskFunc,
	maskOpacity = 0;
const spacing = 32;
const circleRadius = 120;
const rectShortSide = 120;
const rectLongSide = 400;
const interval = 400;

function load() {
	const canvas = document.getElementById('canvas');
	canvas.width = innerWidth - 20;
	canvas.height = innerHeight - 20;
	ctx = canvas.getContext('2d');

	let i = 0;
	setInterval(() => {
		const allFuncs = [circle, horizontalRect, verticalRect, plus, L];
		if ((i - 100) % interval == 0) {
			maskFunc = allFuncs[(i - 100) / interval];
			fadeIn();
		} else if (i % interval == 0) {
			fadeOut();
		}

		i++;
		i %= allFuncs.length * interval;
	}, 20);

	requestAnimationFrame(draw);
}

function fadeIn() {
	const id = setInterval(() => {
		maskOpacity += 0.02;
		if (maskOpacity >= 1) {
			clearInterval(id);
		}
	}, 20);
}

function fadeOut() {
	const id = setInterval(() => {
		maskOpacity -= 0.02;
		if (maskOpacity <= 0) {
			clearInterval(id);
		}
	}, 20);
}

function draw() {
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (maskFunc) {
		let alpha = Math.round(maskOpacity * ((1 << 8) - 1)).toString(16);
		if (alpha.length < 2) {
			alpha = `0${alpha}`;
		}
		// console.log(maskOpacity, alpha);
		ctx.fillStyle = `#000000${alpha}`;

		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#fff';
		maskFunc();
	}

	ctx.style = '#000';
	ctx.lineWidth = 2;
	for (let x = (t % spacing) - canvas.height; x < canvas.width; x += spacing) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(canvas.height + x, canvas.height);
		ctx.stroke();
	}

	t++;
	requestAnimationFrame(draw);
}

function circle() {
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, circleRadius, 0, 2 * Math.PI);
	ctx.fill();
}

function horizontalRect() {
	ctx.fillRect(
		(canvas.width - rectLongSide) / 2,
		(canvas.height - rectShortSide) / 2,
		rectLongSide,
		rectShortSide
	);
}

function verticalRect() {
	ctx.fillRect(
		(canvas.width - rectShortSide) / 2,
		(canvas.height - rectLongSide) / 2,
		rectShortSide,
		rectLongSide
	);
}

function plus() {
	horizontalRect();
	verticalRect();
}

function L() {
	ctx.fillRect(
		(canvas.width - rectLongSide) / 2,
		(canvas.height - rectLongSide) / 2,
		rectShortSide,
		rectLongSide
	);
	ctx.fillRect(
		(canvas.width - rectLongSide) / 2,
		(canvas.height - rectLongSide) / 2,
		rectLongSide,
		rectShortSide
	);
}
