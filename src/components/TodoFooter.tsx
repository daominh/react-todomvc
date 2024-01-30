import styled from "@emotion/styled";
import {
  TodoActionType,
  useTodoFilter,
  useTodosDispatch,
} from "../context/todo";
import { ActiveTodoCounter } from "./ActiveTodoCounter";
import { Button, Toggle } from "./ui";

const TodoFooter = () => {
  const dispatch = useTodosDispatch();
  const { filter, setFilter } = useTodoFilter();

  return (
    <Container>
      <ActiveTodoCounter />
      <div>
        <Toggle active={filter === ""} onClick={() => setFilter("")}>
          All
        </Toggle>
        <Toggle
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Toggle>
        <Toggle
          active={filter === "active"}
          onClick={() => setFilter("active")}
        >
          Active
        </Toggle>
      </div>
      <ClearButton
        onClick={() => {
          dispatch({ type: TodoActionType.CLEAR });
        }}
      >
        Clear Completed
      </ClearButton>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearButton = styled(Button)`
  background-color: transparent;
  color: hsl(var(--foreground));

  padding: 6px 8px;

  border: 1px solid hsl(var(--border));

  &:hover {
    background-color: hsl(var(--accent));
  }
`;

export { TodoFooter };
