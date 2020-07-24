import MicroModal from 'micromodal';
import './style.scss';
import Project from './projects';
import Todo from './todos';

const projectDiv = document.querySelector('#projects');
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

const closeModal = () => document.querySelector('.modal__btn').click();

const renderTodo = (todo, project) => {
  cleanPage(modalContent);
  modalTitle.textContent = todo.title;
  Object.entries(todo).forEach(item => {
    const element = document.createElement('p');
    element.textContent = `${item[0]}: ${item[1]}`;
    modalContent.appendChild(element);
  });
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Remove Todo';
  modalContent.appendChild(delBtn);
  delBtn.addEventListener('click', () => deleteTodo(project, todo));
};

const getTodoList = (project) => {
  const ul = document.createElement('ul');
  project.todoList.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.title;
    li.classList.add('todo-list-items');
    li.addEventListener('click', () => renderTodo(todo, project));
    li.setAttribute('data-micromodal-trigger', 'modal-1');
    ul.appendChild(li);
  });
  return ul;
};

const renderProjects = () => {
  cleanPage(projectDiv);
  projectList.forEach(project => {
    const h2 = document.createElement('h2');
    h2.textContent = project.title;
    projectDiv.appendChild(h2);
    const ul = getTodoList(project)
    projectDiv.appendChild(ul);
    MicroModal.init();
  });
};

const createProject = (event) => {
  event.preventDefault();
  const title = document.querySelector('.project-title').value;
  const description = document.querySelector('.project-description').value;
  const newProject = new Project(title, description);
  projectList.push(newProject);
  renderProjects();
  closeModal();
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
  closeModal();
};

const deleteTodo = (project, todo) => {
  project.removeTodo(todo)
  renderProjects()
  closeModal();
}

const createTodoForm = () => {
  cleanPage(modalContent);
  modalTitle.textContent = 'Add Todo';
  const form = document.createElement('form');
  const inputs = ['title', 'description', 'dueDate', 'priority'];
  const select = document.createElement('select')
  select.classList.add('todo-project')
  inputs.forEach(input => {
    const element = document.createElement('input');
    element.textContent = input;
    element.classList.add(`todo-${input}`);
    form.appendChild(element);
  });
  projectList.forEach(project => {
    const option = document.createElement('option')
    option.textContent = project.title
    select.appendChild(option)
  })
  const button = document.createElement('button');
  button.textContent = 'Create Todo';
  form.appendChild(select)
  form.appendChild(button);
  button.addEventListener('click', createTodo);
  modalContent.appendChild(form);
};

const createProjectForm = () => {
  cleanPage(modalContent);
  modalTitle.textContent = 'Add Project';
  const form = document.createElement('form');
  const inputs = ['title', 'description'];
  inputs.forEach(input => {
    const element = document.createElement('input');
    element.textContent = input;
    element.classList.add(`project-${input}`);
    form.appendChild(element);
  });
  const button = document.createElement('button');
  button.textContent = 'Create Project';
  form.appendChild(button);
  button.addEventListener('click', createProject);
  modalContent.appendChild(form);
};

document.querySelector('.create-todo-btn').addEventListener('click', createTodoForm);

document.querySelector('.create-project-btn').addEventListener('click', createProjectForm);

renderProjects();