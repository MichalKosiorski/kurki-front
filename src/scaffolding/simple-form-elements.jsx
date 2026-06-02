import "./simple-elements.css";


import { forwardRef } from "react";
import "./simple-elements.css";

export const SimpleInput = forwardRef(function SimpleInput(
    {
        type = 'text',
        onEnter = null,
        onChange = null,
        value = null,
        svg = null,
        placeholder = "",
        add_class = "",
        id_param = ''
    },
    ref
) {
    function handleOnChange(v) {
        if (onChange) onChange(v);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && onEnter) {
            onEnter(e.target.value);
        }
    }

    return (
        <div className={`simple-input ${add_class}`}>
            {svg && <div className="simple-input-left">
                {svg}
            </div>}
            <input 
                ref={ref}
                id={id_param}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => { handleOnChange(e.target.value) }}
                onKeyDown={handleKeyDown}
            />
            {type == 'password' && <div className="simple-input-right">

            </div>}
        </div>
    );
});