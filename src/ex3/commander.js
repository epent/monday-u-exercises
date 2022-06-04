import { Command } from "commander";

import {
  addItem,
  getItems,
  deleteItem,
  deleteAllItems,
  sortItems,
} from "./commands.js";

import { startInquirer } from "./inquirer.js";

const program = new Command();

program
  .name("cli-todo-app")
  .description("CLI App to manage your everyday tasks")
  .version("1.0.0");

// to use Inquirer.js
program
  .command("start")
  .description("Start the app, it will promp you with questions")
  .action(async () => await startInquirer());

//to not use Inquirer.js
program
  .command("add")
  .description("Add item to the list")
  .argument("<string>", "item")
  .action(async (item) => await addItem(item));

program
  .command("get")
  .description("Get all items on the list")
  .action(async () => await getItems());

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
