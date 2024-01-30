import { ComponentPropsWithoutRef, forwardRef } from "react";
import styled from "@emotion/styled";

const BaseButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>((props, ref) => {
  return <button {...props} ref={ref} />;
});

const Button = styled(BaseButton)`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  color: hsl(var(--background));

  padding: 4px 6px;
  border: 0px solid hsl(var(--border));
  border-radius: 4px;
  background-color: hsl(var(--foreground));

  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;

  &:hover {
    background-color: hsl(var(--foreground) / 0.9);
  }
`;

Button.displayName = "Button";

export { Button };
