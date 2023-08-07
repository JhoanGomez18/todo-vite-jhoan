import { Todo } from "../todos/models/todo.model";


export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}


const state = {

        todos: [
        new Todo('piedra del alma'),
        new Todo('piedra del infierno'),
        new Todo('piedra del tiempo'),
        new Todo('piedra del poder'),
        new Todo('piedra del realidad'),
    ],
    filter: Filters.All,
}


const initStore = () => {
    loadstore()
    console.log('InitStore 🥑');
}


const loadstore = () => {
     if(!localStorage.getItem('state')) return; 

     const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
     state.todos = todos;
     state.filter = filter;
}


const saveStateToLocalStorange = () => {
    localStorage.setItem('state',JSON.stringify(state));
}

const getTodos = ( filter = Filters.All ) => {
    switch( filter ) {
        case Filters.All: 
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default: 
            throw new Error(`Option ${filter} is not valid.`);         
    }

}

/**
 * 
 * @param {string} description 
 */

const addTodo = (description) => {
   if( !description)throw new Error('Description is requerid ');


   state.todos.push(new Todo(description));

   saveStateToLocalStorange()
}
/**
 * 
 * @param {string} todoId 
 */

const toggleTodo = (todoId) => {
   state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }

        saveStateToLocalStorange()
        return todo;
        
   });


}
const deleteTodo = (todoId) =>{
   state.todos = state.todos.filter(todo => todo.id !== todoId); 
   saveStateToLocalStorange()
    

}
const deleteCompleted = () =>{
    state.todos = state.todos.filter(todo => !todo.done); 
    saveStateToLocalStorange()
}

/**
 * 
 * @param {Filters} newFilter 
 */

const setFilter = (newFilter = Filters.All) =>{
    state.filter = newFilter;
    saveStateToLocalStorange()
}

const getCurrentFilter = () =>{
    return state.filter;}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadstore,
    setFilter,
    toggleTodo,
}