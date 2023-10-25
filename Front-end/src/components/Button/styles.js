import styled from "styled-components"

export const Container = styled.button`
   width: 100%;
   background-color: ${({ theme }) => theme.COLORS.ORANGE};

   color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
   font-weight: 500;

   height: 56px;
   padding: 0 16px;
   margin-top: 16px;

   border: 0;
   border-radius: 10px;


   &:disabled {
      opacity: 0.5;
   }
      // &:pseudo-class --- forma alternativa de informar uma pseudo-class dentro do Styled Components
`
