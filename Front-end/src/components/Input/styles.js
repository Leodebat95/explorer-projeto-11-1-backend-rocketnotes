import styled from "styled-components"


export const Container = styled.div`
  width: 100%;

  background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  color: ${({ theme }) => theme.COLORS.GRAY_300};

  display: flex;
  align-items: center;

  margin-bottom: 8px;
  border-radius: 10px;

  > input {
    height: 56px;
    width: 100%;

    padding: 12px;
    border: 0;

    color: ${({ theme }) => theme.COLORS.WHITE};
    background: transparent;

    &:placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_300};
    }
  }

  > svg {
    margin-left: 16px;
  }
`
  // &:placeholder --- forma de se acessar o "placeholder" do input
