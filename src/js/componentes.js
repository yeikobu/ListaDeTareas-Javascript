import { Todo, TodoList } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo'); 
const btnBorrarCompletados = document.querySelector('.clear-completed'); 
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro'); //anchor se refiere al tag de <a> en html
const contadorPendientes = document.querySelector('.todo-count');  //**PENDIENTE */

//Referencias en el HTML
export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado)? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked' : ''}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    </li>`;

    const div = document.createElement('div'); //este div encerrará todo el html de htmlTodo
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); 

    return div.firstElementChild;
}


//Eventos
txtInput.addEventListener('keyup', (event) => { //Keyup hace referencia a que se dispara el evento cuando la persona suelta la tecla
    
    if(event.keyCode === 13 && txtInput.value.length > 0) {  //El keycode lo podemos obtener desde el navegador. En este caso 13 hace referencia a la tecla de "Enter"
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        
        crearTodoHtml(nuevoTodo);
        txtInput.value='';
    }

});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; //Lo que contendrá esta variable es si obtendremos un click en un input, label, etc
    const todoElemento = event.target.parentElement.parentElement; //Ponemos doble parentElement para obtener el li padre 
    const todoId = todoElemento.getAttribute('data-id'); //Con getAttribute podemos obtener el elemento de la clase. Con esto obtenemos el id de la tarea creado

    if (nombreElemento.includes('input')) { //Este if es para verificar el click en el visto/check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); //.classList hace referencia a todas las clases  .toggle permite cambiar clases (Si existe la quita y sino la pone).
    } else if(nombreElemento.includes('button')) { //Si la variable nombreElemento incluye botón, lo eliminamos (Referencia al botón X)
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    

});

btnBorrarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length - 1; i >= 0; i--) { 

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')) { //Constains comprueba si el elemento contiene una clase
            divTodoList.removeChild(elemento);
        }

    }
});

ulFiltros.addEventListener('click', (event)=> {

    const filtro = event.target.text;
    if(!filtro) { //Diferente de filtro = undefined
        return;
    }
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    
    for(const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch(filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});









