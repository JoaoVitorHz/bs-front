'use client'
import CreateBook from "@/components/books/CreateBook";
import ListBooks from "@/components/books/list-book";
import UpdateBook from "@/components/books/UpdateBook";
import { useState } from "react"

import { FaPlus } from "react-icons/fa6";
import { MdClear } from "react-icons/md";

export default function Page(){
    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [bookSelected, setBookSelected] = useState()

    const [refresh, setRefresh] = useState(false);

    function updateListBook() {
        setRefresh(prev => !prev);
    }

    return(
        <div className="w-full ">
            <div className="container m-auto flex flex-col gap-5 ">

                <div className="w-full flex gap-5 flex-col justify-between ">
                    <span className="text-2xl font-bold text-gray-500">Livros</span>
                    <span>Crie e gerencia todos os Livros da biblioteca!</span>
                    <div>
                        <button 
                            className="flex justify-center items-center gap-2 min-w-[150px] h-[40px] px-3 border bg-white rounded-md text-black  font-medium text-sm"
                            onClick={() => setShowCreate(true)}
                            >
                            <FaPlus />  
                            Novo Livro
                        </button>
                    </div>
                </div>

                <div>
                    <ListBooks 
                        refresh={refresh}  
                        showModalUpdate={(user) => {
                            setShowUpdate(true)
                            setBookSelected(user)
                        } }
                    />
                </div>

                {showCreate && 
                    <CreateBook 
                        closeModal={() => setShowCreate(false)}
                        updateListBooks={updateListBook}
                    />
                }

                {showUpdate && 
                    <UpdateBook 
                        closeModal={() => setShowUpdate(false)}
                        updateListBooks={updateListBook}
                        bookData={bookSelected}
                    />
                }

            </div>
        </div>
    )
}