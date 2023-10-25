import styled from "styled-components"


export const Container = styled.div`
  display: flex;
  align-items: center;

  background: ${({ theme, isNew }) => isNew ? "transparent" : theme.COLORS.BACKGROUND_900};
  color: ${({ theme }) => theme.COLORS.GRAY_300};

  border: ${({ theme, isNew }) => isNew ? `1px dashed ${theme.COLORS.GRAY_300}` : "none"};

  margin-bottom: 8px;
  border-radius: 10px;
  padding-right: 16px;

  > button {
    background: none;
    border: none;
  }

  .button-delete {
    color: ${({ theme }) => theme.COLORS.RED};
  }

  .button-add {
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > input {
    height: 56px;
    width: 100%;

    padding: 12px;

    color: ${({ theme }) => theme.COLORS.WHITE};
    background: transparent;
    border: none;
  }

  &:placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`
  /* {theme, isNew} --- forma de se acessar uma prop (isNew) que está dentro do Component "Container"
                        ou seja, o "background: transparent" só será aplicado se existir a prop "isNew"
                        já se ela não existir, será aplicado o "background: theme.COLORS.BACKGROUND_900" */
