import { z } from "zod";

const MIN_TODO_CONTENT_LENGTH = 1;
const MAX_TODO_CONTENT_LENGTH = 200;

export const TodoSchema = z.object({
  id: z.string(),
  content: z
    .string()
    .min(
      MIN_TODO_CONTENT_LENGTH,
      `Todo content must be at least ${MIN_TODO_CONTENT_LENGTH} character long`
    )
    .max(
      MAX_TODO_CONTENT_LENGTH,
      `Todo content must be at most ${MAX_TODO_CONTENT_LENGTH} characters long`
    ),
  completed: z.boolean(),
});

export const CreateTodoSchema = TodoSchema.pick({ content: true });

export type TTodo = z.infer<typeof TodoSchema>;
export type TCreateTodo = z.infer<typeof CreateTodoSchema>;
