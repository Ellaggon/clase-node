import { createInterface } from "readline";
import chalk from "chalk";
import { parse } from "path";

const tasks = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log(chalk.blue.bold("\n🌀🌀🌀🌀🌀 To Do App 🌀🌀🌀🌀🌀"));
  console.log(chalk.green.bold("Digita el número de tu eleccion"));
  console.log("1. Agregar tarea");
  console.log("2. Listar tarea");
  console.log("3. Completar tarea");
  console.log("4. Salir");
  console.log("\n");
};

function addTask() {
  rl.question(chalk.blueBright("Escribe la tarea: "), (task) => {
    tasks.push({ task, completed: false });
    console.log(chalk.bgGreenBright.bold("\n Tarea agregada con éxito \n"));
    displayMenu();
    chooseOption();
  });
};

function listTask() {
  console.log(chalk.yellow("\n>>>>>> Tareas <<<<<<\n"));

  if(tasks.length === 0) {
    console.log(chalk.bgYellowBright("No hay tareas por hacer"));
  } else {
    tasks.forEach((el, index) => {
      let status = el.completed ? "✅" : "❌";

      if (el.completed == true) {
        console.log(chalk.greenBright(`${index + 1} - ${status} - ${el.task}`))
      } else {
        console.log(chalk.redBright(`${index + 1} - ${status} - ${el.task}`))
      }
    });
  }
  displayMenu();
  chooseOption();
};

function completeTasks() {
  rl.question(chalk.green("Elige la tarea a completar"), (taskNumber) => {
    const index = parseInt(taskNumber) - 1; //Casting (transformar a number)

    if(index >= 0 && index < tasks.length){
      tasks[index].completed = true;
      console.log(chalk.bgGreenBright.bold("La tarea fue completada con exito ✅ \n"));
    } else {
      console.log(chalk.bgRed.bold("Numero de tarea invalido \n"));
    }
    displayMenu();
    chooseOption();
  });
};

function chooseOption() {
  rl.question(chalk.blue("Elige una opcion: "), ( choice ) => {
    switch (choice) {
      case "1":
        addTask();
        break;
      case "2":
        listTask();
        break;
      case "3":
        completeTasks();
        break;
      case "4":
        console.log(chalk.bgBlue("<<<< Adios 🐺"));
        rl.close();
        break;
    
      default:
        console.log(chalk.bgRed("La opcion ingresada no existe, intenta nuevamente \n"));
        displayMenu();
        chooseOption();
        break;
    }
  });
}

displayMenu();
chooseOption();