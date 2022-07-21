export const removeOneTimeString = (list: string[], value: string) => {
  const newList = [...list]
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) {
      newList.splice(i, 1);
      break;
    }
  }
  return newList;
};
