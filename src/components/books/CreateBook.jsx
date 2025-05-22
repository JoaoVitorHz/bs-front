'use client'

import { IoClose } from "react-icons/io5"
import Inputs from "./Inputs"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react"

const RegisterBookSchema = z.object({
  title: z.string({ required_error: "Título é obrigatório" }).min(2, 'Mínimo de 2 caracteres requerido'),
  genre: z.string({ required_error: "Gênero é obrigatório" }).min(2, 'Mínimo de 2 caracteres requerido'),
  author: z.string({ required_error: "Autor é obrigatório" }).min(2, 'Mínimo de 2 caracteres requerido'),
  location: z.string({ required_error: "Localização é obrigatória" }).min(1, 'Informe a localização'),
  quantity: z.string({ required_error: "Quantidade é obrigatória" }).regex(/^\d+$/, 'Somente números são permitidos')
})

export default function CreateBook(props) {
  const [messageStatus, setMessageStatus] = useState('')
  const [isError, setIsError] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(RegisterBookSchema)
  })

  async function handleCreateBook(data) {
    try {
      if (typeof window !== "undefined") {
        const booksFromStorage = localStorage.getItem("books")
        const books = booksFromStorage ? JSON.parse(booksFromStorage) : []

        // Verifica se já existe um livro com mesmo título e autor
        const alreadyExists = books.some((book) => 
          book.title.toLowerCase() === data.title.toLowerCase() &&
          book.author.toLowerCase() === data.author.toLowerCase()
        )

        if (alreadyExists) {
          setIsError(true)
          setMessageStatus("Livro já cadastrado.")
          setShowFeedback(true)
          setTimeout(() => {
            setMessageStatus("")
            setShowFeedback(false)
          }, 4000)
          return
        }

        const newBook = {
          id: Date.now(),
          ...data,
        }

        const updatedBooks = [...books, newBook]
        localStorage.setItem("books", JSON.stringify(updatedBooks))

        setIsError(false)
        setMessageStatus("Livro cadastrado com sucesso!")
        setShowFeedback(true)

        setTimeout(() => {
          props.updateListBooks?.()
          props.closeModal?.()
        }, 1500)
      }
    } catch (error) {
      setIsError(true)
      setMessageStatus("Erro ao cadastrar livro.")
      setShowFeedback(true)
      setTimeout(() => {
        setMessageStatus("")
        setShowFeedback(false)
      }, 4000)
    }
  }

  return (
    <div className="w-screen h-screen bg-black/50 absolute top-0 left-0 flex justify-center items-center">
      <form
        className="bg-white rounded p-5 flex flex-col gap-3 w-[500px]"
        onSubmit={handleSubmit(handleCreateBook)}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Cadastrar novo livro</h1>
          <IoClose className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]" onClick={props.closeModal} />
        </div>

        {showFeedback && (
          <div className={`w-full flex justify-center p-3 rounded text-white ${isError ? 'bg-red-500' : 'bg-green-600'}`}>
            <span>{messageStatus}</span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Inputs 
            control={control}
            name="title"
            inputTitle="Título do livro"
          />
          <Inputs 
            control={control}
            name="genre"
            inputTitle="Gênero"
          />
          <Inputs 
            control={control}
            name="author"
            inputTitle="Autor"
          />
          <Inputs 
            control={control}
            name="location"
            inputTitle="Localização"
          />
          <Inputs 
            control={control}
            name="quantity"
            inputTitle="Quantidade"
          />
        </div>

        <div className="flex gap-2 m-auto">
          <button 
            className="w-[150px] h-[40px] bg-red-500 hover:bg-red-500/70 rounded-md text-white uppercase text-sm" 
            onClick={props.closeModal}>
              Cancelar
          </button>
          <input 
            className="w-[150px] h-[40px] bg-green-400 hover:bg-green-400/70 rounded-md text-white uppercase text-sm cursor-pointer"
            type="submit"
            value="Adicionar"
          />
        </div>
      </form>
    </div>
  )
}
