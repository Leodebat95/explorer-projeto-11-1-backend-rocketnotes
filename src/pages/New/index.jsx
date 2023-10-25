import { useState } from "react"
import { useNavigate } from "react-router-dom"
  // useNavigate --- hook que retorna uma function que permite navegar pra algum lugar

import { api } from "../../services/api"

import { Container, Form } from "./styles"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { Textarea } from "../../components/Textarea"
import { Section } from "../../components/Section"
import { NoteItem } from "../../components/NoteItem"



export function New() {

  const [title, setTitle] = useState("")
    // state pra armazenar o title que será adicionado (state inicial é uma string vazia "")
  const [description, setDescription] = useState("")
    // state pra armazenar a description que será adicionada (state inicial é uma string vazia "")
  
  const [links, setLinks] = useState([])
    // state pra armazenar todos os links que serão adicionados (state inicial é um array vazio "[]")
  const [newLink, setNewLink] = useState("")
    // state pra armazenar o link adicionado no momento (state inicial é uma string vazia "")
  
  const [tags, setTags] = useState([])
    // state pra armazenar todos as tags que serão adicionados (state inicial é um array vazio "[]")
  const [newTag, setNewTag] = useState("")
    // state pra armazenar a tag adicionada no momento (state inicial é uma string vazia "")
  
  const navigate = useNavigate()


  function handleAddLink() {

    setLinks( prevState => [...prevState, newLink])
      /* usa o "spread operator" (...prevState) pra pôr dentro do state-array todas as infos. que já existiam antes
         + põe também o novo state, em "newLink" */
    setNewLink("")
      // põe de novo uma string vazia, pra resetar o campo de "newLink", pra que possa ser posto um próximo novo link
  }

  function handleRemoveLink(deleted) {

    setLinks( prevState => prevState.filter( linkItem => linkItem !== deleted))
      /* comando pra verificar onde o link (linkItem) é diferente do que se está sendo deletado (deleted)
                linkItem !== deleted --- condição pra que o Method "filter" filtre/remova o link deletado */
      // deleted --- var. que recebe o link que se pretende deletar
  }

  function handleAddTag() {

    setTags( prevState => [...prevState, newTag])
      // lógica é a mesma de "handleAddLink"
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    
    setTags( prevState => prevState.filter( tagItem => tagItem !== deleted))
      // lógica é a mesma de "handleRemoveLink"
  }

  async function handleNewNote() {

    if(!title) {
      // se não existir "title", dar o "alert" do return

      return alert("Digite o título da nota.")
    }
    
    if(newLink) {
      // mesma ideia do "if" de "newTag"

      return alert("Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.")
    }
    
    if(newTag) {
      // se dentro da "newTag" existe algum conteúdo escrito (mas que ainda não foi enviado pelo botão "+"), dar o "alert" do return

      return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.")
    }
    
    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })
      // comando pra enviar para "/notes" (no back-end) o obj. {...}; envio é feito através do método "post"
    
    alert('Nota criada com sucesso!')
    navigate(-1)
      // após dar o "alert", levar o usuário pro endereço da "home" (é o "-1")
  }

  function handleBack() {

    navigate(-1)
  }



  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText
              title="voltar"
              onClick={handleBack}
            />
          </header>

          <Input
            placeholder="Título"
            onChange={ e => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Observações"
            onChange={ e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map( (link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
                  /* links.map() --- comando pra percorrer cada "link" que existe dentro do array "links";
                                     devolve ainda um "index" (a posição do item na lista) */
                  // key --- prop necessária sempre que um Comp. está renderizando uma lista (no caso, os links de "map")
                  // x => (…) --- return implícito; isso é igual a --- x => { return (…) }
              ))
            }
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={ e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map( (tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }
              
              <NoteItem
                isNew
                placeholder="Nova tag"
                value={newTag}
                onChange={ e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}
