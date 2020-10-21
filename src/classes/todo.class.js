
export class Todo { //Se pone export, debido a que esta clase se utilizará fuera de este archivo

    static fromJson({id, tarea, completado,creado}) {

        const tempTodo = new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }
    
    constructor(tarea) {

        this.tarea = tarea;

        this.id = new Date().getTime(); //Con esta instancia crearemos un id único basado en la fecha y hora exacta en la que se crea una tarea
        this.completado = false;
        this.creado = new Date();

    }
}