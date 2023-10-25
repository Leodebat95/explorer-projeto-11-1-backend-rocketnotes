import styled from "styled-components"
import { Link } from "react-router-dom"


export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: 250px auto;    // é o número de colunas que terá o grid, contendo a largura de cada coluna
  grid-template-rows: 105px 128px auto 64px;    // é o número de linhas que terá o grid, contendo a altura de cada linha
  grid-template-areas:    // é a forma (áreas) que o grid será distribuído
    "brand header"
    "menu search"
    "menu content"
    "newnote content";
  
  background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
`


export const Brand = styled.div`
  grid-area: brand;
  background: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};

  > h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`


export const Menu = styled.ul`
  grid-area: menu;
  background: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  padding-top: 64px;
  text-align: center;

  > li {
    margin-bottom: 24px;
  }
`


export const Search = styled.div`
  grid-area: search;

  padding: 64px 64px 0;
`


export const Content = styled.div`
  grid-area: content;

  padding: 0 64px;
  overflow-y: auto;
`


export const NewNote = styled(Link)`
  grid-area: newnote;
  background: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`
  /* styled(Link) --- forma de se transformar uma Component em Link (da library "react-router-dom")
                      trabalha em conjunto com a prop "to='/route'" que fica no "index.jsx"
                           to="/route" --- essa prop tem que ser posta na Component pretendida, pra endereçar ela */
