const fs = require('fs');
const path = require('path');
const { createTodo } = require('./todo');

function getAllFilePaths(directoryPath, extension, filePaths) {
    filePaths = filePaths || [];
    const fileNames = fs.readdirSync(directoryPath);
    for (const fileName of fileNames) {
        const filePath = directoryPath + '/' + fileName;
        if (fs.statSync(filePath).isDirectory()) {
            getAllFilePaths(filePath, filePaths);
        } else if (filePath.endsWith(`.${extension}`)) {
            filePaths.push(filePath);
        }
    }
    return filePaths;
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function getFileName(filePath){
    return path.basename(filePath);
}

function getToDofromFiles(files, filePaths){
    var todoArray = [];
    files.forEach(function callback(file, indexPath, files) {
        let lines = file.split("\n");
        for (const str of lines){
            let result = str.match( /\/\/\s*todo\b\s*:*\s*/i );
            if (result !== null) {
                let comment = str.substring(result.index + result[0].length);
                let filename = getFileName(filePaths[indexPath]);
                if (comment.match( /.*;.*;.*/i )){
                    var dataArray = comment.split(/\s*;\s*/);
                    let todo = createTodo(filename, dataArray[2], dataArray[0], dataArray[1]);
                    todoArray.push(todo);
                } else {
                    let todo = createTodo(filename, comment);
                    todoArray.push(todo);
                }
            }
        }
    });
    return todoArray;
}

module.exports = {
    getAllFilePaths,
    readFile,
    getToDofromFiles
};
