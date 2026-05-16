import { HeaderH1, SimpleButton, Spacer } from "../../scaffolding/simple-elements";
import "./registration.css"

export default function LoginPage(

){
    return <main>
        <Spacer height_pc={100}/>
        <div className="grid-1-1">
            <div className="registration-left">
                <Spacer height_pc={20}/>
                <HeaderH1 text={"Zaloguj się!"} pc_align="center" phone_aling="center" tablet_align="center" color={"var(--dark-green)"}/>
                <Spacer height_pc={20}/>
            </div>
        </div>
        <Spacer height_pc={160}/>
    </main>
}