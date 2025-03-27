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
    email: z.string({ required_error: "Email é obrigatorio"}).email('Email inválido'),
    password: z.string({ required_error: "Senha é obrigatorio"}), 
})
export function LoginForm({ className, ...props}) {
  const { control, handleSubmit } = useForm({resolver: zodResolver(RegisterFormSchema)});

  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMenssage, setErrorMenssage] = useState('');

    async function HandleCreateProfession(data){
      try{
        const response = await api.post('auth/login', {
          ...data 
        })
        if(response.data.user.id){
          setIsError(false)
          setShowError(true)
          setErrorMenssage('Login feito com sucesso')
          if (typeof window !== "undefined"){
              localStorage.setItem('userToken', response.data.token)
          }
          setTimeout(() => {
            router.push('/pages/professional')
          }, 1500)
        }
      } catch(error){
          if(error){
              setIsError(true)
              setErrorMenssage(error.response.data.errors)
              setShowError(true)

              setTimeout(() => {
                  setErrorMenssage('')
                  setShowError(false)
              }, 10000)
          }
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
                    <div className={`w-full p-2 flex justify-center text-white rounded ${isError ? 'bg-softPink' : 'bg-green-600'}`}>
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
                        {/* <Button variant="outline" className="w-full">
                        Login with Google
                        </Button> */}
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
