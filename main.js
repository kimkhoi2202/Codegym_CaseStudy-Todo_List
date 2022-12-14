//Initialize variables
let edit_flag = false //check if the user is editting other tasks
let task_list = []

function add_Task() {
    new_task = document.getElementById("new-task-input").value;
    if (!new_task) {
        alert("Please enter a task name");
        return;
    } else if (task_list.indexOf(new_task) != -1) {
        alert("You cannot have the same task name")
        return;
    }
    task_list.push(new_task);
    display_Task();
    document.getElementById("new-task-input").value = ""; //reset input field
}

function display_Task() {
    const display_task_list = document.getElementById("display-task-list");

    //create input to display the tasks
    new_list_item_input = document.createElement("input");
    new_list_item_input.value = new_task;
    new_list_item_input.readOnly = true;
    new_list_item_input.id = "task-" + task_list.indexOf(new_task);
    
    //create edit button
    new_list_item_edit_btn = document.createElement("button");
    new_list_item_edit_btn.innerText = "Edit";
    new_list_item_edit_btn.onclick = function(){edit_Task(this.id)};
    new_list_item_edit_btn.id = "edit-btn-" + task_list.indexOf(new_task);

    //create complete button
    new_list_item_complete_btn = document.createElement("button");
    new_list_item_complete_btn.innerText = "Complete";
    new_list_item_complete_btn.onclick = function(){delete_Task(this.id)};
    new_list_item_complete_btn.id = "complete-btn-" + task_list.indexOf(new_task);

    //create break element
    new_break = document.createElement("br");
    new_break.id = "break-" + task_list.indexOf(new_task);

    //append the elements to HTML
    display_task_list.appendChild(new_list_item_input);
    display_task_list.appendChild(new_list_item_edit_btn);
    display_task_list.appendChild(new_list_item_complete_btn);
    display_task_list.appendChild(new_break); //create break element
}

function edit_Task(edit_btn_id) {
    if (edit_flag) {
        alert("Please save the task first")
        return;
    }
    edit_flag = true
    edit_btn_id_el = document.getElementById(edit_btn_id);
    task_id_edit = document.getElementById("task-" + edit_btn_id.slice(-1));
    task_id_edit.removeAttribute("readonly");
    edit_btn_id_el.innerText = "Save";
    edit_btn_id_el.onclick = function(){save_Task(edit_btn_id)};
}

function save_Task(edit_btn_id) {
    edit_flag = false
    edit_btn_id_el.innerText = "Edit";
    edit_btn_id_el.onclick = function(){edit_Task(edit_btn_id)};
    task_id_edit.readOnly = true;
    task_list[edit_btn_id.slice(-1)] = task_id_edit.value;
}

function delete_Task(complete_btn_id) {
    //delete complete button
    complete_btn_id_el = document.getElementById(complete_btn_id);
    complete_btn_id_el.remove();
    
    //delete task
    task_id_complete = document.getElementById("task-" + complete_btn_id.slice(-1));
    task_id_complete.remove()

    //delete edit button
    document.getElementById("edit-btn-" + complete_btn_id.slice(-1)).remove();

    //delete break element
    console.log(document.getElementById("break-" + complete_btn_id.slice(-1)));
    document.getElementById("break-" + complete_btn_id.slice(-1)).remove();

    //delete from task_list array
    task_list.splice(complete_btn_id.slice(-1))
}