import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarDesdeLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarEnLocalStorage();
    }

    eliminarTodo(id) {

        this.todos = this.todos.filter(todo => todo.id != id); //Utilización del método filter => https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/filter
        this.guardarEnLocalStorage();

    }

    marcarCompletado(id) {

        for(const todo of this.todos) {
            
            if (todo.id == id) {  // comparación con "==" para no tener que pasar el string a número
                todo.completado = !todo.completado; //Si es true se vuelve falso y viceversa
                this.guardarEnLocalStorage();
                break; //Para poder salir del ciclo
            } 
        }

    }

    eliminarCompletados() {
        
        this.todos = this.todos.filter(todo => !todo.completado); //Obtenemos todos los que NO están completados
        this.guardarEnLocalStorage();

    }

    guardarEnLocalStorage() { //Recordar que el local storage solo guarda STRINGS

        localStorage.setItem('todo', JSON.stringify(this.todos)); //Con JSON.stringify transformamos a "objeto string JSON"

    }

    cargarDesdeLocalStorage() {

        // if(localStorage.getItem('todo')) {
        //     this.todos = JSON.parse(localStorage.getItem('todo')); //Este JSON devuelve el objeto a su forma original
        //     console.log('cargarlocal: ', this.todos);
        // } else {
        //     this.todos = [];
        // }

        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : []; //Todo el código de la condición de arriba, está simplificada con esta operación ternaria
        this.todos = this.todos.map(obj => Todo.fromJson(obj)); //Todo es una propiedad estática y no cambia, por eso empieza con mayúscula.
    }
}