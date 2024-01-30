import { useContext } from "react";
import {
  TodoFilterContext,
  TodosContext,
  TodosDispatchContext,
} from "./todo.context";
import { TTodo } from "../../models";

function useTodos() {
  return useContext(TodosContext);
}

export function useTodosCount(activeOnly = false) {
  const todos = useTodos();
  if (activeOnly) {
    return todos.filter((todo) => !todo.completed).length;
  }
  return todos.length;
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContext);
}

export function useTodoFilter() {
  return useContext(TodoFilterContext);
}

export function useFilteredTodos() {
  const todos = useTodos();
  const { filter } = useTodoFilter();
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

export enum TodoActionType {
  INIT = "init",
  ADD = "add",
  UPDATE = "update",
  DELETE = "delete",
  CLEAR = "clear",
  COMPLETE = "complete",
  TOGGLE_ALL = "toggle_all",
}

export type TodoAction =
  | { type: TodoActionType.INIT; payload: TTodo[] }
  | { type: TodoActionType.ADD; payload: TTodo }
  | { type: TodoActionType.UPDATE; payload: TTodo }
  | { type: TodoActionType.DELETE; payload: TTodo["id"] }
  | { type: TodoActionType.CLEAR }
  | { type: TodoActionType.TOGGLE_ALL; payload: boolean };
