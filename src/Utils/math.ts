export function sumValuesObject(obj: any) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

export function getRandomInt(min:number, max:number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function percentageLoot(percentage:number) {
	if (getRandomInt(1, 100) <= percentage) return 1;
	else return 0;
}