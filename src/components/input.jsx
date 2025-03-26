import { useController } from "react-hook-form";
import InputMask from 'react-input-mask';

export default function Inputs(props){
    const { field, fieldState } = useController(props);

    const cleanValue = (value) => {
        // Remove todos os caracteres não numéricos e o caractere '_'
        return value.replace(/[_\D]/g, '');
    };

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const cleanedValue = cleanValue(inputValue);
        field.onChange(cleanedValue);
    };

    function ChangeValue(value){
        let valor = value.replace(/\D/g, '');

        // Adiciona vírgula para separar os centavos
        valor = (valor / 100).toFixed(2).replace('.', ',');
    
        // Adiciona separadores de milhar
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        field.onChange(valor);
    }
    return (
        <div className="w-full flex-col gap-1">
            <span className="font-medium text-sm text-gray-900">{props.inputTitle}</span>
            {props.mask ? (
                <InputMask
                    {...field}
                    mask={props.mask}
                    onChange={handleChange} // Usando handleChange para remover o caractere '_' antes de passar o valor para o campo do formulário
                    onBlur={(e) => {
                        const inputValue = e.target.value;
                        const maskWithoutLiterals = props.mask.replace(/[^9]/g, '_');
                        // if (inputValue === maskWithoutLiterals) {
                        //     field.onChange(''); // Se o valor for apenas o padrão da máscara, definir como uma string vazia
                        // }
                    }}
                    className="w-full border rounded-sm p-3"
                    disabled={props.isDisabled ? true : false}
                />
            ) : (
                props.typeInput == 'time' ? 
                <input
                    {...field}
                    className="w-full h-[48px] border rounded-sm p-3"
                    type="time"
                    disabled={props.isDisabled ? true : false}
                />
                :
                props.name == 'value' ?
                    <input
                        {...field}
                        className="w-full border rounded-sm p-3"
                        onChange={(e) => ChangeValue(e.target.value)}
                        disabled={props.isDisabled ? true : false}
                    />
                :
                    <input
                        {...field}
                        className="w-full border rounded-sm p-3"
                        disabled={props.isDisabled ? true : false}
                    />
            )}
            {fieldState.error && <span className="text-xs text-red-600">{fieldState.error.message}</span>}
        </div>
    );
}