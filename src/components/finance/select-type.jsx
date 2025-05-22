'use client'

import { useState, useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

export default function SelectType(props) {
    const [key, setKey] = useState(0);

    useEffect(() => {
        if (props.clear === true) {
            // Se clear for igual a true, incrementa a chave para forçar o re-render
            setKey(prevKey => prevKey + 1);
        }
    }, [props.clear]);

    return (
        <div className="flex justify-end">
            <Select key={key} onValueChange={(value) => props.onChangeType(value)}>
                <SelectTrigger className="px-4 h-[56px] rounded border flex gap-2 items-center">
                    <SelectValue placeholder={props.title} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">-</SelectItem>
                    {
                        props.defaultValue?.map((value) => {
                            return (
                                <SelectItem key={value} value={value}>{value}</SelectItem>
                            )
                        })
                    }
                </SelectContent>
            </Select>
        </div>
    )
}
