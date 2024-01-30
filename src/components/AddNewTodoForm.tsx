import styled from "@emotion/styled";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { Input } from "./ui";
import { TodoActionType, useTodosDispatch } from "../context/todo";
import { CreateTodoSchema, TCreateTodo } from "../models";
import { ErrorMessage } from "./ErrorMessage";

const AddNewTodoForm = () => {
  const dispatch = useTodosDispatch();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(CreateTodoSchema),
  });

  const onSubmit = (data: TCreateTodo) => {
    reset();
    dispatch({
      type: TodoActionType.ADD,
      payload: {
        id: nanoid(),
        content: data.content,
        completed: false,
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <StyledInput {...field} placeholder="What needs to be done?" />
        )}
      />
      {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

export { AddNewTodoForm };
