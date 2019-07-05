            let $input = $("#userInput");
            let $newButton = $("#clearButton");
            let $addButton = $("#addButton");
            let $date = $("#todaysDate");
            const $numberTask = $("#taskCount");
            let count = 0;



            // create the date 
            let currentDate = new Date();
            let currentMonth = (((currentDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (currentDate.getMonth() + 1));
            let newDate = currentMonth + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
            $date.html(newDate);


            //add new task by pressing enter
            $input.on('keypress', function (e) {
                if (e.which == 13) {
                    let $newTask = $("<li class ='li' ></li>");
                    if (($input).val() == '') {
                        alert("Please enter a task");
                        $clearTask.empty();
                        count = count;
                    };

                    $newTask.append($input.val());
                    $("#taskBox").append($newTask);
                    $input.val("");
                    count += 1;
                    $numberTask.html("Tasks: " + count);
                    //remove the list item when clicked
                    if (($newTask).click(function () {
                            $newTask.remove();
                            count -= 1;
                            $numberTask.html("Tasks: " + count);
                        }));
                    if (($newTask).mouseover(function () {
                            $($newTask).addClass("li-hover").removeClass("li");
                        }));
                    if (($newTask).mouseout(function () {
                            $newTask.addClass("li").removeClass("li-hover");
                        }));

                };






            });

            //adds a new task with the button press
            $addButton.click(function () {
                if (($input).val() == '') {
                    alert("Please enter a task");
                    $clearTask.empty();
                    count = count;
                }
                let $newTask = $("<li class='li' ></li>");
                $newTask.append($input.val());
                $("#taskBox").append($newTask);
                $input.val("");
                count += 1;
                $numberTask.html("Tasks: " + count);
                //remove the list item when clicked

                if (($newTask).click(function () {
                        $newTask.remove();
                        count -= 1;
                        $numberTask.html("Tasks: " + count);
                    }));

                if (($newTask).mouseover(function () {
                        $($newTask).addClass("li-hover").removeClass("li");
                    }));
                if (($newTask).mouseout(function () {
                        $newTask.addClass("li").removeClass("li-hover");
                    }));



            });

            //clears all task
            $newButton.click(function () {
                $clearTask = $("#taskBox");
                $clearBox = $("#taskBox");
                $clearBox.empty();
                $clearTask.empty();
                count = 0;
                $numberTask.html("Tasks: " + count);


            });
            //clears the pre-entered text once its clicked on
            $input.click(function () {
                $clearInput = $("#userInput");
                $clearInput.val("");
            });
