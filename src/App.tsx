import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { AddNewTodoForm, Todo, TodoFooter, ToggleAllTodos } from "./components";
import { useFilteredTodos, useTodosCount } from "./context/todo";

function App() {
  const todosCount = useTodosCount();
  const filteredTodos = useFilteredTodos();

  return (
    <Container>
      <Card>
        <AppTitle>todos</AppTitle>
        <TodoHeader>
          <ToggleAllTodos />
          <AddNewTodoForm />
        </TodoHeader>
        <AnimatePresence>
          <motion.div layout>
            {filteredTodos.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </motion.div>
        </AnimatePresence>
        {todosCount > 0 && <TodoFooter />}
      </Card>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 550px;
  padding: 20px;
  background-color: hsl(var(--card));
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const AppTitle = styled.div`
  font-size: 100px;
  font-weight: 600;
  text-align: center;
  color: hsl(var(--primary));
  margin-bottom: 30px;
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: center;
`;
