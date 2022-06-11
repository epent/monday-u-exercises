import { pokemonClient } from "../clients/pokemon_client";
import {
  toggleFooter,
  removeItemFromList,
  removePokemonFromList,
} from "../../utils/utils";

class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemons = new Set();

    this.addItem = this.addItem.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  async addItem(input) {
    const item = input.value;
    const inputArray = item.split(",");

    let pokemonArray = [];

    inputArray.forEach((elm) => {
      if (isNaN(elm)) {
        this.addToDo(elm);
      } else {
        pokemonArray.push(elm);
      }
    });

    await this.addPokemon(pokemonArray);

    //clear input
    this.clearInputField();

    // render the list
    this.renderItems(this.itemList.at(-1));
  }

  addToDo(item) {
    this.itemList.push(this.capitalize(item));
  }

  async addPokemon(inputArray) {
    // add promises to allPromises array
    const allPromises = this.createPromises(inputArray);

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
    });

    copyInputArray.forEach((id) => {
      this.itemList.push(`Pokemon with ID ${id} was not found`);
    });
  }

  createPromises(inputArray) {
    let allPromises = [];

    inputArray.forEach((elm) => {
      const id = elm.trim();

      allPromises.push(pokemonClient.fetchPokemon(id));
    });

    return allPromises;
  }

  removeItem(e, liElm) {
    e.stopPropagation();

    const itemId = liElm.id.split("-");
    const pokemonName = itemId[1];
    const item = itemId.join(" ");

    removeItemFromList(this.itemList, item);
    removePokemonFromList(this.pokemons, pokemonName);

    this.renderItems();
  }

  removeAll() {
    this.itemList.length = 0;
    this.pokemons.clear();

    this.renderItems();
  }

  renderItems(current) {
    toggleFooter(this.itemList);

    // clear list innerHTML
    const list = document.querySelector("#list");
    list.innerHTML = "";

    // create elements for exisitng items
    this.itemList.forEach((item) => {
      const itemNode = this.createItemElement(item, current);

      list.appendChild(itemNode);
    });
  }

  createItemElement(input, current) {
    const itemId = input.split(" ").join("-");

    const liElm = this.createListElement(itemId, input, current);
    const deleteButton = this.createDeleteButton(itemId, liElm);

    liElm.appendChild(deleteButton);

    return liElm;
  }

  createListElement(itemId, input, current) {
    const liElm = document.createElement("li");
    liElm.setAttribute("id", itemId);
    liElm.classList.add("list-item");
    if (input === current) liElm.classList.add("grow");
    liElm.innerHTML = input;
    liElm.addEventListener("click", () => alert(`Task: ${input}`));
    return liElm;
  }

  createDeleteButton(itemId, liElm) {
    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("id", `${itemId}-delete`);
    deleteButton.classList.add("list-item-delete-button");
    deleteButton.src = "../images/delete_icon.svg";
    deleteButton.addEventListener("click", (e) => this.removeItem(e, liElm));
    return deleteButton;
  }

  clearInputField() {
    document.querySelector("#list-item-input").value = "";
  }

  sortByName() {
    this.itemList.sort();

    this.renderItems();
  }

  capitalize(string) {
    const updatedString = `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    return updatedString;
  }
}

export const itemManager = new ItemManager();
