import utils from './utils.js';
import ls from './ls.js';

const input = document.querySelector(".task-text");
const button = document.querySelector("button");
const empty = document.querySelector(".empty");
const ultaskCont = document.querySelector(".ul");
const filterTodo = document.querySelector(".todofilter");

// const buttonActive = document.querySelector("#active").onclick = applyFilters;
// const buttonCompleted = document.querySelector("#completed").onclick = applyFilters;;
// const buttonAll = document.querySelector("#all").onclick = applyFilters;

// const container = document.querySelector(".container");
// filterTodo.addEventListener("click", filterToDos);

button.addEventListener("click", (e) => {
    e.preventDefault();
    addNewTodo();

});
loadTodos();

function createList(todo) {
    const taks = todo.content;
    if (taks !== "") {
        const list = document.createElement("li");
        list.setAttribute("id", "normal");
        const p = document.createElement("p");
        p.textContent = taks;
        list.appendChild(crossOutList())
        list.appendChild(p);
        list.appendChild(addDeleteBtn())
        ultaskCont.appendChild(list)

        input.value = "";
        empty.style.display = "none";
    }
    return ultaskCont
}

function addDeleteBtn() {
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";


    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ultaskCont.removeChild(item);

        const items = document.querySelectorAll("li");

        if (items.length === 0) {
            empty.style.display = "block";
        }
    });

    return deleteBtn;
}

function crossOutList() {

    const check = document.createElement("input");

    check.type = "checkbox";
    check.className = "check"


    check.addEventListener("change", (e) => {
        const list = e.target.parentElement;
        list.classList.toggle("completed");
        const item = e.target.parentElement.childNodes[1];
        item.style.textDecoration = check.checked ? 'line-through' : 'none';
    })
    return check;
}


function filterToDos(e) {
    const todos = ultaskCont.childNodes;
    todos.forEach(function(todo) {
        switch (e.Target.value) {
            case "all":
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
                if (!todo.classList == "completed") {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break
        }
    });

}

function addNewTodo(e) {
    const todo = { id: Date.now(), content: input.value, completed: false };
    input.value = " ";
    const todoItem = createList(todo);
    ls.saveTodo(todoItem)
    loadTodos()
}

function addList(todo) {
    document.querySelector(".ul").appendChild(todo);
}

function loadTodos() {
    const todoList = ls.getTodoList();
    todoList.forEach(todo => {
        const el = createList(todo)
        addList(el)
    })
}


// function applyFilters(e) {
//     document.querySelector('.ul').innerHTML = " ";
//     let filterToDos = [];
//     const allTodos = ls.getTodoList();

//     if (e.currentTarget.id == "active") {
//         filterToDos = utils.activeFilter(allTodos)
//     }
//     filterToDos.forEach(todo => {
//         const el = createElement(todo)
//         createList(el)
//     })
// }