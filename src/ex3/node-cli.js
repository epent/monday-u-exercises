import fs from "fs/promises";
import { Command } from "commander";

import { itemManager } from "../ex2/ItemManager.js";

const program = new Command();

async function writeToFile(item, addNewLine, flag) {
  try {
    const newLine = addNewLine ? "\n" : "";
    await fs.writeFile("src/ex3/ItemList.txt", `${item}${newLine}`, {
      flag: flag,
    });
  } catch (err) {
    console.log(err);
  }
}

async function readFromFile() {
  try {
    const data = await fs.readFile("src/ex3/ItemList.txt");
    return data;
  } catch (err) {
    console.log(err);
  }
}

function checkItem(item) {
  const inputArray = item.split(",");

  if (isNaN(+inputArray[0])) {
    return false;
  } else {
    return true;
  }
}

function capitalize(string) {
  const updatedString = string.charAt(0).toUpperCase() + string.slice(1);
  return updatedString;
}

async function deletebyIndex(array, index) {
  array.splice(index, 1);

  array.length > 0 ? writeToFile(array.join("\n")) : writeToFile("");
}

async function deleteByName(array, name) {
  const indexToDelete = array.findIndex((item) => {
    return item === name;
  });

  await deletebyIndex(array, indexToDelete);
}

async function getDataAsArray() {
  const data = await readFromFile();
  const array = data.toString().split("\n");
  return array;
}

program
  .name("cli-todo-app")
  .description("CLI App to manage your everyday tasks")
  .version("1.0.0");

program
  .command("add")
  .description("Add item to the list")
  .argument("<string>", "item")
  .action(async (item) => {
    const isPokemon = checkItem(item);

    if (isPokemon) {
      const allPromises = itemManager.createPromises(item.split(",")); // add promises to allPromises array
      const pokemonData = await Promise.all(allPromises); // fetch all pokemons simulteniously
      pokemonData.forEach(async (pokemon) => {
        if (pokemon.name) {
          await writeToFile(`Catch ${pokemon.name}`, true, "a+");
          console.log(`Successfully added: Catch ${pokemon.name}`);
        } else {
          const id = pokemon.split(" ")[0];
          console.log(`Pokemon with ID ${id} was not found`);
        }
      });
    } else {
      const capitalizedItem = capitalize(item);
      await writeToFile(capitalizedItem, true, "a+");
      console.log(`Successfully added: ${capitalizedItem}`);
    }
  });

program
  .command("get")
  .description("Get all items on the list")
  .action(async () => {
    const data = await readFromFile();
    if (data.length) {
      console.log(`ToDo list: \n${data}`);
    } else {
      console.log(`Your ToDo list is empty!`);
    }
  });

program
  .command("delete")
  .description("Delete item from the list")
  .argument("<string>", "item or itemIndex")
  .action(async (input) => {
    const isNumber = checkItem(input);
    const array = await getDataAsArray();

    if (isNumber) {
      await deletebyIndex(array, input);
      console.log(`Successfully deleted item at index ${input}`);
    } else {
      await deleteByName(array, input);
      console.log(`Successfully deleted item: ${input}`);
    }
  });

program
  .command("delete_all")
  .description("Delete all items from the list")
  .action(async () => {
    writeToFile("");
    console.log(`Successfully deleted all items`);
  });

program
  .command("sort")
  .description("Sort all items by name")
  .action(async () => {
    const data = await readFromFile();
    const array = data.toString().split("\n");

    array.sort();

    const sortedArray = array.join("\n");
    writeToFile(sortedArray);
    console.log(`Successfully sorted all items by name:`);
    console.log(`${sortedArray}`);
  });

program.parse();
