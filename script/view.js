export class View {
  constructor() {
    this.app = this.getElement("#root");

    this.title = this.createElement("h1", "title");
    this.title.textContent = "Todos";

    this.form = this.createElement("form", "todo-form");

    this.input = this.createElement("input", "todo-input");
    this.input.type = "text";
    this.input.placeholder = "Add todo";
    this.input.name = "todo";

    this.btnSubmit = this.createElement("button", "todo-btn");
    this.btnSubmit.classList.add("btn");
    this.btnSubmit.textContent = "Submit";

    this.todoList = this.createElement("ul", "todo-list");

    this.form.append(this.input, this.btnSubmit);

    this.app.append(this.title, this.form, this.todoList);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  get _inputText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  displayTodos(todos) {
    //delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    //show default message
    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "What do you want to achieve today?";
      this.todoList.append(p);
    } else {
      // render every todo
      todos.forEach((todo) => {
        const li = this.createElement("li");
        li.id = todo.id;

        //checkbox
        const checkbox = this.createElement("input", "check");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        //span element for todo text
        const span = this.createElement("span");
        span.contentEditable = true;
        span.classList.add("editable");

        //mark todo as completed
        if (todo.completed) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        //delete button
        const deleteBtn = this.createElement("a", "delete-btn");
        deleteBtn.id = todo.id;
        deleteBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

        `;
        // deleteBtn.textContent = "Delete";
        const div = this.createElement("div", "todo-text-box");
        div.append(span, deleteBtn);
        li.append(checkbox, div);

        //append node to todo list
        this.todoList.append(li);
      });
    }
  }

  bindAddTodo(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._inputText) {
        handler(this._inputText);
        this._resetInput();
      }
    });
  }

  bindRemoveTodo(handler) {
    this.todoList.addEventListener("click", (e) => {
      const target = e.target;
      if (target.className === "delete-btn") {
        const id = parseInt(target.parentElement.parentElement.id);
        handler(id);
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", (e) => {
      const target = e.target;
      if (target.type === "checkbox") {
        const id = parseInt(target.parentElement.id);
        handler(id);
      }
    });
  }

  bindEditTodo() {
    this.todoList.addEventListener("change", (e) => {
      const target = e.target;
      if (target.classList.contains("editable")) {
        const id = parseInt(target.parentElement.id);
        handler(id);
      }
    });
  }
}
