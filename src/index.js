import Display from './dom';

import './modal.scss';
import './style.scss';

document.querySelector('.create-todo-btn').addEventListener('click', () => Display.createTodoForm(false, {}, {}));
document.querySelector('.create-project-btn').addEventListener('click', Display.createProjectForm);

Display.renderProjects();