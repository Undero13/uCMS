/* eslint-disable */
import { createStore } from 'vuex';

type Todo = {
    id: number,
    complete: boolean,
    title: string,
}

type State = {
    todoList: Todo[]
}

const state: State = {
    todoList: [],
};

const mutations = {
    createTodo(state: State, todo: Todo) {
        state.todoList.push({
            id: todo.id,
            complete: todo.complete,
            title: todo.title,
        });
    },
    editTodo(state: State, todo: Todo) {
        const index = state.todoList.findIndex(
            (item) => item.id === todo.id,
        );
        state.todoList[index] = todo;
    },
    removeTodo(state: State, id: number) {
        state.todoList = state.todoList.filter(
            (item) => item.id !== id,
        );
    },
};

const store = createStore({ state, mutations });
export default store;
