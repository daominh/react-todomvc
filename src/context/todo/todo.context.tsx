import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { TTodo, TodoSchema } from "../../models";
import { TodoAction, TodoActionType } from "./todo.action";

function storeTodos(todos: TTodo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function todosReducer(todos: TTodo[], action: TodoAction): TTodo[] {
  switch (action.type) {
    case TodoActionType.INIT: {
      return action.payload;
    }
    case "add": {
      const newTodos = [...todos, action.payload];

      storeTodos(newTodos);
      return newTodos;
    }
    case TodoActionType.UPDATE: {
      const newTodos = todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });

      storeTodos(newTodos);
      return newTodos;
    }
    case TodoActionType.DELETE: {
      const newTodos = todos.filter((todo) => todo.id !== action.payload);

      storeTodos(newTodos);
      return newTodos;
    }
    case TodoActionType.CLEAR: {
      const newTodos = todos.filter((todo) => !todo.completed);

      storeTodos(newTodos);
      return newTodos;
    }
    case TodoActionType.TOGGLE_ALL: {
      const newTodos = todos.map((todo) => {
        return { ...todo, completed: action.payload };
      });

      storeTodos(newTodos);
      return newTodos;
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}

export const TodosContext = createContext<TTodo[]>([]);
export const TodosDispatchContext = createContext<Dispatch<TodoAction>>(
  () => {}
);

type TTodoFilter = "" | "active" | "completed";
type TTodoFilterContext = {
  filter: TTodoFilter;
  setFilter: Dispatch<SetStateAction<TTodoFilter>>;
};
export const TodoFilterContext = createContext<TTodoFilterContext>({
  filter: "",
  setFilter: () => {},
});

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [filter, setFilter] = useState<TTodoFilter>("");

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      try {
        const savedTodos = JSON.parse(data);
        if (Array.isArray(savedTodos) && savedTodos.length > 0) {
          const safeTodos = savedTodos.filter(
            (savedTodo): savedTodo is TTodo => {
              return TodoSchema.safeParse(savedTodo).success;
            }
          );
          localStorage.setItem("todos", JSON.stringify(safeTodos));
          dispatch({ type: TodoActionType.INIT, payload: safeTodos });
          return;
        }
        localStorage.removeItem("todos");
      } catch {
        localStorage.removeItem("todos");
        return;
      }
    }
  }, []);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        <TodoFilterContext.Provider value={{ filter, setFilter }}>
          {children}
        </TodoFilterContext.Provider>
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}
