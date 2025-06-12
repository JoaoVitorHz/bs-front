'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Inputs from "./input"

import { z, boolean } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react";

import { api } from "@/service/api"
import { useRouter } from "next/navigation";

const RegisterFormSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatorio"}).min(2, 'Mínimo de 2 caracteres requerido'),
  email: z.string({ required_error: "Email é obrigatorio"}).email('Email inválido'),
  phone: z.string({ required_error: "Telefone é obrigatorio"}).min(11, 'Mínimo de 11 caracteres requerido'), 
  password: z.string({ required_error: "Senha é obrigatorio"}).min(3, 'Mínimo de 3 caracteres requerido'), 
})

export function Register({ className, ...props}) {
  const router = useRouter();
    
  const [mensageStatusSingUp, setMensageStatusSingUp] = useState('');
  const [isSingUpError, setIsSingUpError] = useState(false)
  const [showCardError, setShowCardError] = useState(false)
  
  const { control, handleSubmit, register, formState: { errors } } = useForm({resolver: zodResolver(RegisterFormSchema)});

    async function HandleCreateProfession(data) {
  try {
    // Criando um novo usuário com ID único
    const newUser = {
      id: Date.now(), // ID único com timestamp
        ...data
    }

    // Recuperar o array de usuários existente (ou iniciar um novo)
    let existingUsers = [];
    if (typeof window !== "undefined") {
      const usersFromStorage = localStorage.getItem("users");
      if (usersFromStorage) {
        existingUsers = JSON.parse(usersFromStorage);
      }

      // Adicionar o novo usuário ao array
      existingUsers.push(newUser);

      // Salvar novamente no localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Simular login (salvar o "usuário logado" e "token")
      const fakeToken = `token-${newUser.id}`;
      localStorage.setItem("userToken", fakeToken);
      localStorage.setItem("userData", JSON.stringify(newUser));
    }

    setIsSingUpError(false);
    setMensageStatusSingUp("Conta criada com sucesso!");
    setShowCardError(true);

    setTimeout(() => {
      router.push("/pages/professional");
    }, 1500);

  } catch (error) {
    setIsSingUpError(true);
    setMensageStatusSingUp("Erro ao criar conta");
    setShowCardError(true);

    setTimeout(() => {
      setMensageStatusSingUp('');
      setShowCardError(false);
    }, 5000);
  }
}


  useEffect(() => {
  }, []) 

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
             <div className="flex justify-center text-4xl font-bold text-green-600 drop-shadow-lg">
                    BookSys
                </div>
            <CardTitle>
                Criar conta
            </CardTitle>
            <CardDescription>
                Digite os dados abaixo para criar uma conta!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form
                onSubmit={handleSubmit(HandleCreateProfession)}
            >
                {showCardError &&
                    <div className={`w-full flex justify-center p-3 rounded text-white ${isSingUpError ? 'bg-softPink ': 'bg-green-600'}`}>
                        <span>{mensageStatusSingUp}</span>
                    </div>
                }

                <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Inputs 
                            control={control}
                            name="name"
                            inputTitle="Nome" 
                        />
                    </div>

                    <div className="grid gap-3">
                        <Inputs 
                            control={control}
                            name="email"
                            inputTitle="Email" 
                        />
                    </div>

                    <div className="grid gap-3">
                        <Inputs 
                            control={control}
                            name="phone"
                            inputTitle="Telefone" 
                        />
                    </div>

                    <div className="grid gap-3">
                        <Inputs 
                            control={control}
                            name="password"
                            inputTitle="Senha" 
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                        {/* <Button variant="outline" className="w-full">
                        Login with Google
                        </Button> */}
                    </div>
                    

                    <div className="mt-4 text-center text-sm">
                       Já tem uma conta?{" "}
                        <a href="/" className="underline underline-offset-4">
                            Faça Login
                        </a>
                    </div>
                </div>
            </form>
        </CardContent>
      </Card>
    </div>)
  );
}
