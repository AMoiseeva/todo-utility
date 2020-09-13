function createTodo(filename, comment, user, date){

    let todo = {};
    todo.user = user || '';
    todo.date = date || '';
    todo.comment = comment.replace(/[\r\t]/, '');;
    todo.filename = filename;

    if (comment.match(/!+/)){
        todo.important = '!';
    } else {
        todo.important = ' ';
    }
    
    return todo;
}

module.exports = {
    createTodo
};
