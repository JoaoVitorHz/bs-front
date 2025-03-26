import Input from "@/components/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-[400px] h-[500px] border border-gray-200 rounded  p-5 flex flex-col gap-5">

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Login</h1>
          <span className="text-sm text-gray-400 font-sans">Digite seu email abaixo para entrar na sua conta.</span>
        </div>

        <div className="flex flex-col gap-1 text-base">
          <span>Email</span>
          <Input /> 
        </div>

        <div className="flex flex-col gap-1">
          <span>Senha</span>
          <Input /> 
        </div>

        <div>
          <button>Entrar</button>
        </div>

      </div>
    </div>
  );
}
