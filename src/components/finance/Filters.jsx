'use client'

import { useState } from "react"
import { DemoComponent } from "../Date-picker"
import CalendarPropover from "./CalendarPopover"
import SelectPaymentType from "./select-payment-type"
import SelectStatus from "./select-status"
import SelectType from "./select-type"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Filter(props){
    
    let [clearType, setClearType] = useState(false)
    let [clearPaymentType, setClearPaymentType] = useState(false)
    let [clearStatus, setClearStatus] = useState(false)

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const handleClearStartDate = () => {
        setSelectedStartDate(null); // Limpa o valor do DatePicker
    };

    const handleClearEndDate = () => {
        setSelectedEndDate(null); // Limpa o valor do DatePicker
    };

    return(
        <>
            <div className="bg-bluePrimary flex items-center rounded-md p-2 gap-2">
                <div className=" w-[150px]">
                    <DatePicker
                        width={100}
                        label="Data Inicial"
                        value={selectedStartDate}
                        onChange={(date) => {
                            setSelectedStartDate(date);
                            props.changeInicialDate(date); // Passa a data selecionada para o componente pai
                        }}
                    />
                    {/* <DemoComponent selectAfterCurrentDay={true} onChangeDate={(date) => props.changeInicialDate(date)}/> */}

                </div>
                <div className="w-[150px]">
                    <DatePicker
                        label="Data Final"
                        value={selectedEndDate}
                        onChange={(date) => {
                            setSelectedEndDate(date);
                            props.changeEndDate(date); // Passa a data selecionada para o componente pai
                        }}
                    />
                    {/* <DemoComponent selectAfterCurrentDay={true} onChangeDate={(date) => props.changeEndDate(date)}/> */}
                </div>
                <div className="min-w-[150px]">
                    <SelectType 
                        title="Tipo" 
                        onChangeType={(type) => props.changeType(type)}
                        defaultValue={['PAGAMENTO', 'RECEBIMENTO']} 
                        clear={clearType}
                    />
                </div>
                <div className="min-w-[150px]">
                    <SelectPaymentType 
                        title="Forma de pagamento" 
                        onChangePaymentType={(type) => props.changePaymentType(type)}
                        defaultValue={['PIX','DINHEIRO','CHEQUE','CONVÊNIO','OUTROS','CARTÃO DE CRÉDITO','CARTÃO DE DÉBITO','BOLETO BANCÁRIO']} 
                        clear={clearPaymentType}
                    />
                </div>
                <div className="min-w-[150px]">
                    <SelectStatus 
                        title="status" 
                        onChangeStatus={(status) => props.changeStatus(status)}
                        defaultValue={['Pago', 'Pendente']} 
                        clear={clearStatus}
                    />
                </div>
            </div>
        
            <div className="flex gap-2">
                <button 
                    className="w-[150px] h-[40px] bg-softBlue rounded-md text-white uppercase text-sm" 
                    onClick={() => props.handleFilter()}
                >
                    Filtrar
                </button>
                <button 
                    className="w-[150px] h-[40px] bg-softPink rounded-md text-white uppercase text-sm"
                    onClick={() =>  {
                        props.changeInicialDate('')
                        props.changeEndDate('')
                        props.changeType('')
                        props.changePaymentType('')
                        props.changeStatus('')
                        
                        setClearType(true)
                        setClearPaymentType(true)
                        setClearStatus(true)
                        handleClearStartDate()
                        handleClearEndDate()
                        setTimeout(() => {
                            setClearType(false)
                            setClearPaymentType(false)
                            setClearStatus(false)
                        }, 1000)
                        props.handleClearFilter()
                    }}
                >
                    Limpar
                </button>
            </div>
        </>
      
    )
}