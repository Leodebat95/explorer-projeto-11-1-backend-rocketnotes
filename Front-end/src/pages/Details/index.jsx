import { Container, Links, Content } from './styles'

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
  // useParams --- hook que busca os parâmetros que existem na rota

import { api } from '../../services/api'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'



export function Details() {

  const [data, setData] = useState(null)
    // state que armazena as infos. da nota
  
  const params = useParams()

  const navigate = useNavigate()

  function handleBack() {

    navigate(-1)
      /* "navigate" leva o usuário pra outra pág. (no caso, volta pra home)
         (-1) --- pôr o "-1" no "navigate" indica que se deve voltar pra pág anterior (do histórico de navegação);
                      isso é diferente de pôr ("/"), pois esse indica que se deve prosseguir pra pág. "/";
                      já o "-1" indica pra voltar pra pág. anterior (é diferente de prosseguir) */
  }

  async function handleRemove() {

    const confirm = window.confirm("Deseja realmente remover a nota?")
      // window.confirm() --- Method do "window" (browser) que faz uma pergunta de confirmação antes de gerar a alteração
    
    if(confirm) {

      await api.delete(`/notes/${params.id}`)
        // comando pra excluir a nota do id "params.id"
      
      navigate(-1)
    }
  }
  
  useEffect(() => {
    // comando pra buscar as infos. da nota

    async function fetchNote() {
      // function pra buscar as infos. da nota

      const response = await api.get(`/notes/${params.id}`)
        // "params.id" é o id da nota
      
      setData(response.data)
    }

    fetchNote()
  }, [])



  return(
    <Container>
      <Header />

      {
        data &&
        <main>
          <Content>
            <ButtonText
              title="Excluir nota"
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map( link => (

                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map( tag => (

                    <Tag
                      key={String(tag.id)}
                      title={tag.name}
                    />
                  ))
                }
              </Section>
            }

            <Button
              title="Voltar"
              onClick={handleBack}
            />
          </Content>
        </main>
          // "main" está entre {} pra indicar que ele só deve ser exibido se de fato existir conteúdo (o "data &&" que indica essa condição)
      }
    </Container>
  )
}

/* property="value" --- sintaxe das Tag's Properties, se for texto
   property={123...} --- sintaxe das Tag's Properties, se for número */


/* Buttons de exemplo, que não foram utilizados:
      <Button title="Login" loading />
      <Button title="Cadastrar" /> */


// children --- vai ser considerado "children" tudo que estiver dentro do elemento pai (ex: "ul/li" são childrens de "Section")


/* outra forma de criar a Componente:
    --- import { Fragment } from 'react'
        return(
          <Fragment>
            <h1>Hello World!</h1>
          </Fragment>
        )
*/
