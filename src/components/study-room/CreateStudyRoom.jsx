'use client'

import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Inputs from "./Inputs";

const StudyRoomSchema = z.object({
    NomeSala: z.string().min(1, "Nome da sala é obrigatório"),
    ra_aluno: z.string().min(1, "RA do aluno é obrigatório"),
    nome_aluno: z.string().min(1, "Nome do aluno é obrigatório"),
    reservado: z.enum(["true", "false"]),
});

export default function CreateStudyRoom(props) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(StudyRoomSchema),
    });

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    function handleCreate(data) {
        const salas = localStorage.getItem("salas_estudo");
        const parsedSalas = salas ? JSON.parse(salas) : [];

        const newSala = {
            id: crypto.randomUUID(),
            ...data,
            reservado: data.reservado === "true"
        };

        localStorage.setItem("salas_estudo", JSON.stringify([...parsedSalas, newSala]));

        setMessage("Sala cadastrada com sucesso!");
        setShowMessage(true);

        reset();

        setTimeout(() => {
            props.updateList?.();
            props.closeModal?.();
        }, 1500);
    }

    return (
        <div className="w-screen h-screen bg-black/50 absolute top-0 left-0 flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit(handleCreate)}
                className="bg-white rounded p-5 flex flex-col gap-3 w-[500px]"
            >
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Cadastrar sala</span>
                    <IoClose className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]" onClick={props.closeModal} />
                </div>

                {showMessage && (
                    <div className="w-full p-3 text-center text-white rounded bg-green-600">
                        {message}
                    </div>
                )}

                <Inputs control={control} name="NomeSala" inputTitle="Nome da Sala" />
                <Inputs control={control} name="ra_aluno" inputTitle="RA do Aluno" />
                <Inputs control={control} name="nome_aluno" inputTitle="Nome do Aluno" />
                <Inputs control={control} name="reservado" inputTitle="Reservado (true ou false)" />

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
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}
