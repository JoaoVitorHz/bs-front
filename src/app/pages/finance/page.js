'use client'

import { api } from "@/service/api";
import { useEffect, useState } from "react";

import TableFinance from "@/components/finance/Table"
import ModalAccountingEntry from "@/components/finance/AccountingEntry/ModalAccountingEntry"
import { ModalDeleteFinance } from "@/components/finance/AccountingEntry/ModalDeleteFinance";
import ModalUpdateFinance from "@/components/finance/AccountingEntry/ModalUpdateFinance";

export default function Finance(){
    const [showModalAccountingEntry, setShowModalAccountingEntry] = useState(false);
    const [showModalDeleteAccountingEntry, setShowModalDeleteAccountingEntry] = useState(false);
    const [showModalUpdateFinance, setShowModalUpdateFinance] = useState(false);

    const [dataFinance, setDataFinance] = useState([]);
    const [totalFinance, setTotalFinance] = useState();
    const [financeUpdate, setFinanceUpdate] = useState([])

    async function GetFinance(){
       try {
            const storedData = JSON.parse(localStorage.getItem('financeEntries')) || [];
              setDataFinance(storedData)
            return storedData;
        } catch (error) {
            console.error("Erro ao ler os dados do localStorage:", error);
            return [];
        }
    }
 
    useEffect(() => {
        GetFinance();
    }, [])

    return(
        <div className="w-4/5 m-auto bg-white mt-5 p-3 flex flex-col gap-14">

            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col gap-3">
                    <span className="text-2xl font-bold">Financeiro</span>
                </div>

                <div className="flex gap-2">
                    <button 
                        className="min-w-[150px] h-[40px] px-3 bg-green-400 rounded-md text-white uppercase font-medium text-sm"
                        onClick={() => setShowModalAccountingEntry(true)}
                    >
                        Novo Lançamento
                    </button>
                </div>
            </div>

            <div className="w-full flex justify-between items-center">
                <TableFinance 
                    dataFinance={dataFinance}
                    showModalUpdate={(data) => {
                        setFinanceUpdate(data)
                        setShowModalUpdateFinance(true)
                    }}
                    showModalDeleteFinance={(data) => {
                        setFinanceUpdate(data)
                        setShowModalDeleteAccountingEntry(true)
                    }}
                />
            </div>

       
            {showModalAccountingEntry &&
                <ModalAccountingEntry 
                    closeModalAccountingEntry={() => {
                        setShowModalAccountingEntry(false)
                      
                    }} 
                    updateListFinance={() => {
                        setShowModalAccountingEntry(false);
                        GetFinance();
                    }} 
                />
            }
            {showModalUpdateFinance && 
                <ModalUpdateFinance 
                    dataUpdateFinance={financeUpdate}
                    closeModalAccountingEntry={() => setShowModalUpdateFinance(false)} 
                    updateListFinance={() => {
                        setShowModalUpdateFinance(false);
                        GetFinance();
                      
                    }} 
                />
            }
            {showModalDeleteAccountingEntry && 
                <ModalDeleteFinance 
                    dataFinance={financeUpdate}
                    updateListFinance={() => {
                        setShowModalDeleteAccountingEntry(false);
                        GetFinance();
                    }}
                    closeModal={() => setShowModalDeleteAccountingEntry(false)}
                />
            }
            
        </div>
    )
}