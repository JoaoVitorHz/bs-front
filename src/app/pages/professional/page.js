'use client'
import ListProfession from "@/components/professional/list-professional";
import { useState } from "react"

import { FaPlus } from "react-icons/fa6";
import { MdClear } from "react-icons/md";

export default function Page(){
    const [showCreate, setShowCreate] = useState(false)

    return(
        <div className="w-full ">
            <div className="container m-auto flex flex-col gap-5 ">

                <div className="w-full flex gap-5 flex-col justify-between ">
                    <span className="text-2xl font-bold text-gray-500">Profissionais</span>
                    <span>Crie e gerencia todos os profissionais do seu salão!</span>
                    <div>
                        <button 
                            className="flex justify-center items-center gap-2 min-w-[150px] h-[40px] px-3 border bg-white rounded-md text-black  font-medium text-sm"
                            onClick={() => setShowCreate(true)}
                            >
                            <FaPlus />  
                            Novo Profissional
                        </button>
                    </div>
                </div>

                <div>
                    <ListProfession />
                </div>

            </div>
        </div>
    )
}