class Todo {
  constructor(title, description, dueDate, priority = 0, complete = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
    // Add notes and checklist later
  }
}

export default Todo;