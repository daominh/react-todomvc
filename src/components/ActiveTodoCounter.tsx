import { useTodosCount } from "../context/todo";

const ActiveTodoCounter = () => {
  const activeTodosCount = useTodosCount(true);
  return (
    <span>
      {activeTodosCount} item{activeTodosCount > 1 ? "s" : ""} left!
    </span>
  );
};

export { ActiveTodoCounter };
