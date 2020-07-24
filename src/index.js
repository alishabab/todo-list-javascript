import MicroModal from 'micromodal';
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
  const inputs = ['title', 'description', 'dueDate', 'priority', 'project'];
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
  document.querySelector('#todo-form').appendChild(form);
};
const createTodo = (event) => {
  event.preventDefault();
  const projectName = document.querySelector('.todo-project').value;
  const project = projectList.filter(item => item.title === projectName);
  const title = document.querySelector('.todo-title').value;
  const description = document.querySelector('.todo-description').value;
  const dueDate = document.querySelector('.todo-dueDate').value;
  const priority = document.querySelector('.todo-priority').value;
  const newTodo = new Todo(title, description, dueDate, priority);
  console.log(newTodo);
  console.log(project);
  project[0].todoList.push(newTodo);
  renderProjects();
};

const getTodoList = (project) => {
  const ul = document.createElement('ul');
  project.todoList.forEach(todo => {
    const li = document.createElement('button');
    li.textContent = todo.title;
    li.setAttribute('data-micromodal-trigger', 'modal-1');
    ul.appendChild(li);
  });
  return ul;
};

const cleanPage = () => {
  while (projectDiv.firstChild) {
    projectDiv.removeChild(projectDiv.lastChild);
  }
};

const renderProjects = () => {
  cleanPage();
  projectList.forEach(project => {
    const p = document.createElement('p');
    p.textContent = project.title;
    projectDiv.appendChild(p);
    projectDiv.appendChild(getTodoList(project));
  });
};

// document.querySelector('.create-todo-btn').addEventListener('click', createTodoForm);
createTodoForm();

createProjectBtn.addEventListener('click', createProject);
renderProjects();

const li = document.createElement('button');
li.textContent = 'asdfasdf';
li.setAttribute('data-micromodal-trigger', 'modal-1');
document.body.appendChild(li);

MicroModal.init();