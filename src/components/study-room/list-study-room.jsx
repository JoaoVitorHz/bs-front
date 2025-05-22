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

export default function ListStudyRooms(props) {
    const [studyRooms, setStudyRooms] = useState([]);

    useEffect(() => {
        const roomsFromStorage = localStorage.getItem("salas_estudo");
        const parsedRooms = roomsFromStorage ? JSON.parse(roomsFromStorage) : [];
        setStudyRooms(parsedRooms);
    }, [props.refresh]);

    function handleDelete(id) {
        const updatedRooms = studyRooms.filter(room => room.id !== id);
        setStudyRooms(updatedRooms);
        localStorage.setItem("salas_estudo", JSON.stringify(updatedRooms));
    }

    return (
        <Table className="border rounded w-[100%] m-auto">
            <TableHeader>
                <TableRow>
                    <TableHead>Nome da Sala</TableHead>
                    <TableHead>RA do Aluno</TableHead>
                    <TableHead>Nome do Aluno</TableHead>
                    <TableHead>Reservado</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {studyRooms.length > 0 ? (
                    studyRooms.map((room) => (
                        <TableRow key={room.id}>
                            <TableCell className="font-medium">{room.NomeSala}</TableCell>
                            <TableCell>{room.ra_aluno}</TableCell>
                            <TableCell>{room.nome_aluno}</TableCell>
                            <TableCell>{room.reservado ? "Sim" : "Não"}</TableCell>
                            <TableCell className="flex items-center gap-5">
                                <HiOutlinePencilAlt
                                    className="text-xl cursor-pointer hover:text-softBlue transition-[300ms]"
                                    onClick={() => props.showModalUpdate?.(room)}
                                />
                                <FaRegTrashCan
                                    className="text-xl cursor-pointer hover:text-softPink transition-[300ms]"
                                    onClick={() => handleDelete(room.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                            Nenhuma sala de estudo cadastrada.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
