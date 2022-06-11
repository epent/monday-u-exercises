import fs from "fs/promises";

export async function writeToFile(item, addNewLine, flag) {
  try {
    const newLine = addNewLine ? "\n" : "";
    await fs.writeFile("src/ex4/ItemList.txt", `${item}${newLine}`, {
      flag: flag,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function readFromFile() {
  try {
    const data = await fs.readFile("src/ex4/ItemList.txt");
    return data;
  } catch (err) {
    console.log(err);
  }
}
