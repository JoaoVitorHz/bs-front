import { useRouter } from "next/navigation"
import { CiLogout } from "react-icons/ci";

export default function Header(){
    const router = useRouter();
    return(
        <header className="w-full h-[50px] border-b border-black/20 flex justify-between items-center px-[150px] mb-[20px]">
            <div>
                <div className="flex justify-center text-2xl font-bold text-green-600 drop-shadow-lg">
                    BookSys
                </div>
            </div>
            <nav className="flex gap-5 items-center">
                <span onClick={() => router.push('/pages/books')}>Livros</span>
                <span onClick={() => router.push('/pages/study-room')}>Salas de Estudo</span>
                <span onClick={() => router.push('/pages/professional')}>Profissionais</span>
                <span onClick={() => {
                        router.push('/pages/finance')
                }}>Financeiro</span>
                <CiLogout
                    className="text-2xl cursor-pointer" 
                    onClick={() => {
                        // localStorage.clear(); 
                        router.push('/')
                    }}
                />
            </nav>
        </header>
    )
}