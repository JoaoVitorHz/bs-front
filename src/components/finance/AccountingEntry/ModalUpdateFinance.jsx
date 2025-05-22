import { IoClose } from "react-icons/io5";

// import CategoryType from "./CategoryType";
// import AccountingEntryType from "./AccoutingEntryStatus";
// import DateAccoutingEntrey from "./DateAccoutingEntrey";

import Select from "./Select";
import Inputs from "../Inputs";

import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from "react";
import { api } from "@/service/api";
import Maturity from "./Maturity";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO } from 'date-fns';
export default function ModalUpdateFinance(props){
    const [showSelectPayment, setShowSelectPayment] = useState(props.dataUpdateFinance.status == 'Pago' ? true : false)

    const RegisterFormSchema = z.object({
        typeId: z.string({ required_error: "Nome é obrigatorio"}).min(2, 'Mínimo de 2 caracteres requerido'),
        categoryId: z.string({ required_error: "Categoria é obrigatorio"}),
        description: z.string({ required_error: "Descrição é obrigatorio"}),
        value: z.string({ required_error: "Valor é obrigatorio"}).regex(/^[0-9,.]*$/,'O Valor só pode conter números' ),
        status: z.string({ required_error: "Status é obrigatorio"}),
        paymentType: showSelectPayment ? z.string({ required_error: "Tipo de pagamento é obrigatorio"}) : z.string().optional(),
    })

    const [mensageStatusSingUp, setMensageStatusSingUp] = useState('');
    const [isSingUpError, setIsSingUpError] = useState(false)
    const [showCardError, setShowCardError] = useState(false)

    const [category, setCategory] = useState([])

    const [maturity, setMaturity] = useState()
    const [maturityError, setMaturityError] = useState(false)

    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            typeId: props.dataUpdateFinance.type_id,
            categoryId: props.dataUpdateFinance.category_id,
            description: props.dataUpdateFinance.description || '',
            value: props.dataUpdateFinance.value || '',
            status: props.dataUpdateFinance.status,
            paymentType: props.dataUpdateFinance.payment_type || '',
        },
    });

    async function HandleCreateFinance(data){
        if(!maturity){
            setMaturityError(true)
            return
        }
        setMaturityError(false)
        try{
            let selectDoctor = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem('selectDoctor')) : '';
            const response = await api.put('finance/update/' + props.dataUpdateFinance.id, {
                ...data, 
                maturity,
                doctorID: selectDoctor.id,
                clinic_id: selectDoctor.clinic_id
            })
            if(response.data.id){
                setIsSingUpError(false)
                setMensageStatusSingUp('Entrada financeira atualizada com sucesso!')
                setShowCardError(true)
                
                setTimeout(() => {
                    props.updateListFinance();
                    setMensageStatusSingUp('')
                }, 1200)
            }
        } catch(error){
            if(error){
                setIsSingUpError(true)
                setMensageStatusSingUp(error.response.data.errors)
                setShowCardError(true)

                setTimeout(() => {
                    setMensageStatusSingUp('')
                    setShowCardError(false)
                }, 5000)
            }
        }
    }

    async function getCategory(type){
        let selectDoctor = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem('selectDoctor')) : '';
        const response = await api.get('financeCategory/getCategory/' + type, {
            params: {
                doctorID: selectDoctor.id,
                clinic_id: selectDoctor.clinic_id
            }
        });
        setCategory(response.data);
    }
    useEffect(() => {
        if(maturity)
            setMaturityError(false)
    }, [maturity])

    useEffect(() => {
        setMaturity(props.dataUpdateFinance.maturity)
        getCategory(props.dataUpdateFinance.type_id)
    }, [])

    return(
        <div className="fixed top-0 left-0 bg-black/50 w-screen h-screen flex justify-center items-center">
            <form 
                className="bg-white w-[500px] p-3"
                onSubmit={handleSubmit(HandleCreateFinance)}
            >
                <div className="flex justify-between mb-5">
                    <h1 className="text-xl font-semibold text-softBlue">Atualizar lançamento</h1>
                    <IoClose className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]" onClick={props.closeModalAccountingEntry}/>
                </div>
                {showCardError &&
                    <div className={`w-full flex justify-center p-3 rounded text-white ${isSingUpError ? 'bg-softPink ': 'bg-green-600'}`}>
                        <span>{mensageStatusSingUp}</span>
                    </div>
                }
                <div className="flex flex-col gap-5">
                    <div className="flex flex-1 flex-col">
                        <span className="font-medium text-sm mb-2">Vencimento</span>
                        <DatePicker 
                            label="Seleciona uma data"
                            onChange={(date) => setMaturity(date)}
                            value={parseISO(props.dataUpdateFinance.maturity)}  
                        />
                        {/* <Maturity defaultText={props.dataUpdateFinance.maturity} onChangeDate={(date) => setMaturity(date)}/> */}
                        {maturityError && <span className="text-xs text-red-600">Por favor selecione uma data de aniversario.</span>}
                    </div>
                    <Select 
                        control={control}
                        name="typeId"
                        inputTitle="Tipo" 
                        dataType={props.dataUpdateFinance.type_id}
                        defaultValues={['PAGAMENTO', 'RECEBIMENTO']}
                        selectType={(type) => getCategory(type)}
                    />
                    <Select 
                        control={control}
                        name="categoryId"
                        inputTitle="Categoria" 
                        dataCategory={category}
                        defaultValuesCategory={props.dataUpdateFinance.category_id}
                    />
                    <Inputs 
                        control={control}
                        name="description"
                        inputTitle="Descrição"
                    />
                     <Inputs 
                        control={control}
                        name="value"
                        inputTitle="Valor"
                    />
                    <Select 
                        control={control}
                        name="status"
                        inputTitle="Status" 
                        defaultValues={['Pago', 'Pendente']}
                        selectTypeStatus={(dataStatus) => {
                            if(dataStatus == 'Pago'){
                                setShowSelectPayment(true)
                            } else {
                                setShowSelectPayment(false)
                            }
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
                            className="w-[150px] h-[40px] bg-softPink rounded-md text-white uppercase text-sm"
                            onClick={props.closeModalAccountingEntry}
                        >
                            Cancelar
                        </button>
                        <button className="w-[150px] h-[40px] bg-softBlue rounded-md text-white uppercase text-sm">Incluir</button>
                    </div>
                </div>
            </form>
        </div>
    )
}