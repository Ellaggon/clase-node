import { createInterface } from "readline";
import { readFileSync, writeFileSync } from "fs";
import chalk from "chalk";

const tasks = [];
const DB_FILE = "tasks.txt";

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

//Esta función carga tareas desde un archivo, las procesa y las almacena en un arreglo llamado tasks. 
function loadTasks() {
  try {
    const data = readFileSync(DB_FILE, "utf-8");
    const lines = data.split("\n");
    tasks.length = 0;

    lines.forEach((line) => {
    if( line.trim() !== "" ){
      const [task, completed] = line.split("|");
      tasks.push({ task: task, completed: completed === true });
    }
  });
    console.log(chalk.green("Las tareas se caragaron desde la BS \n"));
  } catch (err) {
    console.log(chalk.green("No hay tareas por hacer \n"));
  }
};

// Esta funcion guardara las tareas a la base de datos
function saveTask() {
  const data = tasks.map((task) => `${task.task}|${task.completed}`).join("\n");
  writeFileSync(DB_FILE, data, "utf-8");
  console.log(chalk.bgGreenBright.bold("\n Tarea agregada a la BD con éxito \n"));
};

function addTask() {
  rl.question(chalk.blueBright("Escribe la tarea: "), (task) => {
    tasks.push({ task, completed: false });
    console.log(chalk.bgGreenBright.bold("\n Tarea agregada con éxito \n"));
    saveTask();
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
  rl.question(
    chalk.green("Elige la tarea a completar"), (taskNumber) => {
    const index = parseInt(taskNumber) - 1; //Casting (transformar a number)

    if(index >= 0 && index < tasks.length){
      tasks[index].completed = true;
      saveTask();
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
loadTasks();
displayMenu();
chooseOption();