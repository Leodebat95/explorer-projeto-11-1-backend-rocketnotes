import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"

import { FiPlus, FiSearch } from "react-icons/fi"

import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"
import { Input } from "../../components/Input"
import { Note } from "../../components/Note"



export function Home() {

  const [tags, setTags] = useState([])
    // state pra trazer as tags
  const [tagsSelected , setTagsSelected] = useState([])
    // state pra quando as tags estiverem selecionadas
  const [search, setSearch] = useState("")
    // state pra armazenar o conteúdo da caixa de pesquisa
  const [notes, setNotes] = useState([])
    // state pra armazenar as notas

  const navigate = useNavigate()


  function handleTagSelected(tagName) {

    if(tagName === "all") {
      /* comando pra verificar se a "tagName" é igual ao "all" (da tag "Todos")
         se for, executa "setTagsSelected", pondo um array vazio em "tagsSelected" */

      return setTagsSelected([])
    }
    
    const alreadySelected = tagsSelected.includes(tagName)
      // comando pra verificar se o "tagName" já existe dentro do conjunto "tagsSelected"
    
    if(alreadySelected) {
      // se a tag está selecionada -> faz o "if"

      const filteredTags = tagsSelected.filter( tag => tag !== tagName)
        // comando pra retornar todas as tags, exceto as que deverão ser removidas
      setTagsSelected(filteredTags)
        // comando pra pôr somente as tags filtradas dentro do state de selecionada

    } else {
      // se a tag não está selecionada -> faz o "else"
      
      setTagsSelected( prevState => [...prevState, tagName])
        // comando pra guardar a tag (tagName) dentro do state de selecionada
    }
  }
  
  function handleDetails(id) {
    // essa function vai receber o "id" da nota como parâmetro

    navigate(`/details/${id}`)
      // "navigate" leva o usuário pra outra pág. (no caso, pra "/details")
  }
  
  useEffect(() => {

    async function fetchTags() {
      /* function criada pra buscar as tags
            é "async" pois o hook "useEffect" não aceita a keyword async;
            daí tem que criar uma function extra contendo o async, pra depois poder chamar (call) ela dentro do "useEffect" */
  
      const response = await api.get('/tags')
        // comando pra obter os dados de "/tags"
      
      setTags(response.data)
        // comando pra passar os dados de "/tags" pra function "setTags"
    }

    fetchTags()
  }, [])

  useEffect(() => {

    async function fetchNotes() {
      // function que vai buscar pelas notas

      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)

      setNotes(response.data)
    }

    fetchNotes()

  }, [tagsSelected, search])
    // [tagsSelected, search] --- as dependências desse "useEffect" são "tagsSelected" e "search"



  return(
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            $isactive={tagsSelected.length === 0}
              // comando pra saber se o item "Todos" está selecionado (e consequentemente, nenhuma tag específica está selecionada)
          />
        </li>

        {
          tags && tags.map( tag => (
            // verificar se existe tags (tags &&), e aí, pega o tags e percorre cada uma delas com o Method "map()"

            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                $isactive={tagsSelected.includes(tag.name)}
                  /* comando pra verificar dentro do "tagsSelected" se existe uma dada "tag.name";
                     se existir, significa que ela está em state de selecionada
                     includes() --- Method de array que vai retornar "true" se a tag existir lá dentro, e "false" se não */
              />
            </li>
              // por ser um item de lista, precisa de uma "key" (determinada por "tag.id")
          ))
        }
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
            /* comando pra armazenar o conteúdo da caixa de pesquisa dentro do state "search" (setSearch),
               fazendo a caixa de pesquisa funcionar pra filtrar as notas */
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map( note => (
              <Note
                key={String(note.id)}  
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
          Criar Nota
      </NewNote>
    </Container>
  )
}
  // icon={FiSearch} --- propriedade que passa o ícone pro input

  /* to="/route" --- essa prop tem que ser posta na Component pretendida, pra endereçar ela
                     trabalha em conjunto com o import "Link" (da library "react-router-dom"), que está no arq. "styles.js" */
