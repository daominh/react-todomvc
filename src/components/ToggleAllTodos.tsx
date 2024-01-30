import styled from "@emotion/styled";
import {
  TodoActionType,
  useFilteredTodos,
  useTodosDispatch,
} from "../context/todo";
import { Checkbox } from "./ui";

const ToggleAllTodos = () => {
  const dispatch = useTodosDispatch();

  const filteredTodos = useFilteredTodos();

  const isCompletedAll =
    filteredTodos.length > 0 && filteredTodos.every((todo) => todo.completed);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: TodoActionType.TOGGLE_ALL,
      payload: e.target.checked,
    });
  };

  return (
    <Container>
      {filteredTodos.length > 0 && (
        <Checkbox checked={isCompletedAll} onChange={handleOnChange} />
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 32px;
  width: 32px;
`;

export { ToggleAllTodos };
