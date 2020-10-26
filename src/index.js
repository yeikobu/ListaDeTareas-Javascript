import './styles.css';

import { TodoList} from './classes' //Importamos las clases desde el index de la carpeta classes
import { crearTodoHtml} from './js/componentes';


export const todoList = new TodoList(); //recordar que con export podemos llamar desde otra clase

todoList.todos.forEach(todo => crearTodoHtml(todo));

