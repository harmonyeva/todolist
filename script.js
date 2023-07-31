// declaring global variables
const button = document.getElementById('button');
const taskList = document.getElementById('taskList');

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = [...document.getElementsByClassName("tasks")];

  // saves each task and turns it into text content
  const taskContents = tasks.map(task => task.textContent);
  localStorage.setItem('tasks', JSON.stringify(taskContents));
}

// Function to render tasks from localStorage
function renderTasksFromLocalStorage() {

  // gets stored items and saves them to a variable  
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));

  //checking that a storedtask exists
  if (storedTasks && storedTasks.length > 0) {

    // creates each task a place into the document (setting attributes, appending, etc)
    storedTasks.forEach(taskContent => {
      const newTask = document.createElement("li");
      const newCheckbox = document.createElement('input');
      newCheckbox.setAttribute("type", "checkbox");
      newCheckbox.setAttribute("class", "checkbox");
      const newContent = document.createTextNode(taskContent);
      newTask.setAttribute("class", "tasks");
      newTask.appendChild(newCheckbox);
      newTask.appendChild(newContent);
      taskList.appendChild(newTask);
    });
  }
}

// Add event listener to the button to add a new task
button.addEventListener("click", buttonPress);

function buttonPress() {
  const newTask = document.createElement("li");
  const newCheckbox = document.createElement('input');
  newCheckbox.setAttribute("type", "checkbox");
  newCheckbox.setAttribute("class", "checkbox");
  const newContent = document.createTextNode(prompt('Add a new task'));
  newTask.setAttribute("class", "tasks");
  newTask.appendChild(newCheckbox);
  newTask.appendChild(newContent);
  taskList.appendChild(newTask);

  // Save tasks to localStorage
  saveTasksToLocalStorage(); 
}

// Checkboxes change event
taskList.addEventListener('change', (event) => {
  const target = event.target;
  if (target.type === 'checkbox') {
    const taskItem = target.parentElement;
    if (target.checked) {
      taskItem.style.textDecoration = 'line-through';
    } else {
      taskItem.style.textDecoration = 'none';
    }
    saveTasksToLocalStorage(); // Save tasks to localStorage
  }
});

// Load tasks from localStorage on page load
renderTasksFromLocalStorage();


// make clear tasks function