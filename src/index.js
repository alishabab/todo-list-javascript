import MicroModal from 'micromodal';
import './style.scss';
import Project from './projects';
import Todo from './todos';

const projectDiv = document.querySelector('#projects');
const createProjectBtn = document.querySelector('#create-project');
const modalContent = document.querySelector('.modal__content');
const modalTitle = document.querySelector('.modal__title');

const defaultProject = new Project('default', 'This is the default toDo list');
const testTodo = new Todo('test', 'test', 'ddffdsd', 'dddddddd');
defaultProject.addTodo(testTodo);
const projectList = [defaultProject];

const cleanPage = (element) => {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
};

const renderTodo = (todo) => {
  cleanPage(modalContent);
  modalTitle.textContent = todo.title;
  Object.entries(todo).forEach(item => {
    const element = document.createElement('p');
    element.textContent = `${item[0]}: ${item[1]}`;
    modalContent.appendChild(element);
  });
};

const getTodoList = (project) => {
  const ul = document.createElement('ul');
  project.todoList.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.title;
    li.addEventListener('click', () => renderTodo(todo));
    li.setAttribute('data-micromodal-trigger', 'modal-1');
    ul.appendChild(li);
  });
  return ul;
};

const renderProjects = () => {
  cleanPage(projectDiv);
  projectList.forEach(project => {
    const p = document.createElement('p');
    p.textContent = project.title;
    projectDiv.appendChild(p);
    projectDiv.appendChild(getTodoList(project));
    MicroModal.init();
  });
};

const createProject = () => {
  const title = document.querySelector('.project-title').value;
  const description = document.querySelector('.project-decription').value;
  const newProject = new Project(title, description);
  projectList.push(newProject);
  renderProjects();
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
  project[0].todoList.push(newTodo);
  renderProjects();
};

const createTodoForm = () => {
  cleanPage(modalContent);
  modalTitle.textContent = 'Add Todo';
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
  modalContent.appendChild(form);
};

document.querySelector('.create-todo-btn').addEventListener('click', createTodoForm);

createProjectBtn.addEventListener('click', createProject);
renderProjects();