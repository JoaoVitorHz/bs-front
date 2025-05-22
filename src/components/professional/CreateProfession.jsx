'use client'

import { IoClose } from "react-icons/io5";

import Inputs from "./Inputs";
import Select from "./Select";

import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react";
import { api } from "@/service/api";

const RegisterFormSchema = z.object({
    name: z.string({ required_error: "Nome é obrigatorio"}).min(2, 'Mínimo de 2 caracteres requerido').regex(/^\D+$/,'O nome não pode conter números' ),
    email: z.string({ required_error: "Email é obrigatorio"}).email('Email inválido'),
    phone: z.string({ required_error: "Telefone é obrigatorio"}).min(11, 'Mínimo de 11 caracteres requerido'), 
    password: z.string({ required_error: "Senha é obrigatorio"}).min(3, 'Mínimo de 3 caracteres requerido'), 
})

export default function CreateProfession(props){
    const [mensageStatusSingUp, setMensageStatusSingUp] = useState('');
    const [isSingUpError, setIsSingUpError] = useState(false)
    const [showCardError, setShowCardError] = useState(false)

    const { control, handleSubmit, register, formState: { errors } } = useForm({resolver: zodResolver(RegisterFormSchema)});

   async function HandleCreateProfession(data) {
  try {
    if (typeof window !== "undefined") {
      const usersFromStorage = localStorage.getItem("users");
      const users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

      // Verifica se o email já está cadastrado
      const alreadyExists = users.some((user) => user.email === data.email);
      if (alreadyExists) {
        setIsSingUpError(true);
        setMensageStatusSingUp("Email já cadastrado.");
        setShowCardError(true);
        setTimeout(() => {
          setMensageStatusSingUp("");
          setShowCardError(false);
        }, 4000);
        return;
      }

      const newUser = {
        id: Date.now(), // ID único baseado na data
        ...data,
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setIsSingUpError(false);
      setMensageStatusSingUp("Profissional criado com sucesso!");
      setShowCardError(true);

      setTimeout(() => {
        props.updateListProfession?.(); // Atualiza lista, se existir
        props.closeModal?.();          // Fecha modal, se existir
      }, 1500);
    }
  } catch (error) {
    setIsSingUpError(true);
    setMensageStatusSingUp("Erro ao criar profissional.");
    setShowCardError(true);
    setTimeout(() => {
      setMensageStatusSingUp("");
      setShowCardError(false);
    }, 4000);
  }
}
    return(
        <div className="w-screen h-screen bg-black/50 absolute top-0 left-0 flex justify-center items-center">
            <form 
                className="bg-white rounded p-5 flex flex-col gap-3 w-[500px]"
                onSubmit={handleSubmit(HandleCreateProfession)}
            >
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-semibold">Criar um novo profissional</h1>
                    </div>
                    <IoClose className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]" onClick={props.closeModal}/>
                </div>
                {showCardError &&
                    <div className={`w-full flex justify-center p-3 rounded text-white ${isSingUpError ? 'bg-red-500 ': 'bg-green-600'}`}>
                        <span>{mensageStatusSingUp}</span>
                    </div>
                }
                <div className="flex flex-col gap-3">
                        <Inputs 
                            control={control}
                            name="name"
                            inputTitle="Nome completo"
                        />
                        <Inputs 
                            control={control}
                            name="email"
                            inputTitle="Email"
                        />
                        <Inputs 
                            control={control}
                            mask="(99) 99999-9999"
                            name="phone"
                            inputTitle="Telefone"
                        />
                        <Inputs 
                            control={control}
                            name="password"
                            inputTitle="Senha"
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