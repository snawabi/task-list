//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const ClearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
let e;

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
  //DOM Load event
   document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear task event
  ClearBtn.addEventListener('click', clearTasks);
  //Filter Tasks event
  filter.addEventListener('keyup',filterTasks);
}

// Get Tasks from Local storage when page is reloaded, typed input does not disappear
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    // since local storage could only store string need to use JSON.parse
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
        //create li element
      const li = document.createElement('li');
      //add class
      li.className = 'collection-item';
      //create text node and append to li
      li.appendChild(document.createTextNode(task));
      //create a new link element
      const link = document.createElement('a');
      //add class
      link.className = 'delete-item secondary-content style.backgroundcolor-bl';
      // add icon html
      link.innerHTML ='<i class="fa fa-remove"></i>';
      //append the link to li
      li.appendChild(link);

      //append li to ul
      taskList.appendChild(li);
      })
    }

// Add task
function addTask(e){
  if (taskInput.value === ''){
    alert('Add a task')
  }

  //creat li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create a new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content style.backgroundcolor-bl';
  // add icon html
  link.innerHTML ='<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  //Store into local storage so when task is added, it doesn't disappeaar when page is reloaded
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";
   e.preventDefault();
}

//Store into local storage 
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    // since local storage could only store string need to use JSON.parse
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  // set it back to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove Task
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')){
    //delete li and before deleting by cliking on x icon ask are you sure
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    // remove from local storage
    removeTaskFromLocalStorage (e.target.parentElement.parentElement);
    }
  }
}

//remove from local storage 
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    // since local storage could only store string need to use JSON.parse
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear Tasks
function clearTasks() {
  // first option to remove all task by clicking CLEAR TASKS button
  // taskList.innerHTML= '';

  // second option which is faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from local storage when CLEAR TASKS button is clicked
  clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  
  // on filter tasks when someting is typed, searches if anything matches that typed letter or word under the tasks list.
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLocaleLowerCase().indexOf(text) !=-1){
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }
  });
}

