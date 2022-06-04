export function capitalize(string) {
  const updatedString = string.charAt(0).toUpperCase() + string.slice(1);
  return updatedString;
}

export function checkItem(item) {
  const inputArray = item.split(",");

  if (isNaN(+inputArray[0])) {
    return false;
  } else {
    return true;
  }
}

export function convertToArray(data) {
  const array = data.toString().split("\n");
  return array;
}

export function deletebyIndex(array, index) {
  const copiedArray = [...array];
  copiedArray.splice(index, 1);

  return copiedArray;
}

export function deleteByName(array, name) {
  const indexToDelete = array.findIndex((item) => {
    return item === name;
  });

  return indexToDelete === -1 ? array : deletebyIndex(array, indexToDelete);
}
