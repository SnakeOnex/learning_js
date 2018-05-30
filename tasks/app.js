const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

let tasks = getTasks();
console.log(tasks);

loadTasks();
loadEventListeners();


function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
}

function addTask(e) {
    e.preventDefault();

    const task = document.querySelector('#task').value;
    const ul = document.querySelector('ul.collection');
    
    const li = createListItem(task);
   
    ul.appendChild(li);

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    taskInput.value = '';

}

function createListItem(taskValue) {

    // create task element
    let li = document.createElement('li');
    li.className = 'collection-item';
    li.textContent = taskValue;

    const a = document.createElement('a');
    a.href = '#';
    a.className = 'delete-item secondary-content';
    a.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(a);
    
    return li;
}

function removeTask(e) {
    console.log('parek');
    let li;

    if (e.target.parentElement.classList.contains("delete-item")) {
        li = e.target.parentElement.parentElement; 
        
        
        console.log(e.target.parentElement.parentElement.textContent);

        let text = e.target.parentElement.parentElement.textContent;
        li.remove();
        console.log(tasks);
        tasks = tasks.filter(function (task) {
            return task !== text;
        });
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function clearTasks(e) {
    const ul = document.querySelector('ul.collection');

    const vals = ul.children;
    console.log(vals);

    console.log(vals.length);

    const len = vals.length;
    for (let i = 0; i < len; i++) {
        vals[0].remove();
    }
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        console.log(123);
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    return tasks;
}

function loadTasks() {
    console.log(tasks);
    console.log(123);


    const ul = document.querySelector('ul.collection');
    let li;
    tasks.forEach(function (item) {
        console.log(item);
        li = createListItem(item);
        ul.appendChild(li);
    });
        
}
