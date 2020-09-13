const { createTodo } = require('./todo');

const header = {
    important : '!',
    user : 'user',
    date : 'date',
    comment : 'comment',
    filename : 'filename'
};

const maxWidth = {
    important : 1,
    user : 10,
    date : 10,
    comment : 15,
    filename : 15
};
 
const threePoint = '...';

let width = {
    important : 0,
    user : 0,
    date : 0,
    comment : 0,
    filename : 0,
};
function tableSeparator(){
    var tableWidth = 0;
    for(field in header){
        tableWidth += width[field];
    }
    tableWidth += '  |  '.length * ( Object.keys(header).length - 1 ) + 4;
    return '-'.repeat(tableWidth);
}

function createHeader(){
    result = '';
    dataArray = [];
    for(const field in header){
        data = header[field].padEnd(width[field]);
        dataArray.push(data);
    }
    result += "  " + dataArray.join('  |  ') + "  \n";
    result += tableSeparator() + '\n';
    return result;
}

function createBody(todoArray){
    var result = '';
    todoArray.forEach(function(todo) {
        let dataArray = [];
        for(field in header){
            data = todo[field].padEnd(width[field]);
            dataArray.push(data);
        }
        result += "  " + dataArray.join('  |  ') + "  \n";
    });
    return result;
}

function determineColumnWidth(todoArray){
    todoArray.forEach(function(todo) {
        for(field in header){
            if(todo[field].length > width[field]){
                if(todo[field].length > maxWidth[field]){
                    width[field] = maxWidth[field];
                    todo[field] = todo[field].substr(0,maxWidth[field] - threePoint.length) + threePoint;
                } else {
                    width[field] = todo[field].length;
                }
            }            
        }
    });
}

function createTable(todoArray){

    for(field in header){
        width[field] = header[field].length;
    }

    if (todoArray.length == 0){
        result = createHeader();
        return result;
    }

    determineColumnWidth(todoArray);

    var result = createHeader();

    result += createBody(todoArray);

    result += tableSeparator() + '\n';
    return result;
}

module.exports = {
    createTable
};