
function Task(){
    this.tasks = [];
    this.input_field = document.getElementById("task");
    this.task_list = document.getElementById("task-list")
    this.delete_list = document.getElementById("delete-buttons")
    this.init() 
};

Task.prototype.init = function(){
    this.addEventListeners();
};

Task.prototype.addEventListeners = function(){
    this.input_field.addEventListener("keyup", this.addTask)
    $(document).on("click",".delete-button",this.removeTask)
    $(document).on("change",".checkbox",this.completeTask)
};

Task.prototype.fillTasks = function(){
    return;
};

Task.prototype.getInput = function(){
    return document.getElementById("task").value;
};

Task.prototype.addTask = function(event){
    var task = Task.getInput();
    if (event.keyCode === 13 && task){
        var new_task = document.createElement('li');
        var new_delete_button = document.createElement('li')
        new_delete_button.innerHTML = '<button id='+ task +' class="delete-button"><img src="./images/itrash-50.png" alt="Delete"></button>'  
        new_task.innerHTML = '<input class="checkbox" type="checkbox" id='+ task +'><label for='+ task +'>'+ task +'</label>';
        Task.task_list.appendChild(new_task);
        Task.delete_list.appendChild(new_delete_button)
        Task.input_field.value = "";

    }else{
        console.log("No task made")
    }
}
Task.prototype.removeTask = function(){
    var item = document.querySelector("input[id="+ this.id +"]")
    var label = document.querySelector("label[for="+ this.id+"]")
    this.remove();
    item.remove()
    label.remove()

}

Task.prototype.completeTask = function(){
    label = document.querySelector('label[for='+ this.id +']')
    html = new String(label.innerHTML)
    if(this.checked){
        label.innerHTML = html.strike();
    }else{
        var html = label.childNodes[0].innerHTML
        label.removeChild(label.childNodes[0])
        label.innerHTML = html
    }
}

$(window).on("load",function(){
    window.Task = new Task();
});