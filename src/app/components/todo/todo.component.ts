import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'] // Asegúrate de que esté en plural
})
export class TodoComponent implements OnInit{
  todoList = signal<TodoModel[]>([/*
    {
      id: 1,
      title: 'Minecraft',
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: 'Comprar azucar',
      completed: false,
      editing: false,
    },
    {
      id: 3,
      title: 'Comprar pollo',
      completed: false,
      editing: false,
    },*/
  ]);

  filter = signal<FilterType>('all');

  //Sera una señal hija
  todoListFilter = computed(() => {
    const todos = this.todoList();
    const filter = this.filter();
    switch (filter) {
      case 'active':
        return todos.filter((todo) =>!todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  })

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  constructor(){
    effect(() => {
      //cualquier señal
      localStorage.setItem('todos', JSON.stringify(this.todoList()));
    })
  }
  ngOnInit(): void{
    const storage = localStorage.getItem('todos');
    if (storage) {
      this.todoList.set(JSON.parse(storage));
    }
  }

  changeFilter(filterString: FilterType) {
    this.filter.set(filterString);
  }

  //Agregar tarea 
  addTodo() {
    const newTodoTitle = this.newTodo.value.trim();
    if (this.newTodo.valid && newTodoTitle !== '') {
      this.todoList.update((prev_todos) => {
        return [
          ...prev_todos,
          { id: Date.now(), title: newTodoTitle, completed: false, editing: false },
        ];
      });
      this.newTodo.reset();
    }else{
      this.newTodo.reset();
    }
  }
  //Editar la misma vista o tarea
  toggleTodo(todoid: number){
    return this.todoList.update((prev_todos) => 
      prev_todos.map((todo) => {//agarre el valor anterior de las listas
        return todo.id === todoid ? {...todo, completed: !todo.completed} : todo;

        //esto es otra forma de hacerlo
      /*if(todo.id === todoid){
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return {...todo};*/
    })); //lo voy a mapear devolver pero con una modificacion distinta
  }

  //Una funcion para eliminar una tarea
  removeTodo(todoid: number){
    this.todoList.update((prev_todos) => 
      prev_todos.filter((todo) => todo.id!== todoid)
    );
  }

  //Para actualizar o editar la tarea
  updateTodoEditingMode(todoId: number) {
    this.todoList.update((prev_todos) =>
      prev_todos.map((todo) => 
        todo.id === todoId ? { ...todo, editing: !todo.editing } : todo
      )
    );
  }

  //Funcion para guardar la actualizacion de la tarea
  saveTitleTodo(todoId: number, event: Event) {
    const title = (event.target as HTMLInputElement).value;
    return this.todoList.update((prev_todos) => prev_todos.map((todo) => {
      return todo.id === todoId? {...todo, title: title, editing: false} : todo;
    }))
  }
}
