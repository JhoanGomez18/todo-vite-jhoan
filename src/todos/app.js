import html from './app.html?raw/';
import todoStore, {Filters} from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';


const ElementIDs = {
    clearCompletedButton: '.clear-completed',
    todoList: '.todo-list', 
    newTodoInput : '#new-todo-input',
    todoFilter: '.filtro',
    pendingCountLabel: '#pending-count',

}


/**
 * 
 * @param {String} elementId 
 */


export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.todoList, todos);
        updatePendingCount()
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.pendingCountLabel);
    }


    //Cuando la funcion App()se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html
        document.querySelector(elementId).append(app);
        displayTodos()
    })();

    //Referencias HTML

    const newDescriptionInput = document.querySelector(ElementIDs.newTodoInput);
    const todoListUL = document.querySelector(ElementIDs.todoList);
    const clearCompletedButton = document.querySelector(ElementIDs.clearCompletedButton);
    const filterLIs = document.querySelectorAll(ElementIDs.todoFilter);
   

    //Listeners

    newDescriptionInput.addEventListener('keyup', (event ) => {
        if(event.keyCode  !==  13) return;
        if(event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        displayTodos()
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });
    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement =  event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyElement) return; 

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos()
    });
    clearCompletedButton.addEventListener ('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filterLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filterLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');
       
           switch(element.target.text) {
                case 'Todos': 
                    todoStore.setFilter( Filters.All);
                break;
                case 'Pendientes': 
                    todoStore.setFilter( Filters.Pending);
                break; 
                case 'Completados': 
                    todoStore.setFilter( Filters.Completed);
                break;    
           } 

           displayTodos();

        });
   
        
    });
    
} 