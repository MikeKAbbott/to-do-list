/* 
Task class that has an instance of all the current task as an array,
the user input text field, and the list of task displayed on the dom
*/

function Task(){
    this.tasks = [];
    this.inputField = document.getElementById("user-input");
    this.todoList = document.getElementById("todo-list")
    this.init() 
};
/*
Initialize the event listeners
*/
Task.prototype.init = function(){
    this.addEventListeners();
};
/*
Standard addEventListeners function 
*/
Task.prototype.addEventListeners = function(){
    $(document).on("click",".add-button",this.addTask)
    $(document).on("keyup",'#user-input',this.addTask)
    $(document).on("click",".delete-button",this.removeTask)
    $(document).on("change",".checkbox",this.completeTask)
};

/*
Function displayTasks takes the array of tasks and adds each task 
to a list item that contains a checkbox, label and span.
*/
Task.prototype.displayTasks = function(){
    for (task of this.tasks){
        if(!this.doesExist(task)){
            var html = `<li id=${task}><input class="checkbox" type="checkbox"><label for=${task}></label><span>${task}</span>
            <button class="delete-button"><img src="./images/itrash-50.png" alt="Delete"></button></li>`;
            this.todoList.innerHTML += html;
        }
    }
};
/* 
Function clearInput clears the current input field after
a task is created
*/
Task.prototype.clearInput = function(){
    this.inputField.value = "";
}
/*
Function doesExist checks to see if a current task is already in
the DOM by checking for the id
*/

Task.prototype.doesExist = function(task){
    return $("#" + task).length;
};
/*
Function getInput returns the value in the input text field
*/

Task.prototype.getInput = function(){
    return document.getElementById("user-input").value;
};

/*
Function addTask gets the current input, checks if the input isnt in
the task array, then pushes the task to the task array
*/
Task.prototype.addTask = function(event){
    var task = Todo.getInput();
    if ((event.which === 13 || event.type === "click") && task && !Todo.tasks.includes(task)){
        Todo.tasks.push(task)
        Todo.clearInput()
        Todo.displayTasks()
    }
}
/*
Function removeTask finds the parent list item, filters out the item from the 
array and removes the item from the dom.
*/
Task.prototype.removeTask = function(){
    var parent = $(this).parent()[0]
    Todo.tasks = Todo.tasks.filter(x => x != parent.id)
    parent.remove()
}
/* 
Function completeTask finds the span containing the task that
was checked off and strikes through it. If the task was unchecked
the strike is removed.
*/

Task.prototype.completeTask = function(){
    var listItem = $(this).parent()[0];
    var span = $(listItem).find("span")[0]
    html = new String(span.innerHTML)
    if(this.checked){
        span.innerHTML = html.strike();
    }else{
        $(span).children().remove()
        span.innerHTML = listItem.id
    }
}
/* 
Creates a new instance of the Task class once a new window is loaded
*/
$(window).on("load", function(){
    window.Todo = new Task();
});