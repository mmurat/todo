const form = document.querySelector('#todoForm');
const task = document.querySelector('#task');
const todoList = document.querySelector('#taskList');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(task.value.length < 3) {
        task.classList.add('bg-rose-900');
        return;
    }

    task.classList.remove('bg-rose-900');

    let todoObj = createTodo(task.value);
    task.value = '';

    let todos = getTodos();
    todos.push(todoObj);
    localStorage.setItem('todos', JSON.stringify(todos));
    addTodo(todoObj);
});

function createTodo(task) {

    let date = new Date();
 
    return {
        id: Date.now(),
        task: task,
    };
}

function getTodos() {
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function addTodo(todo) { 
    let li = document.createElement('li');
    li.setAttribute('id', todo.id);
//    li.classList.add('pb-2');
    li.innerHTML = `<div class="flex items-center space-x-4">
    <div class="flex-1 min-w-0">
      <p class="hover:font-semibold"><span class="text-red-900 font-style"> ${new Date(todo.id).toLocaleString()}  - </span>  ${todo.task}
      </p>   
      </div>
      <div class="inline-flex items-center">
        <button onclick="removeTodo(${todo.id})" class="p-1 m-1 mr-5 ml-5 font-bold text-2xl text-red-900" type="button">-</button>
      </div>
    </div>`

    todoList.prepend(li);
}

function removeTodo(todoId) {
    let todos = getTodos();
    let newTodos = todos.filter(({id, task}) => id != todoId);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    let li = document.getElementById(todoId);
    li.remove();
}

(() => {
    let todos = [];

    if(localStorage.getItem('todos') === null) {
        return;
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.map( todo => {
        addTodo(todo);
    });
})()

