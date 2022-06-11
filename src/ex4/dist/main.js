import ItemClient from "./clients/item_client.js";

class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  init = async () => {
    const addItemButton = document.getElementById("list-item-submit");
    addItemButton.addEventListener("click", this.addItem);

    // await this.renderItems(); // this will make it so that any time you refresh the page you'll see the items already in your todo list
  };

  addItem = async () => {
    const item = document.getElementById("list-item-input").value;
    const inputArray = item.split(",");

    let pokemonArray = [];

    inputArray.forEach(async (elm) => {
      if (isNaN(elm)) {
        await this.itemClient.addToDo(elm);
      } else {
        pokemonArray.push(elm);
      }
    });

    if (pokemonArray.length > 0) {
      await this.itemClient.addPokemon(pokemonArray);
    }

    //clear input
    this._clearInputField();

    // render the list
    // await this.renderItems(this.itemList.at(-1));
  };

  removeItem = async (e, liElm) => {
    e.stopPropagation();

    await this.itemClient.removeItem(e, liElm);
    await this.renderItems();
  };

  removeAll = async () => {
    await this.itemClient.removeAll();
    await this.renderItems();
  };

  sortByName = async () => {
    await this.itemClient.sortByName();
    await this.renderItems();
  };

  renderItems = async (current) => {
    const items = await this.itemClient.getItems();

    this._toggleFooter(items);

    if (items && items.length > 0) {
      const list = document.getElementById("list");
      list.innerHTML = "";

      items.forEach((item) => {
        const itemNode = this._createItemElement(item, current);

        list.appendChild(itemNode);
      });
    }
  };

  _toggleFooter = (itemList) => {
    const addItemButton = document.querySelector("#list-item-submit");
    const clearAllButton = document.querySelector("#clear-all-button");
    const sortByNameButton = document.querySelector("#sort-by-name-button");

    if (itemList.length === 0) {
      addItemButton.classList.add("hithere"); //add AddButton animation
      clearAllButton.classList.add("hidden"); //hide ClearAll button
      sortByNameButton.classList.add("hidden"); //hide Sort button
    } else {
      addItemButton.classList.remove("hithere"); //remove AddButton animation
      clearAllButton.classList.remove("hidden"); //show ClearAll button
      sortByNameButton.classList.remove("hidden"); //show Sort button
    }
  };

  _createItemElement = (input, current) => {
    const itemId = input.split(" ").join("-");

    const liElm = this._createListElement(itemId, input, current);
    const deleteButton = this._createDeleteButton(itemId, liElm);

    liElm.appendChild(deleteButton);

    return liElm;
  };

  _createListElement = (itemId, input, current) => {
    const liElm = document.createElement("li");
    liElm.setAttribute("id", itemId);
    liElm.classList.add("list-item");
    if (input === current) liElm.classList.add("grow");
    liElm.innerHTML = input;
    liElm.addEventListener("click", () => alert(`Task: ${input}`));
    return liElm;
  };

  _createDeleteButton = (itemId, liElm) => {
    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("id", `${itemId}-delete`);
    deleteButton.classList.add("list-item-delete-button");
    deleteButton.src = "../images/delete_icon.svg";
    deleteButton.addEventListener("click", (e) => this.removeItem(e, liElm));
    return deleteButton;
  };

  _clearInputField = () => {
    document.querySelector("#list-item-input").value = "";
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
