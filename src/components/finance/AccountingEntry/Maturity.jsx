'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { FaRegCalendarAlt } from "react-icons/fa";

export default function Maturity(props){
    const [date, setDate] = useState(props.defaultText != "dd/mm/aaaa" && props.defaultText)
    const [error, setError] = useState(false)

    const formatDate = (isoDate) => {
        const date = new Date(isoDate)
        return date.toLocaleDateString("pt-BR");
    };
    function changeDate(newDate) {
        const currentDate = new Date();
        const dateSelected = (newDate != undefined) ? new Date(newDate) : currentDate;
        const isoDateSelected = dateSelected.toISOString();

        setError(false);
        setDate(dateSelected);
        props.onChangeDate(isoDateSelected);
    }
    
    return(
        <>
            <Popover className="flex-1">
                <PopoverTrigger asChild>
                    <button className=" px-4 h-[40px] rounded border flex  justify-center gap-2 items-center text-sm bg-white">
                        {date ? formatDate(date) : props.defaultText}
                        <FaRegCalendarAlt />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date ? new Date(date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })) : new Date()}
                        onSelect={changeDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            {error && <span className="text-xs text-red-600">A data de vencimento não pode ser maior do que a data atual.</span>}
        </>
    )
}