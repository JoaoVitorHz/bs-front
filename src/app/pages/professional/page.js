'use client'
import CreateProfession from "@/components/professional/CreateProfession";
import ListProfession from "@/components/professional/list-professional";
import UpdateProfession from "@/components/professional/UpdateProfession";
import { useState } from "react"

import { FaPlus } from "react-icons/fa6";
import { MdClear } from "react-icons/md";

export default function Page(){
    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [userSelected, setUserSelected] = useState()

    const [refresh, setRefresh] = useState(false);

    function updateListProfession() {
        setRefresh(prev => !prev);
    }

    return(
        <div className="w-full ">
            <div className="container m-auto flex flex-col gap-5 ">

                <div className="w-full flex gap-5 flex-col justify-between ">
                    <span className="text-2xl font-bold text-gray-500">Profissionais</span>
                    <span>Crie e gerencia todos os profissionais da biblioteca!</span>
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
                    <ListProfession 
                        refresh={refresh}  
                        showModalUpdate={(user) => {
                            setShowUpdate(true)
                            setUserSelected(user)
                        } }
                    />
                </div>

                {showCreate && 
                    <CreateProfession 
                        closeModal={() => setShowCreate(false)}
                        updateListProfession={updateListProfession}
                    />
                }

                {showUpdate && 
                    <UpdateProfession 
                        closeModal={() => setShowUpdate(false)}
                        updateListProfession={updateListProfession}
                        professionData={userSelected}
                    />
                }

            </div>
        </div>
    )
}