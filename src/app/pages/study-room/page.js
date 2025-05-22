'use client'
import CreateBook from "@/components/books/CreateBook";
import ListBooks from "@/components/books/list-book";
import UpdateBook from "@/components/books/UpdateBook";
import CreateStudyRoom from "@/components/study-room/CreateStudyRoom";
import ListStudyRooms from "@/components/study-room/list-study-room";
import UpdateStudyRoom from "@/components/study-room/Update-study-room";
import { useState } from "react"

import { FaPlus } from "react-icons/fa6";
import { MdClear } from "react-icons/md";

export default function Page(){
    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [studyRoom, setStudyRoom] = useState()

    const [refresh, setRefresh] = useState(false);

    function updateList() {
        setRefresh(prev => !prev);
    }

    return(
        <div className="w-full ">
            <div className="container m-auto flex flex-col gap-5 ">

                <div className="w-full flex gap-5 flex-col justify-between ">
                    <span className="text-2xl font-bold text-gray-500">Salas de Estudo</span>
                    <span>Crie e gerencia as salas de estudo!</span>
                    <div>
                        <button 
                            className="flex justify-center items-center gap-2 min-w-[150px] h-[40px] px-3 border bg-white rounded-md text-black  font-medium text-sm"
                            onClick={() => setShowCreate(true)}
                            >
                            <FaPlus />  
                            Novo Sala
                        </button>
                    </div>
                </div>

                <div>
                    <ListStudyRooms 
                        refresh={refresh}  
                        showModalUpdate={(studyRoom) => {
                            setShowUpdate(true)
                            setStudyRoom(studyRoom)
                        } }
                    />
                </div>

                {showCreate && 
                    <CreateStudyRoom 
                        closeModal={() => setShowCreate(false)}
                        updateList={updateList}
                    />
                }

                {showUpdate && 
                    <UpdateStudyRoom 
                        closeModal={() => setShowUpdate(false)}
                        updateListStudyRooms={updateList}
                        studyRoomData={studyRoom}
                    />
                }

            </div>
        </div>
    )
}