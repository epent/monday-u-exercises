import itemManager from "../services/item_manager.js";

async function getItems(req, res, next) {
  let data = await itemManager.getItems();
  if (!data) data = [];
  res.status(200).json(data);
}

async function postItem(req, res, next) {
  console.log(req.body);
  await itemManager.addToDo(req.body);
  res.status(200).json(req.body);
}

async function postPokemon(req, res, next) {
  await itemManager.addPokemon(req.body);
  res.status(200).json(req.body);
}

async function deleteItem(req, res, next) {
  const data = await itemManager.removeItem(req.body);
  res.status(200).json(data);
}

async function deleteItems(req, res, next) {
  await itemManager.removeAll();
  res.status(200);
}

async function sortItems(req, res, next) {
  const data = await itemManager.sortByName();
  res.status(200).json(data);
}

export { getItems, postItem, postPokemon, deleteItem, deleteItems, sortItems };
