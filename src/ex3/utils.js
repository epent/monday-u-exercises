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
  array.splice(index, 1);
  return array;
}

export function deleteByName(array, name) {
  const indexToDelete = array.findIndex((item) => {
    return item === name;
  });

  return deletebyIndex(array, indexToDelete);
}
