import './style.scss';
import Project from './projects';
import Todo from './todos';

console.log('Hello World');

const defaultProject = new Project('default', 'This is the default toDo list');
const projectList = [defaultProject];

const createProject = (title, description) => {
  const newProject = new Project(title, description);
  projectList.push(newProject);
};

const createTodo = (project, title, description, dueDate, priority) => {
  const newTodo = new Todo(title, description, dueDate, priority);
  project.todoList.push(newTodo);
};