import { IoClose } from "react-icons/io5";
import Select from "./Select";
import Inputs from "../Inputs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { parseISO } from 'date-fns';

export default function ModalUpdateFinance(props) {
    const [showSelectPayment, setShowSelectPayment] = useState(props.dataUpdateFinance.status === 'Pago');
    const [mensageStatusSingUp, setMensageStatusSingUp] = useState('');
    const [isSingUpError, setIsSingUpError] = useState(false);
    const [showCardError, setShowCardError] = useState(false);
    const [maturity, setMaturity] = useState();
    const [maturityError, setMaturityError] = useState(false);

    const RegisterFormSchema = z.object({
        description: z.string({ required_error: "Descrição é obrigatorio" }),
        value: z.string({ required_error: "Valor é obrigatorio" }).regex(/^[0-9,.]*$/, 'O Valor só pode conter números'),
        status: z.string({ required_error: "Status é obrigatorio" }),
        paymentType: showSelectPayment ? z.string({ required_error: "Tipo de pagamento é obrigatorio" }) : z.string().optional(),
    });

    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            description: props.dataUpdateFinance.description || '',
            value: props.dataUpdateFinance.value || '',
            status: props.dataUpdateFinance.status,
            paymentType: props.dataUpdateFinance.payment_type || '',
        },
    });

    async function HandleCreateFinance(data) {
        if (!maturity) {
            setMaturityError(true);
            return;
        }
        setMaturityError(false);

        try {
            // Pega o array do localStorage ou cria um array vazio
            let financeEntries = JSON.parse(localStorage.getItem('financeEntries')) || [];

            // Encontra o índice do item que será atualizado
            const indexToUpdate = financeEntries.findIndex(item => item.id === props.dataUpdateFinance.id);

            if (indexToUpdate === -1) {
                throw new Error("Entrada financeira não encontrada");
            }

            // Atualiza os dados do item
            financeEntries[indexToUpdate] = {
                ...financeEntries[indexToUpdate],
                description: data.description,
                value: data.value,
                status: data.status,
                payment_type: data.paymentType || '',
                maturity: maturity.toISOString(),
                doctorID: props.dataUpdateFinance.doctorID,
                clinic_id: props.dataUpdateFinance.clinic_id,
                id: props.dataUpdateFinance.id
            };

            // Salva de volta no localStorage
            localStorage.setItem('financeEntries', JSON.stringify(financeEntries));

            // Feedback positivo
            setIsSingUpError(false);
            setMensageStatusSingUp('Entrada financeira atualizada com sucesso!');
            setShowCardError(true);

            setTimeout(() => {
                props.updateListFinance(); // Atualiza a lista externa
                setMensageStatusSingUp('');
                props.closeModalAccountingEntry(); // Fecha modal após sucesso
            }, 1200);

        } catch (error) {
            setIsSingUpError(true);
            setMensageStatusSingUp(error.message || 'Erro ao atualizar a entrada financeira.');
            setShowCardError(true);

            setTimeout(() => {
                setMensageStatusSingUp('');
                setShowCardError(false);
            }, 5000);
        }
    }

    useEffect(() => {
        if (maturity) setMaturityError(false);
    }, [maturity]);

    useEffect(() => {
        setMaturity(parseISO(props.dataUpdateFinance.maturity));
    }, [props.dataUpdateFinance]);

    useEffect(() => {
         setMaturity(parseISO(props.dataUpdateFinance.maturity));
    }, [])

    return (
        <div className="fixed top-0 left-0 bg-black/50 w-screen h-screen flex justify-center items-center">
            <form
                className="bg-white w-[500px] p-3"
                onSubmit={handleSubmit(HandleCreateFinance)}
            >
                <div className="flex justify-between mb-5">
                    <h1 className="text-xl font-semibold text-softBlue">Atualizar lançamento</h1>
                    <IoClose
                        className="text-2xl cursor-pointer hover:text-softPink transition-[300ms]"
                        onClick={props.closeModalAccountingEntry}
                    />
                </div>

                {showCardError && (
                    <div className={`w-full flex justify-center p-3 rounded text-white ${isSingUpError ? 'bg-softPink' : 'bg-green-600'}`}>
                        <span>{mensageStatusSingUp}</span>
                    </div>
                )}

                <div className="flex flex-col gap-5">
                    <div className="flex flex-1 flex-col">
                        <span className="font-medium text-sm mb-2">Vencimento</span>
                        <DatePicker
                            label="Seleciona uma data"
                            onChange={(date) => setMaturity(date)}
                            value={maturity}
                        />
                        {maturityError && <span className="text-xs text-red-600">Por favor selecione uma data de vencimento.</span>}
                    </div>

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
                            setShowSelectPayment(dataStatus === 'Pago');
                        }}
                    />
                    {showSelectPayment && (
                        <Select
                            control={control}
                            name="paymentType"
                            inputTitle="Tipo de pagamento"
                            defaultValues={['PIX', 'DINHEIRO', 'CHEQUE', 'CONVÊNIO', 'OUTROS', 'CARTÃO DE CRÉDITO', 'CARTÃO DE DÉBITO', 'BOLETO BANCÁRIO']}
                        />
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="w-[150px] h-[40px] bg-red-400 rounded-md text-white uppercase text-sm"
                            onClick={props.closeModalAccountingEntry}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-[150px] h-[40px] bg-green-400 rounded-md text-white uppercase text-sm"
                        >
                            Atualizar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
