import Display from './dom';

import './style.scss';

import Todo from './todos';

const testTodo = new Todo('test', 'test', 'ddffdsd', 'dddddddd');
Display.defaultProject.todoList.push(testTodo);

document.querySelector('.create-todo-btn').addEventListener('click', () => Display.createTodoForm(false, {}, {}));
document.querySelector('.create-project-btn').addEventListener('click', Display.createProjectForm);

Display.renderProjects();