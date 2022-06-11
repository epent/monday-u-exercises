import express from "express";

import {
  getItems,
  postItem,
  postPokemon,
  deleteItem,
  deleteItems,
  sortItems,
} from "../controllers/items.js";

const itemsRouter = express.Router();

itemsRouter.get("/", getItems);
itemsRouter.post("/item", postItem);
itemsRouter.post("/pokemon", postPokemon);
itemsRouter.delete("/item", deleteItem);
itemsRouter.delete("/items", deleteItems);
itemsRouter.patch("/items", sortItems);

export default itemsRouter;
