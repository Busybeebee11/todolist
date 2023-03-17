
// Get the input field and button
const input = document.getElementById("new-task");
const addButton = document.getElementById("add-button");

// Get the todo list and initialize it with any items stored in localStorage
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

// Function to render the todo list
function renderTodoList() {
    const list = document.getElementById("tasks-list");
    list.innerHTML = "";

    // Render the todo list items
    todoList.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.classList.add('li-item');

        // Create a p tag for the task text
        const taskText = document.createElement('p');
        taskText.classList.add('p-text');
        taskText.textContent = task;

        // Create a div for the edit and delete buttons
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('task-buttons');

        // Create an edit button for each item
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerHTML = '<i class="fa-regular fa-pen-to-square">';
        editButton.onclick = () => editTask(task);

        // Create a delete button for each item
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('icon-button');
        deleteButton.innerHTML = '<i class="fa-regular fa-trash-can">';
        deleteButton.onclick = () => removeTask(task);

        // Append the buttons
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);

        listItem.appendChild(taskText);
        listItem.appendChild(buttonsDiv);

        list.insertBefore(listItem, list.childNodes[0]);
    });
}

// Function to add a new task to the todo list
function addTask() {
    const task = input.value.trim();

    // Check that the input field is not empty
    if (task === "") {
        return;
    }

    // Add the new task to the todo list
    todoList.unshift(task);

    // Save the updated todo list to localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // Reset the input field
    input.value = "";

    // Re-render the todo list
    renderTodoList();
}

// Function to edit a task in the todo list
function editTask(task) {
    const index = todoList.indexOf(task);
    const newTask = prompt("Edit task:", task);

    if (newTask !== null && newTask !== "") {
        todoList[index] = newTask;
        renderTodoList();
    }
}

// Function to remove/delete a task from the todo list
function removeTask(task) {
    const index = todoList.indexOf(task);

    if (index > -1) {
        todoList.splice(index, 1);

        // Save the updated todo list to localStorage
        localStorage.setItem("todoList", JSON.stringify(todoList));

        // Re-render the todo list
        renderTodoList();
    }
}

// Bind event listeners to the input field and button
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

addButton.addEventListener("click", addTask);

// Render the todo list when the page is loaded
renderTodoList();




   

