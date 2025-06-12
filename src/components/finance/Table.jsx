import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { api } from "@/service/api";
import { useEffect, useState } from "react";

export default function TableFinance(props){

    console.log(props)

    function FormatDate(isoDate){
        const date = new Date(isoDate)
        return date.toLocaleDateString("pt-BR");
    };


    let userData = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem('userData')) : '';
    return(
        <Table className="border">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">ID</TableHead>
                    <TableHead className="text-center">Vencimento</TableHead>
                    <TableHead className="text-center">Tipo</TableHead>
                    <TableHead className="text-center">Descrição</TableHead>
                    <TableHead className="text-center">Valor</TableHead>
                    <TableHead className="text-center">Forma de Pagamento</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {props.dataFinance?.map((finance) => {
                return(
                    <TableRow>
                        <TableCell className="text-center">{finance.id}</TableCell>
                        <TableCell className="text-center">{FormatDate(finance.maturity)}</TableCell>
                        <TableCell className="text-center">{finance.type_id}</TableCell>
                        <TableCell className="text-center">{finance.description}</TableCell>
                        <TableCell className="text-center">{`R$ ${finance.value}`}</TableCell>
                        <TableCell className="text-center">{finance.payment_type ? finance.payment_type : '-' }</TableCell>
                        <TableCell className="text-center">{finance.status}</TableCell>
                        <TableCell className="flex gap-5">
                            <HiOutlinePencilAlt  
                                className="text-xl cursor-pointer hover:text-softBlue transition-[300ms]" 
                                onClick={() => props.showModalUpdate(finance)}
                            />
                            <FaRegTrashCan 
                                className="text-xl cursor-pointer hover:text-softPink transition-[300ms]" 
                                onClick={() => props.showModalDeleteFinance(finance)}
                            />
                        </TableCell>
                        
                    </TableRow>
                )
            })}
            </TableBody>
        </Table>
    )
}