import fs from "fs/promises";
import { Command } from "commander";
const program = new Command();

async function writeToFile(item) {
  try {
    await fs.writeFile("src/ex3/test.txt", `\n${item}`, { flag: "a+" });
  } catch (err) {
    console.log(err);
  }
}

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
    writeToFile(item);
  });

program.parse();
