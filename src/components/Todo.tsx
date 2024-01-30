import { useState } from "react";
import styled from "@emotion/styled";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoActionType, useTodosDispatch } from "../context/todo";
import { CreateTodoSchema, TCreateTodo, TTodo } from "../models";
import { Checkbox, Button, Input } from "./ui";
import { ErrorMessage } from "./ErrorMessage";

const Todo = (props: TTodo) => {
  const dispatch = useTodosDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: props.content,
    },
    resolver: zodResolver(CreateTodoSchema),
  });

  const handleEnableEditing = () => {
    setIsEditing(true);
    const timeout = setTimeout(() => {
      setFocus("content");
      clearTimeout(timeout);
    }, 0);
  };

  const handleToggleComplete = () => {
    dispatch({
      type: TodoActionType.UPDATE,
      payload: { ...props, completed: !props.completed },
    });
  };

  const handleDelete = () => {
    dispatch({ type: TodoActionType.DELETE, payload: props.id });
  };

  const onSubmit = (todo: TCreateTodo) => {
    dispatch({
      type: TodoActionType.UPDATE,
      payload: { ...props, content: todo.content },
    });

    setIsEditing(false);
  };

  return (
    <Container
      layoutId={props.id}
      initial={{ translateY: 12, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: -12, opacity: 0 }}
    >
      {!isEditing && (
        <StyledCheckbox
          checked={props.completed}
          onChange={handleToggleComplete}
        />
      )}

      {!isEditing && (
        <Content
          completed={props.completed}
          onDoubleClick={handleEnableEditing}
        >
          {props.content}
        </Content>
      )}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                onBlur={() => {
                  field.onBlur();
                  setIsEditing(false);
                }}
              />
            )}
          />
          {errors.content && (
            <ErrorMessage>{errors.content.message}</ErrorMessage>
          )}
        </Form>
      )}

      {!isEditing && (
        <DeleteButton onClick={handleDelete}>
          <X />
        </DeleteButton>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 20px 0;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 32px;
`;

const StyledCheckbox = styled(Checkbox)`
  flex-shrink: 0;
`;

type ContentProps = {
  completed: boolean;
};
const Content = styled.span<ContentProps>`
  margin: 0 12px;
  color: ${(props) =>
    props.completed ? "hsl(var(--muted-foreground))" : "inherit"};
`;

const DeleteButton = styled(Button)`
  height: 26px;
  width: 26px;
`;

export { Todo };
