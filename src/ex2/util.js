export function toggleFooter(itemList) {
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
}

export function removeItemFromList(itemList, item) {
  const itemIndex = itemList.findIndex((listItem) => {
    return listItem === item;
  });

  itemList.splice(itemIndex, 1);
}

export function removePokemonFromList(pokemons, pokemonName) {
  pokemons.delete(pokemonName);
}
