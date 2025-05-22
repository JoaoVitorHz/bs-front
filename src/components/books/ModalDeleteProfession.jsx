'use client'

import { api } from "@/service/api"
import { useState } from "react";

export function DeleteProfession(props){
    const [isSingUpError, setIsSingUpError] = useState(false)
    const [showCardError, setShowCardError] = useState(false)
    const [mensageStatusSingUp, setMensageStatus] = useState('');

    async function DeleteProfession(){
        try{
            const response = await api.delete('doctor/' + props.dataProfession.id)
            if(response.data.id){
                setIsSingUpError(false)
                setMensageStatus('Profissional Deletado com sucesso!')
                setShowCardError(true)
                setTimeout(() => {
                    props.updateListProfession()
                }, 1500)
            }
        }catch(error){
            if(error){
                setIsSingUpError(true)
                setMensageStatus(error.response.data.errors)
                setShowCardError(true)

                setTimeout(() => {
                    setMensageStatus('')
                    setShowCardError(false)
                }, 5000)
            }
        }
    }

    return(
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-5 rounded flex flex-col gap-5">
                <div>
                    <p className="text-lg font-medium">Deseja apagar esse profissional? </p>
                </div>
                {showCardError &&
                    <div className={`w-full flex justify-center p-3 rounded text-white ${isSingUpError ? 'bg-softPink ': 'bg-green-600'}`}>
                        <span>{mensageStatusSingUp}</span>
                    </div>
                }
                <div className="flex gap-3">
                    <button 
                        className="min-w-[150px] h-[40px] px-3 bg-softPink rounded-md text-white uppercase font-medium text-sm"
                        onClick={() => props.closeModal()}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="min-w-[150px] h-[40px] px-3 bg-softBlue rounded-md text-white uppercase font-medium text-sm"
                        onClick={() => DeleteProfession()}
                    >
                        Apagar Profissional
                    </button>
                </div>
            </div>

        </div>
    )
}