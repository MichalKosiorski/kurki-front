import "./simple-elements.css";


export function SimpleInput({
    type = 'text',
    onEnter = null,
    onChange = null,
    value = null,
    placeholder = "",
    add_class = "",
    id_param = ''
})
{
    function handleOnChange(v){
        if(onChange)
            onChange(v);
    }

    return (
        <div className={`simple-input ${add_class}`}>
            <input 
                id={id_param}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e)=>{handleOnChange(e.target.value)}}
            />
        </div>
    )
}