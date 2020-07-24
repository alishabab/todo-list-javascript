import './style.scss';
import Project from './projects';
import Todo from './todos';

const projectDiv = document.querySelector('#projects');
const createProjectBtn = document.querySelector('#create-project');
console.log(createProjectBtn);

const defaultProject = new Project('default', 'This is the default toDo list');
const testTodo = new Todo('test', 'test', 'ddffdsd', 'dddddddd');
defaultProject.addTodo(testTodo);
const projectList = [defaultProject];

const createProject = () => {
  const title = document.querySelector('.project-title').value;
  const description = document.querySelector('.project-decription').value;
  const newProject = new Project(title, description);
  projectList.push(newProject);
  renderProjects();
};

const createTodoForm = () => {
  const form = document.createElement('form');
  const inputs = ['title', 'description', 'dueDate', 'priority'];
  inputs.forEach(input => {
    const element = document.createElement('input');
    element.textContent = input;
    element.classList.add(`todo-${input}`);
    form.appendChild(element);
  });
  const button = document.createElement('button');
  button.textContent = 'Create Todo';
  form.appendChild(button);
  button.addEventListener('click', createTodo);
  document.body.appendChild(form);
};
const createTodo = () => {
  const project = defaultProject;
  const title = document.querySelector('.todo-title').value;
  const description = document.querySelector('.todo-decription').value;
  const dueDate = document.querySelector('.todo-dueDate').value;
  const priority = document.querySelector('.todo-priority').value;
  const newTodo = new Todo(title, description, dueDate, priority);
  project.todoList.push(newTodo);
};

const getTodoList = (project) => {
  const ul = document.createElement('ul');
  project.todoList.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.title;
    ul.appendChild(li);
  });
  return ul;
};
const renderProjects = () => {
  projectList.forEach(project => {
    const p = document.createElement('p');
    const newTodoBtn = document.createElement('button');
    newTodoBtn.textContent = '+-';
    p.textContent = project.title;
    p.appendChild(newTodoBtn);
    newTodoBtn.addEventListener('click', createTodoForm);
    projectDiv.appendChild(p);
    projectDiv.appendChild(getTodoList(project));
  });
};

createProjectBtn.addEventListener('click', createProject);
renderProjects();
