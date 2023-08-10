// sweet alert function 
function showAlert(title, comment, icon, button) {
  swal(title, comment, {
    icon: icon,
    buttons: {
      confirm: {
        className: button
      }
    }
  });
}

// todo's array
let allTodo = JSON.parse(localStorage.getItem("todos")) || [];

// display todos in borwser
const todoContainerEl = document.querySelector('#todoContainer');

function displayTodo() {
  todoContainerEl.innerHTML = '';
  allTodo.forEach((todos) => {
    const { todoName, id, isCompleted } = todos;

    todoContainerEl.innerHTML += `
      <div class="mt-3 todo_box shadow-sm">
        <div class="d-flex align-items-center justify-content-center">
          <div class="me-auto">
            <div class=${isCompleted ? "text-white text-decoration-line-through" : "text-white"}>
              ${todoName}
            </div>
          </div>

          <div>
            <div class="d-flex gap-3">
              <i class="far fs-5 fa-check-circle text-success delete-btn" onclick="completeTodo(${id})"></i>
              <i class="fas fa-trash-alt fs-5 text-danger delete-btn" onclick="deleteTodo(${id})"></i>
            </div>
          </div>
        </div>
      </div>
    `
  })
}
displayTodo();

// handle submit todo
const todoFormEl = document.querySelector('#todoForm');
const todoNameEl = document.querySelector('#todoName');

todoFormEl.onsubmit = (e) => {
  e.preventDefault();

  allTodo.push({
    id: Math.random() * 1000,
    todoName: todoNameEl.value,
    isCompleted: false
  });

  displayTodo();
  localStorage.setItem("todos", JSON.stringify(allTodo));
  showAlert("Success", "Todo has been added successfully", "success", "btn btn-primary");
  todoNameEl.value = "";
}

// delete todo function
function deleteTodo(id) {
  allTodo = allTodo.filter(todos => todos.id !== id);
  displayTodo();
  localStorage.setItem("todos", JSON.stringify(allTodo));
}

// complete todo function
let completedTodos = JSON.parse(localStorage.getItem("completedTodo")) || [];

function completeTodo(id) {
  let todo = allTodo.find(todo => todo.id === id);
  todo.isCompleted = true;

  completedTodos.push(todo);
  displayCompletedTodo();
  localStorage.setItem("completedTodo", JSON.stringify(completedTodos));

  // delele todo after completed
  allTodo = allTodo.filter(todos => todos.id !== id);
  displayTodo();
  showAlert("Congratulations", "You have completed this todo", "success", "btn btn-primary");
  localStorage.setItem("todos", JSON.stringify(allTodo));
  checkCompletedTodoLength();
}

// display completed todos in browser
const completedTodoContainerEl = document.querySelector('#completedTodoContainer');
const completedTodoBoxEl = document.querySelector('#completedTodoBox');
function displayCompletedTodo() {
  completedTodoContainerEl.classList.remove('d-none')
  completedTodoBoxEl.innerHTML = "";
  if (completedTodos.length < 1) {
    completedTodoBoxEl.innerHTML = `
      <h4 class="text-muted text-center my-5">You have 0 completed todos</h4>
    `
  } else {
    completedTodos.forEach((todos) => {
      const { todoName } = todos;
      completedTodoBoxEl.innerHTML += `
        <div class="mt-3 todo_box shadow-sm">
          <div class="d-flex align-items-center justify-content-center">
            <div class="me-auto">
              <div class="text-white text-decoration-line-through">
                ${todoName}
              </div>
            </div>
  
            <div>
              <div class="completed_badge">
               Completed
              </div>
            </div>
          </div>
        </div>
      `;
    })
  }
}

displayCompletedTodo();

// show seeCompletedTodoBtn if completedTodos is greater than 1
const seeCompletedTodoBtn = document.querySelector('#seeCompletedTodoBtn');

function checkCompletedTodoLength() {
  if (completedTodos.length < 1) {
    seeCompletedTodoBtn.classList.add('d-none');
  } else {
    seeCompletedTodoBtn.classList.remove('d-none');
  }
}

checkCompletedTodoLength();

// open and close modal functions
const modalWrapperEl = document.querySelector('#modalWrapper');

// open modal
function openModal() {
  modalWrapperEl.classList.remove('d-none');
}

function closeModal() {
  modalWrapperEl.classList.add('d-none');
}

// clear completed todos
function clearCompletedTodo() {
  completedTodos = [];
  displayCompletedTodo();
  localStorage.setItem("completedTodo", JSON.stringify(completedTodos));
  checkCompletedTodoLength();
}