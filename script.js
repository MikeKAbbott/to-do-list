function Task(){
    this.tasks = [];
    this.inputField = document.getElementById("user-input");
    this.todoList = document.getElementById("todo-list")
    this.init() 
};

Task.prototype.init = function(){
    this.addEventListeners();
};

Task.prototype.addEventListeners = function(){
    $(document).on("click",".add-button",this.addTask)
    $(document).on("keyup",'#user-input',this.addTask)
    $(document).on("click",".delete-button",this.removeTask)
    $(document).on("change",".checkbox",this.completeTask)
};

Task.prototype.displayTasks = function(){
    for (task of this.tasks){
        if(!this.doesExist(task)){
            var html = `<li id=${task}><input class="checkbox" type="checkbox"><label for=${task}></label><span>${task}</span>
            <button class="delete-button"><img src="./images/itrash-50.png" alt="Delete"></button></li>`;
            this.todoList.innerHTML += html;
        }
    }
};

Task.prototype.clearInput = function(){
    this.inputField.value = "";
}

Task.prototype.doesExist = function(task){
    return $("#" + task).length
};

Task.prototype.getInput = function(){
    return document.getElementById("user-input").value;
};

Task.prototype.addTask = function(event){
    var task = Todo.getInput();
    if ((event.which === 13 || event.type === "click") && task && !Todo.tasks.includes(task)){
        Todo.tasks.push(task)
        Todo.clearInput()
        Todo.displayTasks()
    }
}

Task.prototype.removeTask = function(){
    var parent = $(this).parent()[0]
    Todo.tasks = Todo.tasks.filter(x => x != parent.id)
    parent.remove()
}

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

$(window).on("load", function(){
    window.Todo = new Task();
});