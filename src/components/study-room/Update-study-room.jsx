'use client';

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import Inputs from "./Inputs";

const StudyRoomSchema = z.object({
    NomeSala: z.string().min(1, "Nome da sala é obrigatório"),
    ra_aluno: z.string().min(1, "RA do aluno é obrigatório"),
    nome_aluno: z.string().min(1, "Nome do aluno é obrigatório"),
    reservado: z.boolean(),
});

export default function UpdateStudyRoom(props) {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(StudyRoomSchema),
    });

    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (props.studyRoomData) {
            setValue("NomeSala", props.studyRoomData.NomeSala);
            setValue("ra_aluno", props.studyRoomData.ra_aluno);
            setValue("nome_aluno", props.studyRoomData.nome_aluno);
            setValue("reservado", props.studyRoomData.reservado);
        }
    }, [props.studyRoomData, setValue]);

    function handleUpdate(data) {
        const roomsFromStorage = localStorage.getItem("salas_estudo");
        const parsedRooms = roomsFromStorage ? JSON.parse(roomsFromStorage) : [];

        const updatedRooms = parsedRooms.map(room => {
            if (room.id === props.studyRoomData.id) {
                return {
                    ...room,
                    NomeSala: data.NomeSala,
                    ra_aluno: data.ra_aluno,
                    nome_aluno: data.nome_aluno,
                    reservado: data.reservado,
                };
            }
            return room;
        });

        localStorage.setItem("salas_estudo", JSON.stringify(updatedRooms));

        setIsError(false);
        setMessage("Sala de estudo atualizada com sucesso!");
        setShowMessage(true);

        setTimeout(() => {
            props.updateListStudyRooms?.();
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
                    <span className="text-xl font-semibold">Editar Sala de Estudo</span>
                    <IoClose className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]" onClick={props.closeModal} />
                </div>

                {showMessage && (
                    <div className={`w-full p-3 text-center text-white rounded ${isError ? 'bg-softPink' : 'bg-green-600'}`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <Inputs control={control} name="NomeSala" inputTitle="Nome da Sala" />
                    <Inputs control={control} name="ra_aluno" inputTitle="RA do Aluno" />
                    <Inputs control={control} name="nome_aluno" inputTitle="Nome do Aluno" />

                    <div className="flex items-center gap-2">
                        <label htmlFor="reservado" className="text-sm font-medium text-gray-700">Reservado:</label>
                        <Controller
                            name="reservado"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    id="reservado"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                    </div>
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
