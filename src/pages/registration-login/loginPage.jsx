import { useRef } from "react";
import { HeaderH1, SimpleButton, Spacer } from "../../scaffolding/simple-elements";
import { SimpleInput } from "../../scaffolding/simple-form-elements";
import "./registration.css"
import { RiMailLine } from "react-icons/ri";


export default function LoginPage(

){

    const loginRef = useRef();

    return <main>
        <Spacer height_pc={100}/>
        <div className="grid-1-1">
            <div className="registration-left">
                <Spacer height_pc={20}/>
                <HeaderH1 text={"Zaloguj się!"} pc_align="center" phone_aling="center" tablet_align="center" color={"var(--dark-green)"}/>
                <Spacer height_pc={20}/>
            </div>
            <div className="registration-right">
                <Spacer height_pc={20}/>
                <SimpleInput ref={loginRef} svg={<RiMailLine/>} placeholder="Podaj email"/>
            </div>
        </div>
        <Spacer height_pc={160}/>
    </main>
}