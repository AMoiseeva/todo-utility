const { getAllFilePaths, readFile, getToDofromFiles } = require('./fileSystem');
const { readLine, writeLine } = require('./console');
const { important, user, sort, date } = require('./commands');
const { createTable } = require('./createTable');

global.todoArray = [];

app();

function app () {
    todoArray = getFiles();

    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles () {
    const filePaths = getAllFilePaths(process.cwd(), 'js');
    const fileDatas = filePaths.map(path => readFile(path));
    return getToDofromFiles(fileDatas, filePaths);
}

function processCommand (command) {
    commandArray = command.split(' ');

    try{
        switch (commandArray[0]) {
            case 'exit':
                process.exit(0);
                break;
            case 'show': 
                table = createTable(todoArray);
                writeLine(table);
                break;
            case 'important': 
                newTodoArray = important();
                table = createTable(newTodoArray);
                writeLine(table);
                break;
            case 'user': 
                newTodoArray = user(commandArray[1]);
                table = createTable(newTodoArray);
                writeLine(table);
                break;
            case 'sort': 
                newTodoArray = sort(commandArray[1]);
                table = createTable(newTodoArray);
                writeLine(table);
                break;
            case 'date': 
                newTodoArray = date(commandArray[1]);
                table = createTable(newTodoArray);
                writeLine(table);
                break;
            default:
                console.log('wrong command');
                break;
        }
    } catch(err) {
        console.log(err.message);
    }
}

