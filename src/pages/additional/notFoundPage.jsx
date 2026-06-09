import { useNavigate } from "react-router-dom";
import straz from "../../assets/KurzyStrażnik.png";
import { HeaderH1, SimpleButton, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";

export function NotFoundPage(){

    const navigate = useNavigate();

    function handleReturn(){
        navigate("/", {replace: true});
    }

    return <main>
        <Spacer height_pc={30}/>
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px"
            }}
        >
            <HeaderH1 color={"var(--dark-green)"} text={"404"}/>
            <SimpleParagraph pc_align="center" tablet_align="center" phone_aling="center" 
            text="A cóż to? A kto to tu przyszedł? Przecież takiej strony nie ma. Ty gagatku." 
            fontSize="var(--small-plus)"/>
            <img 
                style={{
                    width: "100px",
                    height: "auto"
                }}
            src={straz} alt="A gdzie to się chodzi?"/>
            <Spacer height_pc={20}/>
            <SimpleButton onClick={handleReturn} type="empty">Wróć na stronę główną</SimpleButton>

        </div>
        <Spacer height_pc={120}/>
    </main>
}