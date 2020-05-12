const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list');
const filter = document.querySelector(".filter-task"); 

document.addEventListener('DOMContentLoaded' , getTasks);
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click' , deleteCheck);
filter.addEventListener('click' , filterTask);

function addTask(event) {
    event.preventDefault();
    // creating task div includes new task and buttons
    const taskDiv = document.createElement('div');
    taskDiv.classList.add("task");
    // creating new task 
    const newTask = document.createElement('li');
    newTask.innerText=taskInput.value;
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask);
    //add task to locakstorage
    saveLocalTask(taskInput.value);
    // adding complete task button
    const compeletedButton = document.createElement('button');
    compeletedButton.innerHTML = '<i class="fas fa-check"></i>';
    compeletedButton.classList.add("complete-btn");
    taskDiv.appendChild(compeletedButton);
    // adding delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    taskDiv.appendChild(deleteButton);
    // appending task to list 
    taskList.appendChild(taskDiv);
    // clear input value
    taskInput.value="";
}

function deleteCheck(e){
    const item = e.target;
    // Delete task
    if(item.classList[0] === "delete-btn"){
       const task = item.parentElement;
       removeLocalTask(task);
       task.classList.add("fall");
       task.addEventListener('transitionend' , function(){
        task.remove();
       });
        
    }
    // check done mark
    if(item.classList[0]==="complete-btn"){
        const task = item.parentElement;
        task.classList.toggle('completed');
        console.log(task);
    }
}

function filterTask(event){
    const tasks = taskList.childNodes;
    tasks.forEach(function(task){
        switch(event.target.value){
            case "all": 
               task.style.display="flex";
               break;
            case "completed":
                if(task.classList.contains('completed')){
                   task.style.display='flex';
                }else{
                    task.style.display='none';
                }
                break;
            case "uncompleted":
                if(!task.classList.contains('completed')){
                    task.style.display='flex';
                }else{
                    task.style.display='none';
                } 
                break;   
        }
    });

}

function saveLocalTask(task){
     let tasks=[];
     if(localStorage.getItem("tasks") === null){
         tasks=[];
     }else{
         tasks = JSON.parse(localStorage.getItem("tasks"));
        
     }

     tasks.push(task);
     localStorage.setItem("tasks" , JSON.stringify(tasks));
}

function getTasks(){
   
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
       
    }
   
    tasks.forEach(function(task){
        const taskDiv = document.createElement('div');
    taskDiv.classList.add("task");
    // creating new task 
    const newTask = document.createElement('li');
    newTask.innerText=task;
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask);
    
    // adding complete task button
    const compeletedButton = document.createElement('button');
    compeletedButton.innerHTML = '<i class="fas fa-check"></i>';
    compeletedButton.classList.add("complete-btn");
    taskDiv.appendChild(compeletedButton);
    // adding delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    taskDiv.appendChild(deleteButton);
    // appending task to list 
    taskList.appendChild(taskDiv);
    })
}

function removeLocalTask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex) , 1);
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}