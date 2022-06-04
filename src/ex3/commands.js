import { writeToFile, readFromFile } from "./fs.js";
import {
  checkItem,
  capitalize,
  convertToArray,
  deletebyIndex,
  deleteByName,
} from "./utils.js";
import { itemManager } from "../ex2/ItemManager.js";

export async function addItem(item) {
  const isPokemon = checkItem(item);

  if (isPokemon) {
    const allPromises = itemManager.createPromises(item.split(",")); // add promises to allPromises array
    const pokemonData = await Promise.all(allPromises); // fetch all pokemons simulteniously
    pokemonData.forEach(async (pokemon) => {
      if (pokemon.name) {
        await writeToFile(`Catch ${pokemon.name}`, true, "a+");
        console.log(`\n\nSuccessfully added: Catch ${pokemon.name}`);
      } else {
        const id = pokemon.split(" ")[0];
        console.log(`\n\nPokemon with ID ${id} was not found`);
      }
    });
  } else {
    const capitalizedItem = capitalize(item);
    await writeToFile(capitalizedItem, true, "a+");
    console.log(`\n\nSuccessfully added: ${capitalizedItem}`);
  }
}

export async function getItems() {
  const data = await readFromFile();

  if (data.length) {
    console.log(`\n\nToDo list: \n${data}`);
  } else {
    console.log(`\n\nYour ToDo list is empty!`);
  }
}

export async function deleteItem(input) {
  const isNumber = checkItem(input);
  const data = await readFromFile();
  const array = convertToArray(data);

  const updatedArray = isNumber
    ? deletebyIndex(array, input)
    : deleteByName(array, input);

  updatedArray.length > 0
    ? await writeToFile(updatedArray.join("\n"))
    : await writeToFile("");

  console.log(`\n\nSuccessfully deleted item: ${input}`);
}

export function deleteAllItems() {
  writeToFile("");
  console.log(`\n\nSuccessfully deleted all items`);
}

export async function sortItems() {
  const data = await readFromFile();
  const array = data.toString().split("\n");

  array.sort();

  const sortedArray = array.join("\n");
  writeToFile(sortedArray);
  console.log(`\n\nSuccessfully sorted all items by name:`);
  console.log(`${sortedArray}`);
}
