import utils from './utils.js';
import ls from './ls.js';

const input = document.querySelector(".task-text");
const button = document.querySelector("button");
const empty = document.querySelector(".empty");
const ultaskCont = document.querySelector(".ul");
const filterTodo = document.querySelector(".todofilter");

filterTodo.addEventListener("change", filterToDos)

button.addEventListener("click", (e) => {
    e.preventDefault();
    addNewTodo();



});
loadTodos();

function createList(todo) {

    const taks = todo.content;
    let list;

    if (taks.length !== 0) {
        list = document.createElement("li");
        // list.setAttribute("id", "normal");
        list.setAttribute("id", todo.id)
        const p = document.createElement("p");
        p.textContent = taks;

        const check = crossOutList()

        if (todo.completed) {
            p.style.textDecoration = 'line-through'
            check.checked = true
            list.classList.add('completed')
        }
        list.appendChild(check)
        list.appendChild(p);
        list.appendChild(addDeleteBtn())

        input.value = "";
        empty.style.display = "none";
        input.focus();

    }
    return list
}

function addDeleteBtn() {
    const deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.className = "btn-delete";


    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ultaskCont.removeChild(item);

        const items = document.querySelectorAll("li");

        if (items.length === 0) {
            empty.style.display = "block";
        }
        lSdeleteBtn(item)
    });

    return deleteBtn;
}

function lSdeleteBtn(item) {
    const id = item.id
    const todos = ls.getTodoList()
    todos.forEach(todo => {
        if (todo.id == id || todo.id.length == 0) {
            let x = todos.indexOf(todo);
            todos.splice(x, 1)
        };
    })
    ls.saveList(todos)
}

function crossOutList() {

    const check = document.createElement("input");

    check.type = "checkbox";
    check.className = "check"

    check.addEventListener("change", (e) => {
        const list = e.target.parentElement;
        const item = e.target.parentElement.childNodes[1];
        item.style.textDecoration = check.checked ? 'line-through' : 'none';
        const id = list.id
        const todos = ls.getTodoList()
        todos.forEach(todo => {
            if (todo.id == id) {
                todo.completed = !todo.completed
                if (todo.completed && list.className !== 'completed') {
                    check.checked = true
                    list.classList.add('completed')
                } else {
                    list.classList.remove('completed')
                }
            }
        })

        ls.saveList(todos)
    })
    return check;
}


function filterToDos(e) {
    // debugger
    // const todos = ls.getTodoList()

    const todos = ultaskCont.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                if (todo.length > 0);
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList == "completed") {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break
            case "active":
                if (todo.classList != "completed") {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break
        }
    });

}

function addNewTodo(e) {
    let task = input.value
    if (task.length !== 0) {
        const todo = { id: Date.now(), content: input.value, completed: false };
        input.value = " ";
        ls.saveTodo(todo)
        loadTodos()
    }


}

function addList(todo) {

    ultaskCont.appendChild(todo);
}

function loadTodos() {
    ultaskCont.innerHTML = '';
    const todoList = ls.getTodoList();
    todoList.forEach(todo => {
            const el = createList(todo)
            addList(el)
        })
        // console.log(todoList)
}