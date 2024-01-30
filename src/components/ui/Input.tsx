import styled from "@emotion/styled";

const Input = styled.input`
  display: flex;
  height: 40px;
  width: 100%;
  padding: 4px 12px;
  background-color: hsl(var(--background));
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: hsl(var(--input));

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus-visible {
    outline: 2px solid hsl(var(--primary));
    outline-offset: 2px;
  }
`;

export { Input };
