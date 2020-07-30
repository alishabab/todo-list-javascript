class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.todoList = [];
  }

  static filterTodo(project, todo) {
    project.todoList = project.todoList.filter((value) => value !== todo);
  }
}

export default Project;