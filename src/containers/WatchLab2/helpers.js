export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomWatchPart() {
	const a = getRandomInt(1, 5);
	if (a === 1) return "Case";
	if (a === 2) return "Movement";
	if (a === 3) return "Crown";
	if (a === 4) return "Glass";
	if (a === 5) return "Bracelet";
}

export function getRandomPart(color) {
	const a = getRandomWatchPart();
	if (color === "grey") {
		return "0" + a;
	}
	if (color === "white") {
		return "1" + a;
	}
	if (color === "lightGreen") {
		return "2" + a;
	}
	if (color === "darkGreen") {
		return "3" + a;
	}
	if (color === "lightBlue") {
		return "4" + a;
	}
	if (color === "darkBlue") {
		return "5" + a;
	}
	if (color === "purple") {
		return "6" + a;
	}
	if (color === "orange") {
		return "7" + a;
	}
	if (color === "red") {
		return "8" + a;
	}
}

export function percentageLoot(percentage) {
	if (getRandomInt(1, 100) <= percentage) return 1;
	else return 0;
}
