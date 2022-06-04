import { Command } from "commander";

import {
  addItem,
  getItem,
  deleteItem,
  deleteAllItems,
  sortItems,
} from "./commands.js";

const program = new Command();

program
  .name("cli-todo-app")
  .description("CLI App to manage your everyday tasks")
  .version("1.0.0");

program
  .command("add")
  .description("Add item to the list")
  .argument("<string>", "item")
  .action(async (item) => await addItem(item));

program
  .command("get")
  .description("Get all items on the list")
  .action(async () => await getItem());

program
  .command("delete")
  .description("Delete item from the list")
  .argument("<string>", "item or itemIndex")
  .action(async (input) => await deleteItem(input));

program
  .command("delete_all")
  .description("Delete all items from the list")
  .action(() => deleteAllItems());

program
  .command("sort")
  .description("Sort all items by name")
  .action(async () => await sortItems());

program.parse();
