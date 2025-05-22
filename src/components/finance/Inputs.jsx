import { useController } from "react-hook-form";
import InputMask from 'react-input-mask';

export default function Inputs(props){
    const { field, fieldState } = useController(props);

    const cleanPhoneNumber = (phoneNumber) => {
        // Remove todos os caracteres não numéricos e o caractere '_'
        return phoneNumber.replace(/[_\D]/g, '');
    };

    const handleChange = (event) => {
        const inputPhoneNumber = event.target.value;
        const cleanedPhoneNumber = cleanPhoneNumber(inputPhoneNumber);
        field.onChange(cleanedPhoneNumber);
    };

    function ChangeValue(value){
        let valor = value.replace(/\D/g, '');

        // Adiciona vírgula para separar os centavos
        valor = (valor / 100).toFixed(2).replace('.', ',');
    
        // Adiciona separadores de milhar
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        field.onChange(valor);
    }

    if(props.isReadOnly){
        return(
            <div className="flex flex-col gap-1">
                <span className="font-medium text-sm text-gray-900">{props.inputTitle}</span>
                    <input 
                        {...field}
                        type="hidden"
                        className="w-[100%] border rounded-sm p-3"
                    />
                    <div className="w-[100%] border rounded-sm p-3 bg-slate-100 text-gray-400">
                        {field.value}
                    </div>
                {fieldState.error && <span className="text-xs text-red-600">{fieldState.error.message}</span>}
            </div>
        )
    }
    else {
        return(
            <div className="flex flex-col gap-1">
                <span className="font-medium text-sm text-gray-900">{props.inputTitle}</span>
                {props.mask ? (
                    <InputMask
                        {...field}
                        mask={props.mask}
                        onChange={handleChange} // Use handleChange para remover o caractere '_' antes de passar o valor para o campo do formulário
                        className="w-[100%] border rounded-sm p-3"
                    />
                ) : (
                    props.inputTitle == 'Valor' ?
                    <input 
                        {...field}
                        className="w-[100%] border rounded-sm p-3"
                        onChange={(e) => ChangeValue(e.target.value)}
                    />
                     : 
                    <input 
                        {...field}
                        className="w-[100%] border rounded-sm p-3"
                    />
                )}
                {fieldState.error && <span className="text-xs text-red-600">{fieldState.error.message}</span>}
            </div>
        ) 
    }
   
}
