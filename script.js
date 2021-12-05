let Input = document.querySelector('.input');
let Button = document.querySelector('.button');
let TodoList = document.querySelector('.todo-list');
let Filter = document.querySelector('.filter');

Button.addEventListener('click', addList);


function addList(e){

    e.preventDefault();

    let NewDiv = document.createElement('div');
    NewDiv.classList.add('todo')

    let NewLi = document.createElement('li');
    //To check input null or "".
    if( Input.value == null || Input.value == "" ){
        alert("Please write something here before submitting!!");
        return;
    }else{
        NewLi.innerHTML=Input.value;
    }
    NewLi.classList.add('item');

    // To store data
    toSaveLocalStorage(Input.value);

    NewDiv.appendChild(NewLi);

    let NewButton = document.createElement('button');
    NewButton.innerHTML = '<i class="fas fa-check"></i>';
    NewButton.classList.add('btn');
    NewDiv.appendChild(NewButton);

    let NewButtonDel = document.createElement('button');
    NewButtonDel.innerHTML = '<i class="fas fa-trash"></i>';
    NewButtonDel.classList.add('Delbtn');
    NewDiv.appendChild(NewButtonDel);

    TodoList.appendChild(NewDiv);

    Input.value = "";
}


TodoList.addEventListener("click" ,DeleteItem);

function DeleteItem(e){
    
    let item = e.target;

    if( item.classList[0] === 'Delbtn'){
       let todoremove = item.parentElement;
       todoremove.classList.add("RemoveEffect");
       
       //to remove localstorage data
       DeleteLocalStorageItems(todoremove);

       todoremove.addEventListener('transitionend',()=>{
           todoremove.remove();
       });
    }

    if( item.classList[0] === 'btn' ){
        let todoremove = item.parentElement;
        todoremove.classList.toggle('effectText');
    }
}


Filter.addEventListener('click', addFilter);

function addFilter(e){
    let todos = TodoList.childNodes;
    todos.forEach(function(todo){

        switch (e.target.value) {
            case "all":
              todo.style.display = "flex";
              break;
            case "completed":
              if (todo.classList.contains("effectText")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
              break;
            case "uncompleted":
              if (!todo.classList.contains("effectText")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
          }
    });

}


function toSaveLocalStorage(todo){

    let todos;

    if(localStorage.getItem('todos') === null ){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

// To show data on screen

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('todos') === null ){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.forEach(function(todo){

        let NewDiv = document.createElement('div');
        NewDiv.classList.add('todo')
    
        let NewLi = document.createElement('li');
        NewLi.innerHTML=todo;
        NewLi.classList.add('item');
    
        NewDiv.appendChild(NewLi);
    
        let NewButton = document.createElement('button');
        NewButton.innerHTML = '<i class="fas fa-check"></i>';
        NewButton.classList.add('btn');
        NewDiv.appendChild(NewButton);
    
        let NewButtonDel = document.createElement('button');
        NewButtonDel.innerHTML = '<i class="fas fa-trash"></i>';
        NewButtonDel.classList.add('Delbtn');
        NewDiv.appendChild(NewButtonDel);
    
        TodoList.appendChild(NewDiv);
    })
});

// To Delete items from localStorage

function DeleteLocalStorageItems(todo){

    let todos;

    if(localStorage.getItem('todos') === null ){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let index = todo.children[0].innerText;
    todos.splice(todos.indexOf(index),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
