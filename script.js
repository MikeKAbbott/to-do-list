
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
    this.inputField.addEventListener("keyup", this.addTask)
    $(document).on("click",".delete-button",this.removeTask)
    $(document).on("change",".checkbox",this.completeTask)
};

Task.prototype.fillTasks = function(){
    for (task of Task.tasks){
        if(!document.getElementById(task)){
            var html = `<li id=${task}><input class="checkbox" type="checkbox"}><label for=${task}></label><span>${task}</span>
            <button class="delete-button"><img src="./images/itrash-50.png" alt="Delete"></button></li>`;
            Task.todoList.innerHTML += html;
        }
    }
};

Task.prototype.getInput = function(){
    return document.getElementById("user-input").value;
};

Task.prototype.addTask = function(event){
    var task = Task.getInput();
    if (event.keyCode === 13 && task){
        Task.tasks.push(task)
        Task.inputField.value = "";

    }else{
        console.log("No task made")
    }
    Task.fillTasks();
}

Task.prototype.removeTask = function(){
    var parent = $(this).parent()
    var index = Task.tasks.indexOf(parent[0].id)
    Task.tasks.splice(index)
    parent.remove()
}

Task.prototype.completeTask = function(){
    var listItem = $(this).parent();
    var span = $("span").filter(x => x.html == listItem.id)
    span = span[0]
    html = new String(span.innerHTML)
    if(this.checked){
        span.innerHTML = html.strike();
    }else{
        var html = span.childNodes[0].innerHTML
        span.removeChild(span.childNodes[0])
        span.innerHTML = html
    }
}

$(window).on("load",function(){
    window.Task = new Task();
});