import inquirer from "inquirer";

import {
  addItem,
  getItem,
  deleteItem,
  deleteAllItems,
  sortItems,
} from "./commands.js";

inquirer
  .prompt([
    {
      type: "list",
      name: "command",
      message: "Which command would you like to run?",
      choices: [
        "add new item",
        "get all items",
        "delete item by index",
        "delete item by name",
        "delete all items",
        "sort items by name",
        "exit",
      ],
    },
    {
      type: "input",
      name: "item",
      message: "Type your new todo or pokemon id",
      when: (answer) => answer.command === "add new item",
    },
    {
      type: "input",
      name: "delete_index",
      message: "Type index of item you want to delete",
      when: (answer) => answer.command === "delete item by index",
    },
    {
      type: "input",
      name: "delete_name",
      message: "Type name of item you want to delete",
      when: (answer) => answer.command === "delete item by name",
    },
  ])
  .then(async (answer) => {
    switch (answer.command) {
      case "add new item":
        addItem(answer.item);
        break;
      case "get all items":
        getItem();
        break;
      case "delete item by index":
        deleteItem(answer.delete_index);
        break;
      case "delete item by name":
        deleteItem(answer.delete_name);
        break;
      case "delete all items":
        deleteAllItems();
        break;
      case "sort items by name":
        sortItems();
        break;
    }
  });
