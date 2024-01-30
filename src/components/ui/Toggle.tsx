import { ComponentPropsWithoutRef, forwardRef } from "react";
import styled from "@emotion/styled";
import { Button } from "./Button";

type ToggleProps = {
  active?: boolean;
};

const BaseToggle = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button"> & ToggleProps
>((props, ref) => {
  return <Button {...props} ref={ref} />;
});

const Toggle = styled(BaseToggle, {
  shouldForwardProp: (prop) => prop !== "active",
})`
  background-color: transparent;
  color: hsl(var(--foreground));

  border: ${(props) =>
    props.active
      ? "2px solid hsl(var(--primary))"
      : "0px solid hsl(var(--primary))"};

  &:hover {
    background-color: hsl(var(--accent));
  }
`;

Toggle.displayName = "Toggle";

export { Toggle };
