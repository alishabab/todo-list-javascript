import './style.scss';
import Project from './projects';
import Todo from './todos';

const projectDiv = document.querySelector('#projects')
const createProjectBtn = document.querySelector('#create-project')
console.log(createProjectBtn)


const defaultProject = new Project('default', 'This is the default toDo list');
const testTodo = new Todo('test','test','ddffdsd','dddddddd')
defaultProject.addTodo(testTodo)
const projectList = [defaultProject];

const createProject = () => {
  const title = document.querySelector('.project-title').value;
  const description = document.querySelector('.project-decription').value;
  console.log(title, description)
  const newProject = new Project(title, description);
  projectList.push(newProject);
  renderProjects()
};

const createTodoForm = () => {
  
}
const createTodo = (project, title, description, dueDate, priority) => {
  const newTodo = new Todo(title, description, dueDate, priority);
  project.todoList.push(newTodo);
};

const getTodoList = (project) => {
  const ul = document.createElement('ul')
  project.todoList.forEach(todo => {
    const li = document.createElement('li')
    li.textContent = todo.title;
    ul.appendChild(li)
  })
  return ul
}
const renderProjects = () => {
  projectList.forEach(project => {
    const p = document.createElement('p')
    p.textContent = project.title;
    projectDiv.appendChild(p)
    projectDiv.appendChild(getTodoList(project))
  })
}
createProjectBtn.addEventListener('click', createProject)

renderProjects()

