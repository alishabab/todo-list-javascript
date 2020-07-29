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

  let firstRender = true;

  const closeModal = () => document.querySelector('.modal__btn').click();

  const cleanPage = (element) => {
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
  };

  const setNotice = (text) => {
    const p = document.querySelector('.modal__notice');
    p.textContent = text;
  };

  const checkInputs = (arr) => {
    let inputsPass = true;
    arr.forEach(input => {
      if (input.length < 1) { inputsPass = false; }
    });
    if (inputsPass === false) {
      setNotice('All fields Required');
    }
    return inputsPass;
  };

  const removeTodo = (project, todo) => {
    Project.filterTodo(project, todo);
    // eslint-disable-next-line no-use-before-define
    renderProjects();
    closeModal();
  };

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
    // eslint-disable-next-line no-use-before-define
    editBtn.addEventListener('click', () => createTodoForm(true, todo, project));
  };

  const toggleDone = (todo) => {
    todo.complete = !todo.complete;
    // eslint-disable-next-line no-use-before-define
    renderProjects();
  };

  const getTodoList = (project) => {
    const ul = document.createElement('ul');
    project.todoList.forEach(todo => {
      const li = document.createElement('li');
      const completeBtn = document.createElement('button');
      completeBtn.textContent = `${todo.complete ? 'Done' : 'Not Done'}`;
      li.innerHTML = `<strong>${todo.title}</strong> - Due: ${todo.dueDate}`;
      ul.appendChild(completeBtn);
      completeBtn.addEventListener('click', () => toggleDone(todo));
      li.classList.add('todo-list-items');
      li.addEventListener('click', () => renderTodo(todo, project));
      li.setAttribute('data-micromodal-trigger', 'modal-1');
      ul.appendChild(li);
    });
    return ul;
  };

  const localStorageController = () => {
    if (store('projects') && firstRender) {
      projectList = store('projects');
      firstRender = false;
    } else {
      store('projects', projectList);
    }
  };

  const renderProjects = () => {
    cleanPage(projectDiv);
    localStorageController();

    projectList.forEach(project => {
      const h2 = document.createElement('h2');
      const hr = document.createElement('hr');
      h2.textContent = project.title;
      projectDiv.appendChild(h2);
      const ul = getTodoList(project);
      projectDiv.appendChild(ul);
      projectDiv.appendChild(hr);
      MicroModal.init();
    });
  };

  const createProject = (event) => {
    event.preventDefault();
    const title = document.querySelector('.project-title').value;
    const description = document.querySelector('.project-description').value;
    if (!checkInputs([title, description])) { return; }
    const newProject = new Project(title, description);
    projectList.push(newProject);
    renderProjects();
    closeModal();
  };

  const createProjectForm = () => {
    setNotice('');
    cleanPage(modalContent);
    modalTitle.textContent = 'Add Project';
    const form = document.createElement('form');
    const inputs = ['title', 'description'];
    inputs.forEach(input => {
      const br = document.createElement('br');
      const label = document.createElement('label');
      label.textContent = input;
      form.appendChild(label);
      form.appendChild(br);
      const inputArea = document.createElement('input');
      inputArea.textContent = input;
      inputArea.classList.add(`project-${input}`);
      form.appendChild(inputArea);
      form.appendChild(br);
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
    const priority = document.querySelector('input[name="priority"]:checked').textContent;
    if (!checkInputs([title, description, dueDate, priority])) { return; }
    const newTodo = new Todo(title, description, dueDate, priority);
    project[0].todoList.push(newTodo);
    renderProjects();
    closeModal();
  };
  const createTodoForm = (edited, todo, project) => {
    setNotice('');
    cleanPage(modalContent);
    const form = document.createElement('form');
    const inputs = [['Title', 'text', 'title'], ['Description', 'text', 'description'], ['DueDate', 'date', 'dueDate'], ['Low', 'radio', 'priority'], ['Medium', 'radio', 'priority'], ['High', 'radio', 'priority']];
    const select = document.createElement('select');
    select.classList.add('todo-project');
    inputs.forEach(input => {
      const br = document.createElement('br');
      const label = document.createElement('label');
      // eslint-disable-next-line prefer-destructuring
      label.textContent = input[0];
      form.appendChild(label);
      form.appendChild(br);
      const element = document.createElement('input');
      [element.textContent, element.type, element.name] = input;
      if (edited) {
        element.value = todo[input[2]];
      }
      element.classList.add(`todo-${input[2]}`);
      form.appendChild(element);
      form.appendChild(br);
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

  return {
    renderProjects, createProjectForm, createTodoForm,
  };
})();

export default Display;