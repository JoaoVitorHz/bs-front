import { useRouter } from "next/navigation"
import { CiLogout } from "react-icons/ci";

export default function Header(){
    const router = useRouter();
    return(
        <header className="w-full h-[50px] border-b border-black/20 flex justify-between items-center px-[150px] mb-[20px]">
            <div>
                <h1 >Style & Elegance</h1>
            </div>
            <nav className="flex gap-5 items-center">
                <a href="">Agendamentos</a>
                <a href="">Profissionais</a>
                <a href="">Clientes</a>
                <a href="">Financeiro</a>
                <CiLogout
                    className="text-2xl cursor-pointer" 
                    onClick={() => {
                        localStorage.clear(); 
                        router.push('/')
                    }}
                />
            </nav>
        </header>
    )
}