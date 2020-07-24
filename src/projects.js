class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.todoList = [];
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }

  removeTodo(todo) {
    console.log(this.todoList);
    this.todoList = this.todoList.filter((value) => value !== todo);
    console.log(this.todoList);
  }

  get countTodos() {
    return this.todoList.length;
  }
}

export default Project;