import { ComponentPropsWithoutRef, forwardRef } from "react";
import styled from "@emotion/styled";

const Checkbox = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>((props, ref) => {
  return <StyledCheckbox type="checkbox" {...props} ref={ref} />;
});

Checkbox.displayName = "Checkbox";

const StyledCheckbox = styled.input`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  border: 1px solid hsl(var(--primary));
  accent-color: hsl(var(--primary));
`;

export { Checkbox };
