import { useController } from "react-hook-form"

export default function Select(props){
    const { field, fieldState } = useController(props);
    
    const handleSelectChange = (e) => {
        field.onChange(e.target.value);

        if (props.selectType) {
            props.selectType(e.target.value);
        }
        if (props.selectTypeStatus){
            props.selectTypeStatus(e.target.value)
        }
    };


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
                        {props.dataCategory ? 
                            props.dataCategory.map((category) =>{
                                if(category.id == props.defaultValuesCategory){
                                    return category.name
                                } 
                            })
                            :
                            field.value
                        }
                    </div>
                {fieldState.error && <span className="text-xs text-red-600">{fieldState.error.message}</span>}
            </div>
        )
    }
    else {
        return(
            <div className="flex flex-col gap-1">
                <span className="font-medium text-sm text-gray-900">{props.inputTitle}</span>
                <select
                    {...field} 
                    className="w-[320px] border rounded-sm p-3"
                    onChange={handleSelectChange}
                    disabled={props.disabled ? props.name == "status" ? false : true : false}
                >
                    <option value="">-</option>
    
                    {props.defaultValues && 
                        props.defaultValues.map((item) => {
                            if(item == props.dataType){
                                return <option value={item} selected>{item}</option>
                            } else {
                                return <option value={item}>{item}</option>
                            }
                        } )
                    }
                    {props.dataCategory && 
                        props.dataCategory.map((category) =>{
                            if(category.id == props.defaultValuesCategory){
                                return <option value={category.id} selected>{category.name}</option>
                            } else {
                                return <option value={category.id}>{category.name}</option>
                            }
                            
                        })
                    }
    
                </select>
                {fieldState.error && <span className="text-xs text-red-600">{fieldState.error.message}</span>}
            </div>
        ) 
    }
   
}