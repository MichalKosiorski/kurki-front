import "./menu.css";
import { SimpleImage, SimpleFlexCentered, HeaderH2, SimpleButton, SimpleLink } from "../scaffolding/simple-elements";
import kur from "./../assets/kur_filled.png"
import { SlArrowDown } from "react-icons/sl";
import { useContext, useEffect, useRef, useState } from "react";
import { useWindowWidth } from "../utils/useWindowWidth";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../utils/loginUtils";


export function MainMenu({})
{
    const {links} = useContext(AppContext);
    const user_data = getLocalUser();

    const navigation_element = [
        {name: links.main.name, link: links.main.link},
        {name: links.forum.name, link: links.forum.link},
        {name: links.encyclopedy.name, link: links.encyclopedy.link},
        {name: links.contact.name, link: links.contact.link},
        {name: links.about_us.name, link: links.about_us.link},
    ]

    const navigate = useNavigate();

    //states
    const [open, SetOpen] = useState(false);

    //refs
    const positioner_ref = useRef();
    const middle_ref = useRef();

    function toggleMenu()
    {
        SetOpen(prev => !prev);
        if(open)
            closeMenu();
        else
            openMenu();
    }

    function openMenu()
    {
        if(!positioner_ref || !middle_ref)
            return;

        const height = positioner_ref.current.scrollHeight;
        middle_ref.current.style.setProperty('--menu-height', height+'px');
    }

    function closeMenu()
    {
        if(!middle_ref)
            return;

        middle_ref.current.style.setProperty('--menu-height','0px');
    }

    useEffect(()=>{
        closeMenu();
    },[])

    return (
        <nav className="menu">
            <SimpleFlexCentered add_class={"menu-left"}>
                <SimpleImage src={kur} alt={"baner"}/>
                <HeaderH2 text={"Forum Entuzjastów \nKurzych"} color={"var(--yellow)"}/>
            </SimpleFlexCentered>
            <div className="menu-middle" ref={middle_ref}>
                <div className="menu-middle-upper"></div>
                {navigation_element.map((element, index)=>(<span key={index} className={`menu-link`}>
                    <SimpleLink text={element.name} link={element.link}/>
                </span>))}
                <div className="menu-middle-bottom"></div>
            </div>


            <div className="menu-middle menu-middle-positioner" ref={positioner_ref}>
                <div className="menu-middle-upper"></div>
                {navigation_element.map((element, index)=>(<span key={index} className={`menu-link`}>
                    <SimpleLink text={element.name} link={element.link} tabIndex={-1}/>
                </span>))}
                <div className="menu-middle-bottom"></div>
            </div>



            <div className="menu-right">
                <SimpleButton type="filled" onClick={user_data?.token ? ()=>{navigate(links.account.link)} : ()=>{navigate(links.login.link)}}>
                    {user_data?.token ? links.account.name : links.login.name}
                </SimpleButton>
                <SlArrowDown onClick={toggleMenu} className={`menu-arrow ${open ? 'rotated' : ''}`}/>
            </div>
        </nav>
    )
} 