import { Command } from "commander";
const program = new Command();

program
  .name("cli-todo-app")
  .description("CLI App to manage your everyday tasks")
  .version("1.0.0");

program
  .command("add")
  .description("Add item to the list")
  .argument("<string>", "item")
  .action((item) => {
    console.log(`Result: ${item}`);
  });

program.parse();
