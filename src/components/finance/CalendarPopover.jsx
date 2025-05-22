'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

import { FaRegCalendarAlt } from "react-icons/fa";

export default function CalendarPropover(props){
    const [date, setDate] = useState(new Date())
    return(
        <Popover>
            <PopoverTrigger asChild>
                <button className="px-4 h-[30px] rounded border flex gap-2 items-center text-sm bg-white">
                <FaRegCalendarAlt />
                    {props.defaultText}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}