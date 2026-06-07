import "./simple-elements.css";
import jajo_in from "../assets/jajo_inside.png";
import jajo_out from "../assets/jajo_outside.png";


import { forwardRef, useState } from "react";
import "./simple-elements.css";


/*  -----------------------
            INPUT
---------------------------*/

export const SimpleInput = forwardRef(function SimpleInput(
    {
        type = 'text',
        onEnter = null,
        onUp = null,
        onDown = null,
        onChange = null,
        value = "",
        svg = null,
        placeholder = "",
        add_class = "",
        id_param = '',
        name = ''
    },
    ref
) {

    const [passwordVissible, setPasswordVissible] = useState(false);

    function handleOnChange(v) {
        if (onChange) onChange(v);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && onEnter) {
            onEnter(e.target.value);
        }
        if (e.key === "ArrowUp" && onUp) {
            onUp(e.target.value);
        }
        if (e.key === "ArrowDown" && onDown) {
            onDown(e.target.value);
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
                name = {name}
                type={type == "password" ? passwordVissible ? "text" : "password" : type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => { handleOnChange(e.target.value) }}
                onKeyDown={handleKeyDown}
            />
            {type == 'password' && <div className="simple-input-right">
                
            </div>}
            {type == 'password' && <div className="simple-input-absolute" onClick={()=>{setPasswordVissible(prev => !prev)}}>
                <img src={jajo_out} alt="pokaż hasło" className={`simple-input-anim-out`}/>
                <img src={jajo_in} alt="pokaż hasło animacja" className={`simple-input-anim-in ${passwordVissible ? 'open' : ''}`}/>
            </div>}
        </div>
    );
});

/*  -----------------------
            LABEL
---------------------------*/
export function SimpleLabel({forWho = "", text, color, add_class})
{
    return <label htmlFor={forWho} style={{color: color}} className={`simple-label ${add_class}`}>
        {text}
    </label>
}


/*---------------------------
        SIMPLE DIGIT
-----------------------------*/
export const SimpleDigitInput = forwardRef(function DigitInput(
    {
        value = "",
        onChange = null,
        onEnter = null,
        onLeft = null,
        onRight = null,
        onBackspace = null,
        add_class = "",
        id_param = "",
        name = "",
        order= 0
    },
    ref
) {

    const handleChange = (v) => {
        if (onChange) {
            onChange(v, order);
        }
    };

    const handleKeyDown = (e) => {
        
        if (e.key === "Backspace" && onBackspace) {
            onBackspace(value, order);
            return;
        }    
        
        if (e.key === "Enter" && onEnter) {
            onEnter(value);
        }

        if (e.key === "ArrowLeft" && onLeft) {
            onLeft(value);
        }

        if (e.key === "ArrowRight" && onRight) {
            onRight(value);
        }
    };

    return (
        <div className={`simple-digit ${add_class}`}>
            <input
                ref={ref}
                id={id_param}
                name={name}
                type="text"
                inputMode="numeric"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
});