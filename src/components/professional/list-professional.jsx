"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";

export default function ListProfession(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersFromStorage = localStorage.getItem("users");
        const parsedUsers = usersFromStorage ? JSON.parse(usersFromStorage) : [];
        setUsers(parsedUsers);
    }, [props.refresh]);

    function handleDelete(id) {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    return (
        <Table className="border rounded w-[100%] m-auto">
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length > 0 ? (
                    users.map((profession) => (
                        <TableRow key={profession.id}>
                            <TableCell className="font-medium">{profession.name}</TableCell>
                            <TableCell>{profession.email}</TableCell>
                            <TableCell>{profession.phone}</TableCell>
                            <TableCell className="flex items-center gap-5">
                                <HiOutlinePencilAlt  
                                    className="text-xl cursor-pointer hover:text-softBlue transition-[300ms]" 
                                    onClick={() => props.showModalUpdate?.(profession)}
                                />
                                <FaRegTrashCan 
                                    className="text-xl cursor-pointer hover:text-softPink transition-[300ms]" 
                                    onClick={() => handleDelete(profession.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500">
                            Nenhum profissional cadastrado.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
