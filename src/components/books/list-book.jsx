"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";

export default function ListBooks(props) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const booksFromStorage = localStorage.getItem("books");
        const parsedBooks = booksFromStorage ? JSON.parse(booksFromStorage) : [];
        setBooks(parsedBooks);
    }, [props.refresh]);

    function handleDelete(id) {
        const updatedBooks = books.filter(book => book.id !== id);
        setBooks(updatedBooks);
        localStorage.setItem("books", JSON.stringify(updatedBooks));
    }

    return (
        <Table className="border rounded w-[100%] m-auto">
            <TableHeader>
                <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Gênero</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.length > 0 ? (
                    books.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell className="font-medium">{book.title}</TableCell>
                            <TableCell>{book.genre}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.location}</TableCell>
                            <TableCell>{book.quantity}</TableCell>
                            <TableCell className="flex items-center gap-5">
                                <HiOutlinePencilAlt
                                    className="text-xl cursor-pointer hover:text-softBlue transition-[300ms]"
                                    onClick={() => props.showModalUpdate?.(book)}
                                />
                                <FaRegTrashCan
                                    className="text-xl cursor-pointer hover:text-softPink transition-[300ms]"
                                    onClick={() => handleDelete(book.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500">
                            Nenhum livro cadastrado.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
