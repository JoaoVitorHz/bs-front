'use client'

import { IoClose } from "react-icons/io5";
import Select from "./Select";
import Inputs from "../Inputs";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react";

export default function ModalAccountingEntry(props){
    const [showSelectPayment, setShowSelectPayment] = useState(false)

    const RegisterFormSchema = z.object({
        description: z.string(),
        value: z.string().regex(/^[0-9,.]*$/,'O Valor só pode conter números' ),
        status: z.string(),
        paymentType: showSelectPayment ? z.string() : z.string().optional(),
    })

    const [mensageStatusSingUp, setMensageStatusSingUp] = useState('');
    const [isSingUpError, setIsSingUpError] = useState(false)
    const [showCardError, setShowCardError] = useState(false)
    const [category, setCategory] = useState([])
    const [maturity, setMaturity] = useState()
    const [maturityError, setMaturityError] = useState(false)

    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({resolver: zodResolver(RegisterFormSchema)});

    async function HandleCreateFinance(data){
        try {
            const selectDoctor = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem('selectDoctor')) : '';

            const newEntry = {
                ...data, 
                doctorID: selectDoctor?.id ?? null, 
                clinic_id: selectDoctor?.clinic_id ?? null,
                id: Date.now(), // Gerar um ID único para cada lançamento
            }

            // Pega o array atual do localStorage ou cria um novo array vazio
            const storedData = JSON.parse(localStorage.getItem('financeEntries')) || [];
            storedData.push(newEntry);
            localStorage.setItem('financeEntries', JSON.stringify(storedData));

            setIsSingUpError(false)
            setMensageStatusSingUp('Nova entrada salva com sucesso!')
            setShowCardError(true)
            setTimeout(() => {
                props.updateListFinance();
                setMensageStatusSingUp('')
                setShowCardError(false)
            }, 1500)

        } catch(error) {
            setIsSingUpError(true)
            setMensageStatusSingUp('Erro ao salvar no localStorage')
            setShowCardError(true)
            setTimeout(() => {
                setMensageStatusSingUp('')
                setShowCardError(false)
            }, 5000)
        }
    }

    return(
        <div className="fixed top-0 left-0 bg-black/50 w-screen h-screen flex justify-center items-center">
            <form 
                className="bg-white w-[500px] p-3"
                onSubmit={handleSubmit(HandleCreateFinance)}
            >
                <div className="flex justify-between mb-5">
                    <h1 className="text-xl font-semibold text-softBlue">Novo lançamento</h1>
                    <IoClose className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]" onClick={props.closeModalAccountingEntry}/>
                </div>

                <div className="flex flex-col gap-5">

                    <Inputs control={control} name="description" inputTitle="Descrição" />
                    <Inputs control={control} name="value" inputTitle="Valor" />

                    <Select 
                        control={control}
                        name="status"
                        inputTitle="Status" 
                        defaultValues={['Pago', 'Pendente']}
                        selectTypeStatus={(dataStatus) => {
                            setShowSelectPayment(dataStatus === 'Pago');
                        }}
                    />

                    {showSelectPayment &&
                        <Select 
                            control={control}
                            name="paymentType"
                            inputTitle="Tipo de pagamento" 
                            defaultValues={['PIX','DINHEIRO','CHEQUE','CONVÊNIO','OUTROS','CARTÃO DE CRÉDITO','CARTÃO DE DÉBITO','BOLETO BANCÁRIO']}
                        />
                    }

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="w-[150px] h-[40px] bg-red-400 rounded-md text-white uppercase text-sm"
                            onClick={props.closeModalAccountingEntry}
                        >
                            Cancelar
                        </button>
                        <button className="w-[150px] h-[40px] bg-green-400 rounded-md text-white uppercase text-sm">Incluir</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
