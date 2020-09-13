const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function readLine(callback) {
    rl.on('line', callback);
}

function writeLine(text){
    console.log(text);
}

module.exports = {
    readLine,
    writeLine
};
