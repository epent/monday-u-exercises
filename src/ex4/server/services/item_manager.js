import { pokemonClient } from "../clients/pokemon_client";
import {  writeToFile } from "../../utils/utils";

class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemons = new Set();

    this.addItem = this.addItem.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  addToDo = (item) => {
    this.itemList.push(this._capitalize(item));

    const capitalizedItem = _capitalize(item);
    await writeToFile(capitalizedItem, true, "a+");
  };

  addPokemon = async (inputArray) => {
    // add promises to allPromises array
    const allPromises = this._createPromises(inputArray);

    // fetch all pokemons simulteniously
    const pokemonData = await Promise.all(allPromises);

    const copyInputArray = [...inputArray];

    //filter out new pokemons
    const newPokemons = pokemonData.filter((pokemon) => {
      if (pokemon) {
        const index = copyInputArray.findIndex((elm) => elm == pokemon.id);
        copyInputArray.splice(index, 1);

        const hasName = this.pokemons.has(pokemon.name);
        if (hasName) alert(`Pokemon with ID ${pokemon.id} was alrady added!`); //alert existing pokemons
        return !hasName;
      }
    });

    // add new pokemons to list of pokemons
    const pokemonNames = newPokemons.map((pokemon) => {
      this.pokemons.add(pokemon.name);
      return pokemon.name;
    });

    // push pokemons to todo list
    pokemonNames.forEach((name) => {
      this.itemList.push(`Catch ${name}`);
      writeToFile(`Catch ${pokemon.name}`, true, "a+");
    });

    copyInputArray.forEach((id) => {
      this.itemList.push(`Pokemon with ID ${id} was not found`);
      writeToFile(`Pokemon with ID ${id} was not found`, true, "a+");
    });
  };

  removeItem = (e, liElm, array) => {
    e.stopPropagation();

    const itemId = liElm.id.split("-");
    const pokemonName = itemId[1];
    const item = itemId.join(" ");

    const updatedArray = this._deleteByName(array, item);

    if (array.length - updatedArray.length > 0) {
      updatedArray.length > 0
        ? await writeToFile(updatedArray.join("\n"))
        : await writeToFile("");

    _removeItemFromList(this.itemList, item);
    _removePokemonFromList(this.pokemons, pokemonName);
  }
};

  removeAll = () => {
    this.itemList.length = 0;
    this.pokemons.clear();
    writeToFile("");
  };

  sortByName = (array) => {
    array.sort();
    array.shift();
    array.push("");

    const sortedArray = array.join("\n");
    writeToFile(sortedArray);

    this.itemList.sort();
  };

  _createPromises = (inputArray) => {
    let allPromises = [];

    inputArray.forEach((elm) => {
      const id = elm.trim();

      allPromises.push(pokemonClient.fetchPokemon(id));
    });

    return allPromises;
  };

  _capitalize = (string) => {
    const updatedString = `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    return updatedString;
  };

  _removeItemFromList = (itemList, item) => {
    const itemIndex = itemList.findIndex((listItem) => {
      return listItem === item;
    });

    itemList.splice(itemIndex, 1);
  };

  _removePokemonFromList = (pokemons, pokemonName) => {
    pokemons.delete(pokemonName);
  };

  _deleteByName = (array, name) =>{
    const indexToDelete = array.findIndex((item) => {
      return item === name;
    });

    return indexToDelete === -1 ? array : deletebyIndex(array, indexToDelete);
  }

  _deletebyIndex = (array, index) =>{
    const copiedArray = [...array];
    copiedArray.splice(index, 1);

    return copiedArray;
  }
}

export const itemManager = new ItemManager();
