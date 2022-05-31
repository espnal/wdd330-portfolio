const TODO_LIST = "todoList";

function getTodoList() {
    let todoListString = localStorage.getItem(TODO_LIST);

    let todoList = []

    if (todoListString) {
        todoList = JSON.parse(todoListString)
    }
    return todoList
}

function saveTodo(todo) {
    let todoList = getTodoList();
    todoList.push(todo);
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList))
}


export default {
    getTodoList,
    saveTodo,
}