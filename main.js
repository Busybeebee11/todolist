// Get the todo list from localStorage or create an empty array
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Get the elements from the HTML page
const form = document.querySelector('form');
const input = document.querySelector('input');
const list = document.querySelector('ul');

// Render the todo list
function renderTodoList() {
    list.innerHTML = '';
    for (let i = 0; i < todoList.length; i++) {
        const item = todoList[i];
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            todoList.splice(i, 1);
            renderTodoList();
            saveTodoList();
        });
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const newTask = prompt('Enter a new task:', item.name);
            if (newTask && newTask.trim() !== '') {
                item.name = newTask;
                renderTodoList();
                saveTodoList();
            } else {
                alert('Please enter a valid task.');
            }
        });
        listItem.appendChild(editButton);
        listItem.appendChild(removeButton);
        list.appendChild(listItem);
    }
}

// Save the todo list to localStorage
function saveTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Add a new item to the todo list
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTask = input.value.trim();
    if (newTask !== '') {
        todoList.unshift({ name: newTask });
        renderTodoList();
        saveTodoList();
        input.value = '';
    } else {
        alert('Please enter a valid task.');
    }
});

// Render the todo list on page load
renderTodoList();




