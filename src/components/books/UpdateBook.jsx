'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import Inputs from "./Inputs";

const BookFormSchema = z.object({
    title: z.string({ required_error: "Título é obrigatório" }).min(1, 'Título não pode estar vazio'),
    genre: z.string({ required_error: "Gênero é obrigatório" }).min(1, 'Gênero não pode estar vazio'),
    author: z.string({ required_error: "Autor é obrigatório" }).min(1, 'Autor não pode estar vazio'),
    location: z.string({ required_error: "Localização é obrigatória" }).min(1, 'Localização não pode estar vazia'),
    quantity: z.coerce.number({ invalid_type_error: "Quantidade deve ser um número" })
        .min(0, "Quantidade deve ser no mínimo 0"),
});

export default function UpdateBook(props) {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(BookFormSchema),
    });

    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (props.bookData) {
            setValue("title", props.bookData.title);
            setValue("genre", props.bookData.genre);
            setValue("author", props.bookData.author);
            setValue("location", props.bookData.location);
            setValue("quantity", props.bookData.quantity);
        }
    }, [props.bookData, setValue]);

    function handleUpdate(data) {
        const booksFromStorage = localStorage.getItem("books");
        const parsedBooks = booksFromStorage ? JSON.parse(booksFromStorage) : [];

        const updatedBooks = parsedBooks.map(book => {
            if (book.id === props.bookData.id) {
                return {
                    ...book,
                    title: data.title,
                    genre: data.genre,
                    author: data.author,
                    location: data.location,
                    quantity: data.quantity,
                };
            }
            return book;
        });

        localStorage.setItem("books", JSON.stringify(updatedBooks));

        setIsError(false);
        setMessage("Livro atualizado com sucesso!");
        setShowMessage(true);

        setTimeout(() => {
            props.updateListBooks?.();
            props.closeModal?.();
        }, 1500);
    }

    return (
        <div className="w-screen h-screen bg-black/50 absolute top-0 left-0 flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit(handleUpdate)}
                className="bg-white rounded p-5 flex flex-col gap-3 w-[500px]"
            >
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Editar livro</span>
                    <IoClose className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]" onClick={props.closeModal} />
                </div>

                {showMessage && (
                    <div className={`w-full p-3 text-center text-white rounded ${isError ? 'bg-softPink' : 'bg-green-600'}`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <Inputs control={control} name="title" inputTitle="Título" />
                    <Inputs control={control} name="genre" inputTitle="Gênero" />
                    <Inputs control={control} name="author" inputTitle="Autor" />
                    <Inputs control={control} name="location" inputTitle="Localização" />
                    <Inputs control={control} name="quantity" inputTitle="Quantidade" type="number" />
                </div>

                <div className="flex gap-2 mt-4 justify-center">
                    <button
                        type="button"
                        className="w-[150px] h-[40px] bg-red-400 hover:bg-red-400/70 rounded-md text-white uppercase text-sm"
                        onClick={props.closeModal}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="w-[150px] h-[40px] bg-green-500 hover:bg-green-500/70 rounded-md text-white uppercase text-sm"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
