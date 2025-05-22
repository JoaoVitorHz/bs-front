'use client'

import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import Inputs from "./Inputs";

const RegisterFormSchema = z.object({
    name: z.string({ required_error: "Nome é obrigatório" })
        .min(2, 'Mínimo de 2 caracteres requerido')
        .regex(/^\D+$/, 'O nome não pode conter números'),
    email: z.string({ required_error: "Email é obrigatório" }).email('Email inválido'),
    phone: z.string({ required_error: "Telefone é obrigatório" }).min(11, 'Mínimo de 11 caracteres requerido'),
    password: z.string().optional(), // não será alterada se estiver vazia
})

export default function UpdateProfession(props) {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterFormSchema),
    });

    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (props.professionData) {
            setValue("name", props.professionData.name);
            setValue("email", props.professionData.email);
            setValue("phone", props.professionData.phone);
            setValue("password", props.professionData.password || '');
        }
    }, [props.professionData, setValue]);

    function handleUpdate(data) {
        const usersFromStorage = localStorage.getItem("users");
        const parsedUsers = usersFromStorage ? JSON.parse(usersFromStorage) : [];

        const updatedUsers = parsedUsers.map(user => {
            if (user.id === props.professionData.id) {
                return {
                    ...user,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password || user.password, // só altera se nova senha for informada
                }
            }
            return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setIsError(false);
        setMessage("Profissional atualizado com sucesso!");
        setShowMessage(true);

        setTimeout(() => {
            props.updateListProfession?.(); // atualiza a tabela
            props.closeModal?.(); // fecha o modal
        }, 1500);
    }

    return (
        <div className="w-screen h-screen bg-black/50 absolute top-0 left-0 flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit(handleUpdate)}
                className="bg-white rounded p-5 flex flex-col gap-3 w-[500px]"
            >
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Editar profissional</span>
                    <IoClose className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]" onClick={props.closeModal} />
                </div>

                {showMessage && (
                    <div className={`w-full p-3 text-center text-white rounded ${isError ? 'bg-softPink' : 'bg-green-600'}`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <Inputs control={control} name="name" inputTitle="Nome completo" />
                    <Inputs control={control} name="email" inputTitle="Email" />
                    <Inputs control={control} mask="(99) 99999-9999" name="phone" inputTitle="Telefone" />
                    <Inputs control={control} name="password" inputTitle="Senha (opcional)" />
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
