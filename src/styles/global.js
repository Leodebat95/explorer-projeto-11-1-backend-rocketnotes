// estilização global --- possui características em comum entre todas as págs.

import { createGlobalStyle } from "styled-components"
  // estilização global importada de Styled Components

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.WHITE};

    -webkit-font-smoothing: antialiased;
      // Property que deixa as fontes mais "suaves"
  }
    /* forma de se acessar o conteúdo das tokens/variáveis (no caso, de "theme"); feito com uma Arrow f.

       { theme } --- "theme" foi desestruturado pra se acessar suas propriedades;
                      na verdade, "theme" existe dentro de "props" (properties) e, desestruturá-lo é só um atalho;
       a forma sem atalho seria:
       (props) => props.theme.COLORS.BACKGROUND_800 */
  
  body, input, button, textarea {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover, a:hover {
    filter: brightness(0.9);
  }
`
