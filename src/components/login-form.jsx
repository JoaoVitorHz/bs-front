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
            const formBody = new URLSearchParams();
            formBody.append('login', '48551071000109');
            formBody.append('senha', '@rtium123');
            formBody.append('tipo_login', 'credenciado');

            const response = await fetch('https://abastece10.com.br/api/login-novo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody.toString(),
            });

            const data = await response.json();

            console.log('Resposta da API:', data); // Debug da resposta

            console.log('teste')
            if (data.nome) {
                console.log('teste2')
                Alert.alert('Login', 'Login efetuado com sucesso!');
                // Aqui você pode salvar o token no AsyncStorage ou navegar para outra tela
                console.log('ok')
                await AsyncStorage.setItem('token', data.token);
                navigation.navigate('Saldo');
            } else {
                Alert.alert('Erro', data.message || 'Erro ao fazer login.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    }
    return (
        (<div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
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
