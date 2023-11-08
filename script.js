document.querySelector('.btn-primary-get').addEventListener('click', (event) => {
    event.preventDefault();
    let taskInput = document.querySelector('#form1');
    let task = taskInput.value;
    taskInput.value = '';
    if (task === '') {
        return;
    }

    let tbody = document.querySelector('tbody');
    let row = document.createElement('tr');

    let cell1 = document.createElement('td');
    cell1.textContent = tbody.children.length + 1;

    let cell2 = document.createElement('td');
    cell2.textContent = task;

    let cell3 = document.createElement('td');
    cell3.textContent = 'In progress';
    cell3.style.width = '100px';

    let cell4 = document.createElement('td');
    cell4.style.width = '300px';
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger';
    deleteButton.style.marginRight = '10px';

    deleteButton.addEventListener('click', (event) => {
        // Usuwamy wiersz
        event.target.parentNode.parentNode.remove();

        // Aktualizujemy numerację
        Array.from(tbody.children).forEach((row, index) => {
            row.firstChild.textContent = index + 1;
        });
    });

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn btn-primary me-1'; // me-1 to margines po prawej stronie
    editButton.style.marginRight = '10px';

    editButton.addEventListener('click', function handleEditClick(event) {
        let taskCell = event.target.parentElement.parentElement.children[1];
        let originalTask = taskCell.textContent;
        let statusCell = event.target.parentElement.parentElement.children[2];
    
        if (event.target.textContent === 'Edit') {
            let inputField = document.createElement('input');
            inputField.value = originalTask;
    
            taskCell.textContent = '';
            taskCell.appendChild(inputField);
    
            statusCell.textContent = 'In edit';
    
            let finishedButton = event.target.parentNode.querySelector('.btn-success');
            finishedButton.disabled = true;
    
            event.target.textContent = 'Save';
    
            event.target.removeEventListener('click', handleEditClick);
            event.target.addEventListener('click', function handleSaveClick(event) {
                if (event.target.textContent === 'Save') {
                    let newTask = inputField.value;
                    taskCell.textContent = newTask;
    
                    statusCell.textContent = 'In progress';
    
                    finishedButton.disabled = false;
    
                    event.target.textContent = 'Edit';
    
                    // Dodaj z powrotem nasłuchiwacz handleEditClick
                    event.target.addEventListener('click', handleEditClick);
    
                    // Usuń nasłuchiwacz handleSaveClick
                    event.target.removeEventListener('click', handleSaveClick);
                }
            });
        }
    });

    let finishedButton = document.createElement('button');
    finishedButton.textContent = 'Finished';
    finishedButton.className = 'btn btn-success ms-1';

    finishedButton.addEventListener('click', (event) => {
    const statusCell = event.target.parentNode.previousElementSibling;
    const taskCell = statusCell.previousElementSibling;

    if (event.target.textContent === 'Finished') {
        statusCell.textContent = 'Completed';
        taskCell.style.textDecoration = 'line-through';
        taskCell.style.textDecorationColor = 'red';
        taskCell.style.textDecorationThickness = '2px';
        event.target.textContent = 'Unfinished';
    } else {
        statusCell.textContent = 'In progress';
        taskCell.style.textDecoration = 'none';
        event.target.textContent = 'Finished';
    }
});

    cell4.prepend(editButton);
    cell4.appendChild(deleteButton);
    cell4.appendChild(finishedButton);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    tbody.appendChild(row);
});

