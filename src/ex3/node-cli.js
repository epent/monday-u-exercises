import fs from "fs/promises";
import { Command } from "commander";

import { pokemonClient } from "../ex2/PokemonClient.js";

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

async function addPokemon(pokemonId) {
  try {
    const pokemon = pokemonClient.fetchPokemon(pokemonId);

    return pokemon;
  } catch (err) {
    console.log(err);
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
    let itemAdded;
    if (isNaN(+item)) {
      itemAdded = item;
    } else {
      const pokemon = await addPokemon(+item);
      itemAdded = `Catch ${pokemon.name}`;
    }

    await writeToFile(itemAdded, true, "a+");
    console.log(`Successfully added: ${itemAdded}`);
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
