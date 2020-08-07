
function Task(){
    this.tasks = [];
    this.input_field = document.getElementById("user-input");
    this.task_list = document.getElementById("tasks")
    this.delete_list = document.getElementById("actions")
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
    for (task of Task.tasks){
        if(!document.getElementById(task)){
            var html = `<pre><input class="checkbox" type="checkbox" id= ${task}><label for=${task}> ${task}</label></pre>`;
            var button = `<pre><button data-id=${task} class="delete-button"><img src="./images/itrash-50.png" alt="Delete"></button></pre>`
            Task.task_list.innerHTML += html;
            Task.delete_list.innerHTML += button;
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
        Task.input_field.value = "";

    }else{
        console.log("No task made")
    }
    Task.fillTasks();
}

Task.prototype.removeTask = function(){
    var item = Task.tasks.indexOf(this.dataset.id)
    Task.tasks.splice(item)
    document.getElementById(this.dataset.id).remove()
    document.querySelector("label[for="+this.dataset.id+"]").remove()
    this.remove();
    $('pre').each(function(){
        if(!$(this).text() && !$(this).html()){
            $(this).remove();
        }
    })
    Task.fillTasks();

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