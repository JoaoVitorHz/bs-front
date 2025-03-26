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

export function Register({
  className,
  ...props
}) {
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Digite os dados abaixo para criar uma conta!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">

              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" required />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="name">Telefone</Label>
                <Input id="phoneNumber" type="text" required />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input id="password" type="password" required />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
              
            </div>

            <div className="mt-4 text-center text-sm">
             Não tem uma conta?{" "}
              <a href="#" className="underline underline-offset-4">
                Criar Conta
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
