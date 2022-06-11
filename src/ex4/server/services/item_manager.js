import pokemonClient from "../clients/pokemon_client.js";
import { readFromFile, writeToFile } from "../../utils/utils.js";

class ItemManager {
  constructor() {}

  getItems = async () => {
    return await readFromFile();
  };

  addToDo = async (item) => {
    // console.log(item);
    await writeToFile(item, true, "a+");
  };

  addPokemon = async (inputArray) => {
    // add promises to allPromises array
    const allPromises = this._createPromises(inputArray);

    // fetch all pokemons simulteniously
    const pokemonData = await Promise.all(allPromises);

    const allItems = await readFromFile();

    const copyInputArray = [...inputArray];

    pokemonData
      .filter((pokemon) => {
        if (pokemon) {
          const index = copyInputArray.findIndex((elm) => elm == pokemon.id);
          copyInputArray.splice(index, 1);
          return pokemon;
        }
      })
      .forEach((pokemon) => {
        const newItem = `Catch ${pokemon.name}`;

        if (allItems.includes(newItem)) {
          alert(`Pokemon with ID ${pokemon.id} was alrady added!`);
        } else {
          writeToFile(`Catch ${pokemon.name}`, true, "a+");
        }
      });

    copyInputArray.forEach((id) => {
      writeToFile(`Pokemon with ID ${id} was not found`, true, "a+");
    });
  };

  removeItem = async (item) => {
    const allItems = await readFromFile();
    const index = allItems.findIndex((i) => i === item);
    const deletedItem = allItems[index];
    allItems.splice(index, 1);
    await writeToFile(allItems.join("\n"));
    return deletedItem;
  };

  removeAll = async () => {
    await writeToFile("");
  };

  sortByName = async () => {
    const allItems = await readFromFile();

    allItems.sort();
    array.shift();
    array.push("");

    const sortedArray = array.join("\n");
    await writeToFile(sortedArray);

    return sortedArray;
  };

  _createPromises = (inputArray) => {
    let allPromises = [];

    inputArray.forEach((elm) => {
      const id = elm.trim();

      allPromises.push(pokemonClient.fetchPokemon(id));
    });

    return allPromises;
  };
}

const itemManager = new ItemManager();

export default itemManager;
