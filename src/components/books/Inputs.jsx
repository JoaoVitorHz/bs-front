import { useController } from "react-hook-form";

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

    return(
        <div className="  flex flex-col gap-1">
            <span className="font-medium text-sm text-gray-900">{props.inputTitle}</span>
            <input 
                {...field}
                className="w-full border rounded-sm p-3"
            />
            {fieldState.error && <span className="text-xs text-red-600">{fieldState.error.message}</span>}
        </div>
    ) 
}
