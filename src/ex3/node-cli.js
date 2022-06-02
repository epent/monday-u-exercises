import fs from "fs/promises";
import { Command } from "commander";

import { itemManager } from "../ex2/ItemManager.js";

const program = new Command();

async function writeToFile(item, addNewLine, flag) {
  try {
    const newLine = addNewLine ? "\n" : "";
    await fs.writeFile("src/ex3/test.txt", `${item}${newLine}`, { flag: flag });
  } catch (err) {
    console.log(err);
  }
}

async function readFromFile() {
  try {
    const data = await fs.readFile("src/ex3/test.txt");
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
        await writeToFile(`Catch ${pokemon.name}`, true, "a+");
      });
    } else {
      await writeToFile(item, true, "a+");
      console.log(`Successfully added: ${item}`);
    }
  });

program
  .command("get")
  .description("Get all items on the list")
  .action(async () => {
    const data = await readFromFile();
    console.log(`ToDo list: \n${data}`);
  });

program
  .command("delete")
  .description("Delete item from the list")
  .argument("<number>", "item index")
  .action(async (index) => {
    const data = await readFromFile();
    const array = data.toString().split("\n");

    array.splice(index, 1);
    array.pop();

    array.length > 0 ? writeToFile(array.join("\n")) : writeToFile("");
  });

program.parse();
