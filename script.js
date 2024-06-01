"use strict";

const TODOs = {
  NEW: "newToDo",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

const newTodoBtn = document.getElementById("newTodoBtn");
const newTodosIdUl = document.getElementById(TODOs.NEW);
const completedIdUl = document.getElementById(TODOs.COMPLETED);
const cancelledIdUl = document.getElementById(TODOs.CANCELLED);

const todos = {
  newTodos: [],
  completed: [],
  cancelled: [],
};
const speakBtn = document.querySelector("#newTodoBtn");

function speakSO(caller) {
  const speaked = new SpeechSynthesisUtterance(caller);
  speechSynthesis.speak(speaked);
  console.log("called");
}
speakBtn.addEventListener("click", function () {
  const toInput = document.getElementById("toInput").value;
  speakSO(toInput);
});
function onSubmitHandler(e) {
  e.preventDefault();
  const todoInput = document.getElementById("toInput");
  const todo = todoInput.value;

  todos.newTodos.push(todo);
  newTodosIdUl.innerHTML += `
  <li class="list-item">
                <div class="list-item-title">${todo}</div>
                <div class="list-item-actions">
                  <button class="btn btn-1" onClick="onCompleteHandler('${todo}', '${TODOs.NEW}')">
tik                  </button>
                  <button class="btn btn-2" onClick="onCancelHandler('${todo}', '${TODOs.NEW}')">
ex                  </button>
                </div>
    </li>
  `;
  document.querySelector(".btn-1").addEventListener("click", function () {
    const speakThis = `you are going to ${todo}`;
    const proSound = new SpeechSynthesisUtterance(speakThis);
    speechSynthesis.speak(proSound);
  });
  document.querySelector(".btn-2").addEventListener("click", function () {
    const speakThis = `you have cancelled  ${todo}`;
    const proSound = new SpeechSynthesisUtterance(speakThis);
    speechSynthesis.speak(proSound);
  });
}

document
  .getElementById("newTodoForm")
  .addEventListener("submit", onSubmitHandler);

function upDateUI(todoArray, ul) {
  const ulElement = document.getElementById(ul);
  ulElement.innerHTML = "";
  todoArray.forEach((todo) => {
    ulElement.innerHTML += `
    <li class="list-item">
                <div class="list-item-title">${todo}</div>
                <div class="list-item-actions">
                  <button class="btn btn-1" onClick="onCompleteHandler('${todo}', '${ul}')">
                    <ion-icon name="checkmark-outline"></ion-icon>
                  </button>
                  <button class="btn btn-2" onClick="onCancelHandler('${todo}', '${ul}')">
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                </div>
    </li>
    `;
  });
}

function onCompleteHandler(todo, section) {
  if (section === TODOs.NEW) {
    const index = todos.newTodos.indexOf(todo);
    todos.newTodos.splice(index, 1);
    upDateUI(todos.newTodos, TODOs.NEW);
    if (todos.newTodos.length < 1) {
      newTodosIdUl.innerHTML = `
      <div>No todos Available</div>
      `;
    }
    todos.completed.push(todo);
    upDateUI(todos.completed, TODOs.COMPLETED);
  } else if (section === TODOs.COMPLETED) {
    const index = todos.completed.indexOf(todo);
    todos.completed.splice(index, 1);
    upDateUI(todos.completed, TODOs.COMPLETED);
    if (todos.completed.length < 1) {
      completedIdUl.innerHTML = `
      <div>No todos Available</div>
      `;
    }
    todos.cancelled.push(todo);
    upDateUI(todos.cancelled, TODOs.CANCELLED);
  } else if (section === TODOs.CANCELLED) {
    const index = todos.cancelled.indexOf(todo);
    todos.cancelled.splice(index, 1);
    upDateUI(todos.cancelled, TODOs.CANCELLED);
    if (todos.cancelled.length < 1) {
      cancelledIdUl.innerHTML = `
      <div>No todos Available</div>
      `;
    }
    todos.newTodos.push(todo);
    upDateUI(todos.newTodos, TODOs.NEW);
  }
}
function onCancelHandler(todo, section) {
  if (section === TODOs.NEW) {
    const index = todos.newTodos.indexOf(todo);
    todos.newTodos.splice(index, 1);
    upDateUI(todos.newTodos, TODOs.NEW);
    todos.cancelled.push(todo);
    upDateUI(todos.cancelled, TODOs.CANCELLED);
  } else if (section === TODOs.COMPLETED) {
    const index = todos.completed.indexOf(todo);
    todos.completed.splice(index, 1);
    upDateUI(todos.completed, TODOs.COMPLETED);
    todos.cancelled.push(todo);
    upDateUI(todos.cancelled, TODOs.CANCELLED);
  } else if (section === TODOs.CANCELLED) {
    const index = todos.cancelled.indexOf(todo);
    todos.cancelled.splice(index, 1);
    upDateUI(todos.cancelled, TODOs.CANCELLED);
    if (todos.cancelled.length < 1) {
      cancelledIdUl.innerHTML = `
      <div>No todos Available</div>
      `;
    }
  }
}
