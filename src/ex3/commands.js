import { writeToFile, readFromFile } from "./fs.js";
import {
  checkItem,
  capitalize,
  convertToArray,
  deletebyIndex,
  deleteByName,
} from "./utils.js";
import { itemManager } from "../ex2/ItemManager.js";
import { success, error, blue } from "./chalk.js";

export async function addItem(item) {
  let pokemonArray = [];

  const inputArray = item.split(",");
  inputArray.forEach(async (elm) => {
    if (isNaN(elm)) {
      await addToDo(elm);
    } else {
      pokemonArray.push(elm);
    }
  });

  await addPokemon(pokemonArray);

  async function addToDo(item) {
    const capitalizedItem = capitalize(item);
    await writeToFile(capitalizedItem, true, "a+");
    console.log(success(`\n\nSuccessfully added: ${capitalizedItem}`));
  }

  async function addPokemon(pokemonArray) {
    const allPromises = itemManager.createPromises(pokemonArray); // add promises to allPromises array
    const pokemonData = await Promise.all(allPromises); // fetch all pokemons simulteniously

    const copyPokemonArray = [...pokemonArray];

    pokemonData.forEach((pokemon) => {
      if (pokemon) {
        writeToFile(`Catch ${pokemon.name}`, true, "a+");
        console.log(success(`\n\nSuccessfully added: Catch ${pokemon.name}`));

        const index = copyPokemonArray.findIndex((elm) => elm == pokemon.id);
        copyPokemonArray.splice(index, 1);
      }
    });

    copyPokemonArray.forEach((id) => {
      console.log(error(`\n\nPokemon with ID ${id} was not found`));
    });
  }
}

export async function getItems() {
  const data = await readFromFile();

  if (data.length) {
    console.log(blue(`\n\nToDo list: \n${data}`));
  } else {
    console.log(error(`\n\nYour ToDo list is empty!`));
  }
}

export async function deleteItem(input) {
  const isNumber = checkItem(input);
  const data = await readFromFile();
  const array = convertToArray(data);

  const updatedArray = isNumber
    ? deletebyIndex(array, input)
    : deleteByName(array, input);

  if (array.length - updatedArray.length > 0) {
    updatedArray.length > 0
      ? await writeToFile(updatedArray.join("\n"))
      : await writeToFile("");

    console.log(success(`\n\nSuccessfully deleted item: ${input}`));
  } else {
    console.log(
      error(`\n\nThis item was not found in your list: ${input}. Try again!`)
    );
  }
}

export function deleteAllItems() {
  writeToFile("");
  console.log(success(`\n\nSuccessfully deleted all items`));
}

export async function sortItems() {
  const data = await readFromFile();
  const array = data.toString().split("\n");

  array.sort();
  array.shift();
  array.push("");

  const sortedArray = array.join("\n");
  writeToFile(sortedArray);

  console.log(success(`\n\nSuccessfully sorted all items by name:`));
  console.log(blue(`${sortedArray}`));
}
