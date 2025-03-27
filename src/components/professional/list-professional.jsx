import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { IoPersonSharp } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrUserSettings } from "react-icons/gr";

export default function ListProfession(props){
    return(
        <Table className="border rounded w-[100%] m-auto">
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Serviços</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Isabella</TableCell>
                    <TableCell>isabella@gmail.com</TableCell>
                    <TableCell>(11) 99818-8091</TableCell>
                    <TableCell>Cabelo</TableCell>
                    <TableCell className="flex itens-center gap-5">
                                <HiOutlinePencilAlt  
                                    className="text-xl cursor-pointer hover:text-softBlue transition-[300ms]" 
                                    onClick={() => props.showModalUpdate(profession)}
                                />
                                <GrUserSettings 
                                    className="text-xl cursor-pointer hover:text-softBlue transition-[300ms]" 
                                    // onClick={() => setShowUpdateProfession(true)}
                                />
                                <FaRegTrashCan 
                                    className="text-xl cursor-pointer hover:text-softPink transition-[300ms]" 
                                   onClick={() => props.showModalDeletePatient(profession)}
                                 />
                    </TableCell>
                </TableRow>
            </TableBody>
            {/* <TableBody>
            {props.dataProfession?.map((profession) => {
                return(
                    <TableRow key={profession.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                                <IoPersonSharp className="text-softBlue"/>
                                <span>{profession.name}</span>
                        </TableCell>
                        <TableCell>{profession.email}</TableCell>
                        <TableCell>{props.specailty_category.map((job) =>  profession.job == job.id && job.name)}</TableCell>
                        <TableCell>{props.specialty.map((specialty) =>  profession.specialty == specialty.id && specialty.name)}</TableCell>
                        <TableCell className="flex itens-center gap-5">
                                <HiOutlinePencilAlt  
                                    className="text-xl cursor-pointer hover:text-softBlue transition-[300ms]" 
                                    onClick={() => props.showModalUpdate(profession)}
                                />
                                <GrUserSettings 
                                    className="text-xl cursor-pointer hover:text-softBlue transition-[300ms]" 
                                    // onClick={() => setShowUpdateProfession(true)}
                                />
                                <FaRegTrashCan 
                                    className="text-xl cursor-pointer hover:text-softPink transition-[300ms]" 
                                   onClick={() => props.showModalDeletePatient(profession)}
                                 />
                        </TableCell>
                    </TableRow>
                )
            })}
            </TableBody> */}
        </Table>
    )
}