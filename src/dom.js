import MicroModal from 'micromodal';
import store from 'store2';
import Project from './projects';
import Todo from './todos';

const Display = (() => {
  const projectDiv = document.querySelector('#projects');
  const modalContent = document.querySelector('.modal__content');
  const modalTitle = document.querySelector('.modal__title');
  const defaultProject = new Project('default', 'This is the default toDo list');
  let projectList = [defaultProject];

  let firstRender = false;

  const closeModal = () => document.querySelector('.modal__btn').click();

  const cleanPage = (element) => {
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
  };

  const editTodo = (project, todo) => {
    // eslint-disable-next-line no-use-before-define
    createTodoForm(true, todo, project);
  };

  const removeTodo = (project, todo) => {
    project.todoList = project.todoList.filter((value) => value !== todo);
    // eslint-disable-next-line no-use-before-define
    renderProjects();
    closeModal();
  };

  // const removeProject = (project) => {
  //   if (project === defaultProject) { return; }
  //   projectList = projectList.filter((value) => value !== project);
  //   // eslint-disable-next-line no-use-before-define
  //   renderProjects();
  // };
  const renderTodo = (todo, project) => {
    cleanPage(modalContent);
    modalTitle.textContent = todo.title;
    Object.entries(todo).forEach(item => {
      const element = document.createElement('p');
      element.textContent = `${item[0]}: ${item[1]}`;
      modalContent.appendChild(element);
    });
    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    delBtn.textContent = 'Remove Todo';
    modalContent.appendChild(delBtn);
    delBtn.addEventListener('click', () => removeTodo(project, todo));
    editBtn.textContent = 'Edit Todo';
    modalContent.appendChild(editBtn);
    editBtn.addEventListener('click', () => editTodo(project, todo));
  };

  const getTodoList = (project) => {
    const ul = document.createElement('ul');
    project.todoList.forEach(todo => {
      const li = document.createElement('li');
      const completeBtn = document.createElement('button')
      completeBtn.textContent = `${todo.complete ? 'Mark as Uncomplete' : 'Mark as Complete'}`
      li.textContent = `${todo.title} - Due: ${todo.dueDate}`;
      li.appendChild(completeBtn)
      li.classList.add('todo-list-items');
      li.addEventListener('click', () => renderTodo(todo, project));
      li.setAttribute('data-micromodal-trigger', 'modal-1');
      ul.appendChild(li);
    });
    return ul;
  };
  const renderProjects = () => {
    cleanPage(projectDiv);

    if (window.localStorage.getItem('projects') && firstRender === false) {
      projectList = store('projects');
      firstRender = true;
    } else {
      store('projects', projectList);
    }

    projectList.forEach(project => {
      const h2 = document.createElement('h2');
      h2.textContent = project.title;
      projectDiv.appendChild(h2);
      const ul = getTodoList(project);
      projectDiv.appendChild(ul);
      // const delBtn = document.createElement('button');
      // delBtn.textContent = 'Remove Project';
      // projectDiv.appendChild(delBtn);
      // delBtn.addEventListener('click', () => removeProject(project));
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
  const createTodoForm = (edited, todo, project) => {
    cleanPage(modalContent);
    const form = document.createElement('form');
    const inputs = [['title', 'text'], ['description', 'text'], ['dueDate', 'date'], ['priority', 'number']];
    const select = document.createElement('select');
    select.classList.add('todo-project');
    inputs.forEach(input => {
      const element = document.createElement('input');
      [element.textContent, element.type] = input;
      if (edited) {
        element.value = todo[input[0]];
      }
      element.classList.add(`todo-${input[0]}`);
      form.appendChild(element);
    });
    projectList.forEach(project => {
      const option = document.createElement('option');
      option.textContent = project.title;
      select.appendChild(option);
    });
    form.appendChild(select);
    const button = document.createElement('button');
    if (!edited) {
      modalTitle.textContent = 'Add Todo';
      button.textContent = 'Create Todo';
    } else {
      modalTitle.textContent = 'Edit Todo';
      button.textContent = 'Finished Edit';
      button.addEventListener('click', () => removeTodo(project, todo));
    }
    button.addEventListener('click', createTodo);
    form.appendChild(button);
    modalContent.appendChild(form);
  };

  return { renderProjects, createProjectForm, createTodoForm };
})();

export default Display;