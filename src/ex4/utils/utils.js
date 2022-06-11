import fs from "fs/promises";

async function writeToFile(item, addNewLine, flag) {
  try {
    const newLine = addNewLine ? "\n" : "";
    await fs.writeFile("src/ex4/ItemList.txt", `${item}${newLine}`, {
      flag: flag,
    });
  } catch (err) {
    console.error(`Failed to write to file ${error.message}`);
  }
}

async function readFromFile() {
  try {
    const data = await fs.readFile("src/ex4/ItemList.txt");
    return data.toString();
  } catch (err) {
    console.error(`Got an error trying to read the file: ${err.message}`);
  }
}

export { writeToFile, readFromFile };
