'use client'

import { api } from "@/service/api"
import { useState } from "react";

export function ModalDeleteFinance(props){
    const [isSingUpError, setIsSingUpError] = useState(false)
    const [showCardError, setShowCardError] = useState(false)
    const [mensageStatusSingUp, setMensageStatus] = useState('');

    function DeleteFinance(recordToRemove) {
        if (typeof window === 'undefined') return; 

        const financeRecords = JSON.parse(localStorage.getItem('financeEntries')) || [];
        const updatedRecords = financeRecords.filter(record => record.id !== props.dataFinance.id);

        localStorage.setItem('financeEntries', JSON.stringify(updatedRecords));

        setIsSingUpError(false)
            setMensageStatus('Entrada deletada com sucesso!')
            setShowCardError(true)
            setTimeout(() => {
                props.updateListFinance()
        }, 1500)
    }

    return(
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-5 rounded flex flex-col gap-5">
                <div>
                    <p className="text-lg font-medium">Deseja apagar esse lançamento? </p>
                </div>
                {showCardError &&
                    <div className={`w-full flex justify-center p-3 rounded text-white ${isSingUpError ? 'bg-softPink ': 'bg-green-600'}`}>
                        <span>{mensageStatusSingUp}</span>
                    </div>
                }
                <div className="flex gap-3">
                    <button 
                        className="min-w-[150px] h-[40px] px-3 bg-red-500 rounded-md text-white uppercase font-medium text-sm"
                        onClick={() => props.closeModal()}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="min-w-[150px] h-[40px] px-3 bg-green-400 rounded-md text-white uppercase font-medium text-sm"
                        onClick={() => DeleteFinance()}
                    >
                        Apagar
                    </button>
                </div>
            </div>

        </div>
    )
}