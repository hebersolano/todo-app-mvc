import { Model } from "./model.js";
import { View } from "./view.js";

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    //display initial todoList
    this.handleGetStorageData();
    this.onTodoListChanged(this.model.todoList);
    // this.view.displayTodos(this.model.todoList);

    this.view.bindAddTodo(this.handleAddTodo.bind(this));
    this.view.bindRemoveTodo(this.handleRemoveTodo);
    this.view.bindToggleTodo(this.handleToggleTodo.bind(this));
    this.model.bindTodoListChanged(this.onTodoListChanged);
  }

  onTodoListChanged = (todoList) => {
    this.view.displayTodos(todoList);
    this.model._setStorageData();
  };

  handleGetStorageData = () => {
    this.model._getStorageData();
  };

  handleAddTodo(text) {
    this.model.addTodo(text);
  }

  handleEditTodo(id, text) {
    this.model.editTodo(id, text);
  }

  handleRemoveTodo = (id) => {
    this.model.rmTodo(id);
  };

  handleToggleTodo(id) {
    this.model.toggleTodo(id);
    // this.view.displayTodos(this.model.todoList);
  }
}

const app = new Controller(new View(), new Model());

console.log(app);

window.myapp = app;
