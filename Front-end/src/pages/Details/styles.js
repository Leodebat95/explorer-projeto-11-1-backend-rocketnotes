import styled from "styled-components"
  // primeiro, se importa "styled" da library "styled-components"


export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;   // é o número de linhas que terá o grid, contendo a altura de cada linha
  grid-template-areas:    // nome que será dado a cada linha/campo
    "header"
    "content";
  
  > main {
    grid-area: content;   // o "grid-area" será o value "content" (declarado em "grid-template-areas")
    overflow-y: scroll;   // quando o conteúdo não couber mais na vertical, deve aparecer uma barra pra scroll
    padding: 64px 0;
  }
`
// significa que: dentro da const "Container", se está armazenando o elem. HTML "div"


export const Links = styled.ul`
  list-style: none;

  > li {
    margin-top: 12px;

    a {
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`


export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;
    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    text-align: justify;
    margin-top: 16px;    
  }
`
