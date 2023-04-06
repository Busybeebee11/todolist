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

        // Change the edit button to a save button
        editButton.innerText = "Edit";
        editButton.removeEventListener('click', saveEdit);
        editButton.addEventListener('click', () => editTask(taskTextElement));
    };

    const handleKeydown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveEdit();
        }
    };

    // Create the save button
    const editButton = taskTextElement.parentElement.querySelector('.edit-button');
    editButton.innerText = "Save";
    editButton.addEventListener('click', saveEdit);

    taskTextElement.addEventListener('blur', saveEdit);
    taskTextElement.addEventListener('input', () => {
        editButton.style.display = 'inline-block'; // Show the button when text is changed
    });
    document.addEventListener('keydown', handleKeydown);
}



const editButton = document.createElement('button');
editButton.classList.add('edit-button');
editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
editButton.onclick = () => editTask(taskText);

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

        editButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
    };

    const handleKeydown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveEdit();
        }
    };

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
    editButton.addEventListener('click', saveEdit);
    editButton.style.display = 'none'; // Hide the button by default
    taskTextElement.parentElement.appendChild(editButton);

    taskTextElement.addEventListener('blur', saveEdit);
    taskTextElement.addEventListener('input', () => {
        editButton.style.display = 'inline-block'; // Show the button when text is changed
    });
    document.addEventListener('keydown', handleKeydown);
}





