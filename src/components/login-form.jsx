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


import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import Inputs from "./input"
import { api } from "@/service/api"

const RegisterFormSchema = z.object({
    email: z.string({ required_error: "Email é obrigatorio" }).email('Email inválido'),
    password: z.string({ required_error: "Senha é obrigatorio" }),
})
export function LoginForm({ className, ...props }) {
    const { control, handleSubmit } = useForm({ resolver: zodResolver(RegisterFormSchema) });

    const router = useRouter()
    const [isError, setIsError] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMenssage, setErrorMenssage] = useState('');

    async function HandleCreateProfession(data) {
        try {
            if (typeof window !== "undefined") {
            const usersFromStorage = localStorage.getItem("users");
            const users = usersFromStorage ? JSON.parse(usersFromStorage) : [];

            // Verifica se existe algum usuário com o email e senha fornecidos
            const foundUser = users.find(
                (user) =>
                user.email === data.email && user.password === data.password
            );

            if (foundUser) {
                // Simula o token e salva os dados
                const fakeToken = `token-${foundUser.id}`;
                localStorage.setItem("userToken", fakeToken);
                localStorage.setItem("userData", JSON.stringify(foundUser));

                setIsError(false);
                setErrorMenssage("Login feito com sucesso!");
                setShowError(true);

                setTimeout(() => {
                router.push("/pages/professional");
                }, 1500);
            } else {
                setIsError(true);
                setErrorMenssage("Email ou senha inválidos.");
                setShowError(true);

                setTimeout(() => {
                setErrorMenssage("");
                setShowError(false);
                }, 4000);
            }
            }
        } catch (error) {
            setIsError(true);
            setErrorMenssage("Erro ao tentar logar.");
            setShowError(true);

            setTimeout(() => {
            setErrorMenssage("");
            setShowError(false);
            }, 4000);
        }
        }
    return (
        (<div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                 <div className="flex justify-center text-4xl font-bold text-green-600 drop-shadow-lg">
                    BookSys
                </div>

                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Digite seu email e senha para entrar em sua conta!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(HandleCreateProfession)}
                    >
                        {showError &&
                            <div className={`w-full p-2 flex justify-center text-white rounded ${isError ? 'bg-red-700' : 'bg-green-600'}`}>
                                {errorMenssage}
                            </div>
                        }

                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                {/* <Label htmlFor="email">Email</Label> */}
                                <Inputs
                                    control={control}
                                    name="email"
                                    inputTitle="Email"
                                />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    {/* <Label htmlFor="password">Senha</Label> */}
                                </div>
                                <Inputs
                                    control={control}
                                    name="password"
                                    inputTitle="Senha"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                           
                            </div>

                            <div className="mt-4 text-center text-sm">
                                Não tem uma conta?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Criar Conta
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>)
    );
}
