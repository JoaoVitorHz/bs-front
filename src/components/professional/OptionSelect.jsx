export function OptionAbreviation(){
    return(
        <>
            <option value="Dr">Dr</option>
            <option value="Dra">Dra</option>
            <option value="-">-</option>
        </>         
    )
}

export function OptionList(props){
    return(
        <>
            {
                props.data?.map((option) => {

                    if(props.defaultValue == option.id){
                        return <option selected value={option.id} key={option.id}>{option.name}</option>
                    } else{
                        return <option value={option.id} key={option.id}>{option.name}</option>
                    }
                })
            }
        </>
    )
}