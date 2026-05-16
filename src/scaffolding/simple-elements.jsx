import { Link, useLocation } from "react-router-dom";
import "./simple-elements.css"
import { useContext, useRef, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { SlArrowDown } from "react-icons/sl";

export function Spacer({
    height_pc = 10,
    height_phone = null,
    height_tablet = null,
    unit = "px"
})
{
    if(!height_phone)
        height_phone = height_pc;

    if(!height_tablet)
        height_tablet = height_pc;

    height_pc = height_pc + unit;
    height_tablet = height_tablet + unit;
    height_phone = height_phone + unit;

    return <div className="simple-spacer" style={{
        "--spacer-height-pc": height_pc,
        "--spacer-height-tablet": height_tablet,
        "--spacer-height-phone": height_phone
    }}></div>
}


export function SimpleImage({
    alt = "",
    src = "",
    style = {},
    add_class = "",
    border_color = "none",
    border_radius = "",
    border_radius_unit = "px"
})
{
    let border_adder = ""
    
    if(border_color !== "none")
        border_adder = `1px solid ${border_color}`;
    
    let borderRadius = ""
    
    if(border_radius !== "")
        borderRadius =`${border_radius}${border_radius_unit}`;

    if(borderRadius !== "")
        style["borderRadius"] = borderRadius;

    if(border_adder = "")
        style["border"] = border_adder;

    return <img src={src} alt={alt} className={`simple-image ${add_class}`} style={style}/>
}

export function SimpleFlexCentered({direction = "row", add_class, children})
{
    return <div className={`simple-flex-centered ${add_class}`} style={{flexDirection: direction}}>{children}</div>
}

export function HeaderH1({ 
    text,
    color,
    font_weight = 600,
    pc_align = 'left',
    tablet_align = 'left',
    phone_aling = 'left',
})
{
    return <h1 className="simple-header-h1" style={{
        fontWeight: font_weight,
        color: color,
        '--align-pc': pc_align,
        "--align-tablet": tablet_align,
        "--align-phone": phone_aling,}}>
        {text}
    </h1>
}

export function HeaderH2({
    text,
    color,
    font_weight = 400,
    pc_align = 'left',
    tablet_align = 'left',
    phone_aling = 'left',
})
{
    return (<h2 className="simple-header-h2" style={{
        color: color,
        fontWeight: font_weight,
        '--align-pc': pc_align,
        "--align-tablet": tablet_align,
        "--align-phone": phone_aling,
        
        }}>
        {text}
    </h2>)
}

export function HeaderH3({
    text,
    color,
    font_weight = 400,
    pc_align = 'left',
    tablet_align = 'left',
    phone_aling = 'left',
})
{
    return (
        <h3 className="simple-header-h3" style={{
            fontWeight: font_weight,
            color: color,
            '--align-pc': pc_align,
            "--align-tablet": tablet_align,
            "--align-phone": phone_aling,}}>
                {text}
        </h3>
    )
}

export function SimpleButton({
    onClick = null,
    add_class = "",
    children,
    type = "empty", // or filled
    style = null,
    disabled = 0
})
{
    return <button onClick={onClick} disabled={disabled} style={style} className={`simple-button ${add_class} simple-button-${type}`}> {children} </button>
}


export function SimpleParagraph({
    text = "",
    color = "black",
    fontWeight = 400,
    pc_align = 'left',
    tablet_align = 'left',
    phone_aling = 'left',
    add_class,
    fontSize = "var(--small)"
}){
    return <p className={`simple-paragraph ${add_class}`} style={{
        "--align-pc": pc_align,
        "--align-tablet": tablet_align,
        "--align-phone": phone_aling,
        color: color,
        fontWeight: fontWeight,
        fontSize: fontSize
    }}>
        {text}
    </p>
}

export function SimpleLink({
    link,
    text,
    add_class = "",
    tabIndex = 0
})
{
    const location = useLocation();
    const isActive = location.pathname === link;

    return <Link to={link} tabIndex={tabIndex} className={`simple-link ${add_class} ${isActive? 'active' : ''}`}>
        {text}
    </Link>
}

export function Pretty({
    text,
    marginLeft = 'auto',
    marginRight = 'auto',
    imgLeft = null,
    imgRight = null,
}){

    return <div
                style={{"--margin-right": marginRight,"--margin-left": marginLeft, }}
                className="simple-pretty">
                {imgLeft && <span className="simple-pretty-image">{imgLeft}</span>}
                <span>{text}</span>
                {imgRight && <span className="simple-pretty-image">{imgRight}</span>}    
            </div>
}


export function SimpleFaq({
    title = "",
    children,
    add_class = ""
}){
    
    const [open, setOpen] = useState(false);
    const body_ref = useRef();
    const positioner_ref = useRef();

    function toggleFaq()
    {
        setOpen(prev => !prev);
        if(open)
        {
            body_ref.current.style.height = "0px";
        }
        else
        {
            let height = positioner_ref.current.scrollHeight + 'px';
            body_ref.current.style.height = height;
        }

    }
    
    return( 
    <div className="simple-faq">
        <div className="simple-faq-header" onClick={toggleFaq}>
            <HeaderH2 text={title}/>
            <SlArrowDown className={`${open ? 'rotated' : ''}`}/>
        </div>
        <div className="simple-faq-content" ref={body_ref}>
            <Spacer height_pc={15}/>
            <SimpleLine/>
            <Spacer height_pc={10}/>
            {children}
        </div>

        <div className="simple-faq-content simple-faq-content-positioner" ref={positioner_ref}>
            <Spacer height_pc={15}/>
            <SimpleLine/>
            <Spacer height_pc={10}/>
            {children}
        </div>

    </div>)
}


export function SimpleLine({
    color = "var(--dark-green)"
}){

    return <div className="simple-line" style={{backgroundColor: color}}></div>

}   