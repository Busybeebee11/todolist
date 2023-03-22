// Get the input field and button
const input = document.getElementById("new-task");
const addButton = document.getElementById("add-button");

// Get the todo list and initialize it with any items stored in localStorage
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

// Function to render the todo list
function renderTodoList() {
    const list = document.getElementById("tasks-list");

    // Only render the list if there are tasks
    if (todoList.length === 0) {
        list.style.display = "none";
        return;
    } else {
        list.style.display = "block";
    }

    list.innerHTML = "";

    // Render the todo list items
    for (let i = todoList.length - 1; i >= 0; i--) {
        const task = todoList[i];

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
        editButton.onclick = () => editTask(taskText);

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

        list.insertBefore(listItem, list.firstChild);
    }
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

// Function to edit & save a task in the to do list
function editTask(taskTextElement) {
    const index = todoList.findIndex((task) => task === taskTextElement.textContent.trim());

    taskTextElement.contentEditable = true;
    taskTextElement.focus();

    const textLength = taskTextElement.textContent.length;

    // Move the text cursor to the end of the taskTextElement
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.selectAllChildren(taskTextElement);
    selection.collapseToEnd();
    selection.extend(taskTextElement.firstChild, textLength);

    const saveEdit = () => {
        const newTask = taskTextElement.textContent.trim();

        if (newTask !== "") {
            todoList[index] = newTask;
            renderTodoList();

            // Save the updated todoList array to local storage
            localStorage.setItem('todoList', JSON.stringify(todoList));
        } else {
            taskTextElement.textContent = task;
        }

        taskTextElement.contentEditable = false;
        taskTextElement.removeEventListener('blur', saveEdit);
        document.removeEventListener('keydown', handleKeydown);

        editButton.style.display = 'none';
    };

    const handleKeydown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveEdit();
        }
    };

    const editButton = document.createElement('button');
    editButton.innerText = "Save";
    editButton.addEventListener('click', saveEdit);
    editButton.style.display = 'none'; // Hide the button by default
    taskTextElement.parentElement.appendChild(editButton);

    taskTextElement.addEventListener('blur', saveEdit);
    taskTextElement.addEventListener('input', () => {
        // editButton.style.display = 'inline-block'; // Show the button when text is changed
    });
    document.addEventListener('keydown', handleKeydown);
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


// Make sentences begin with capital letter
const newTask = document.getElementById("new-task");
newTask.addEventListener("input", function () {
    const text = newTask.value;
    const sentences = text.split('. ');

    const capitalizedSentences = sentences.map(sentence => {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    });

    newTask.value = capitalizedSentences.join('. ');
});

// const newTask = document.getElementById("new-task");
// newTask.addEventListener("input", function () {
//     let text = newTask.value;
//     text = text.replace(/(^|\. )\s*(\w)/g, function (match, p1, p2) {
//         return p1 + p2.toUpperCase();
//     });
//     newTask.value = text;
// });



   

