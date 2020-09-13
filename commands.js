function important(){
    let newTodoArray = [];
    todoArray.forEach(function(todo) {
        if(todo.important == "!"){
            newTodoArray.push(todo);
        }
    });

    return newTodoArray;
}

function user(username){
    if (typeof username === "undefined"){
        throw new Error('wrong command');
    }

    let newTodoArray = [];
    todoArray.forEach(function(todo) {
        if(todo.user.substr(0, username.length).toLowerCase() == username.toLowerCase()){
            newTodoArray.push(todo);
        }
    });
    return newTodoArray;
}

function dateSort(){
    return function (a, b) {
        if ((a.date != '') && (b.date != '')){
            return new Date(b.date) - new Date(a.date);
        }        
        if ((a.date == '') && (b.date == '')){
            return 0;
        }
        if (a.date == '') {
            return 1;
        }
        return -1;
    }
}

function userSort(){
    return function (a, b) {
        if ((a.user != '') && (b.user != '')){
            return a.user.localeCompare(b.user);
        }        
        if ((a.user == '') && (b.user == '')){
            return 0;
        }
        if (a.user == '') {
            return 1;
        }
        return -1;
    }
}
function importanceSort(){
    return function (a, b) {
        valueA = (a.comment.match(/!/g) || []).length;
        valueB = (b.comment.match(/!/g) || []).length;
        if (valueA < valueB) {
            return 1;
        }
        if (valueA > valueB) {
            return -1;
        }
        return 0;
    }
}
function sort(arg){
    if (typeof arg === "undefined"){
        throw new Error('wrong command');
    }

    var newTodoArray = todoArray;
    switch(arg.toLowerCase()){
        case 'importance':
            return newTodoArray.sort(importanceSort());
        case 'user':
            return newTodoArray.sort(userSort());
        case 'date':
            return newTodoArray.sort(dateSort());
        default: throw new Error('wrong command');
    }
}

function date(date){
    if ((typeof date === "undefined") || (!date.match(/\d\d\d\d-\d\d-\d\d|\d\d\d\d-\d\d|\d\d\d\d/))){
        throw new Error('wrong command');
    }

    var inputDate = new Date(date);
    let newTodoArray = [];
    todoArray.forEach(function(todo) {
        var todoDate = new Date(todo.date)
        if(todoDate.getTime() >= inputDate.getTime() ){
            newTodoArray.push(todo);
        }
    });
    return newTodoArray;
}

module.exports = {
    important,
    user,
    sort,
    date
};