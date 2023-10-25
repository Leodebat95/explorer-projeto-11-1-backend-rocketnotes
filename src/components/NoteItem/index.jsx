import { Container } from "./styles"
import { FiPlus, FiX } from "react-icons/fi"



export function NoteItem({ isNew = false, value, onClick, ...rest }) {

  return(
    <Container isNew={isNew}>
      <input
        type="text"
        value={value}
        readOnly={!isNew}
        {...rest}
      />

      <button
        type="button"
        className={isNew ? 'button-add' : 'button-delete'}
        onClick={onClick}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  )
}
  /* isNew --- prop pra saber se é um novo item
               isNew={isNew} --- forma de passar a prop "isNew" pra dentro do Component criado (Container)
     value --- valor do input
               value={value} --- forma de passar a prop "value" pra dentro do "input value"
     readOnly --- Attribute (e prop também) que indica que o item é somente de leitura; é boolean;
                  readOnly={!isNew} --- nesse exemplo, se o item já tiver sido adicionado, só vai poder ser feita leitura
     onClick={onClick} --- forma de passar a prop "onClick" pra dentro do "button onClick"
     className={'nome-da-class'} --- prop que adiciona um atributo "class" à tag/component */
