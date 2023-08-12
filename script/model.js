export class Model {
  constructor() {
    this.todoList = [
      // { id: 1, text: "take a shower", completed: false },
      // { id: 2, text: "study coding", completed: false },
    ];
  }

  // add a todo
  addTodo(text) {
    const todo = {
      id: this.todoList.length != 0 ? this.todoList.length + 1 : 1,
      text: text,
      completed: false,
    };
    this.todoList.push(todo);

    this.onTodoListChanged(this.todoList);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  // delete a todo
  rmTodo(id) {
    console.log(id);
    this.todoList = this.todoList.filter((todo) => {
      if (todo.id !== id) return todo;
    });

    this.onTodoListChanged(this.todoList);
  }

  // edit a todo
  editTodo(id, text) {
    const i = this.todoList.findIndex((todo) => todo.id === id);
    if (i >= 0) this.todoList[i].text = text;

    this.onTodoListChanged(this.todoList);
  }

  // toggle finish state of a todo
  toggleTodo(id) {
    this.todoList = this.todoList.map((todo) => {
      return todo.id == id ? { id: todo.id, text: todo.text, completed: !todo.completed } : todo;
    });

    this.onTodoListChanged(this.todoList);
  }

  _setStorageData() {
    window.localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }

  _getStorageData() {
    if (window.localStorage.length) {
      const data = JSON.parse(window.localStorage.getItem("todoList"));
      this.todoList = data.length > 0 ? data : [];
    }
  }

  clearStorageData() {
    window.localStorage.clear();
  }
}
