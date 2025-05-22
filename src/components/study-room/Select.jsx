import { useController } from "react-hook-form"
import { OptionAbreviation, OptionList } from "./OptionSelect";

export default function Select(props){
    const { field, fieldState } = useController(props);
    
    const handleSelectChange = (e) => {
        field.onChange(e.target.value);
        
        if (props.selectedCategory) {
            props.selectedCategory(e.target.value);
        }
    };

    return(
        <div className="flex flex-col gap-1">
            <span className="font-medium text-sm text-gray-900">{props.inputTitle}</span>
            <select
                {...field} 
                className="w-[320px] border rounded-sm p-3"
                onChange={handleSelectChange}
            >
                <option value="">-</option>
                {props.name == "abbreviation" ? <OptionAbreviation/> : <OptionList defaultValue={props.defaultValue} data={props.data}/>}

            </select>
            {fieldState.error && <span className="text-xs text-red-600">{fieldState.error.message}</span>}
        </div>
    ) 
}