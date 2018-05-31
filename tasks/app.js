const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

let tasks = getTasks();

loadTasks();
loadEventListeners();


function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
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
    let li;

    if (e.target.parentElement.classList.contains("delete-item")) {
        li = e.target.parentElement.parentElement; 
        
        let text = e.target.parentElement.parentElement.textContent;
        li.remove();
        tasks = tasks.filter(function (task) {
            return task !== text;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function clearTasks(e) {
    const ul = document.querySelector('ul.collection');

    const vals = ul.children;

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
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    return tasks;
}

function loadTasks() {

    const ul = document.querySelector('ul.collection');
    let li;
    tasks.forEach(function (item) {
        console.log(item);
        li = createListItem(item);
        ul.appendChild(li);
    });
        
}

function filterTasks(e) {
    let val = e.target.value.trim().toLowerCase();
    const filtered = [];

    tasks.forEach(function (task) {
        if (task.toLowerCase().includes(val.toLowerCase())) {
            filtered.push(task);
        }
    });
    
    const lis = document.querySelectorAll('li.collection-item');
    lis.forEach(function (li) {
        if (!filtered.includes(li.textContent)) {
            li.style.display = 'none';
        } else {
            li.style.display = 'list-item';
        }
    });

}