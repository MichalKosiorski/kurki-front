import { useNavigate, useSearchParams } from "react-router-dom";
import { HeaderH1, SimpleButton, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";

export function SuccessPage()
{
    const [searchParams] = useSearchParams();
    const emailSearch = searchParams.get("email");
    const typeSearch = searchParams.get("type");
    const navigate = useNavigate();

    function handleGoToLogin()
    {
        let linktogo = "/login"
        if(emailSearch != null && emailSearch != "")
        {
            linktogo = `/login?email=${encodeURIComponent(emailSearch)}`
        }
        navigate(linktogo, {replace: true});
    }

    return <main>
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Spacer height_pc={100}/>
            <HeaderH1 text={"Udało się!"} pc_align="center" phone_aling="center" tablet_align="center" color={"var(--dark-green)"} />
            {(typeSearch == "email" || typeSearch == null || typeSearch == "") && <>
                <Spacer height_pc={20}/>
                <SimpleParagraph text="Twój adres email został poprawnie zweryfikowany! Możesz się już zalogować na swoje konto!" pc_align="center" phone_aling="center" tablet_align="center"/>
                             
            </>}

            {(typeSearch == "password") && <>
                <Spacer height_pc={20}/>
                <SimpleParagraph text="Twoje hasło zostało poprawnie zmienione! Możesz za jego pomocą zalogować się na swoje konto!" pc_align="center" phone_aling="center" tablet_align="center"/>
                             
            </>}

            <Spacer height_pc={30}/>
            <SimpleButton type="filled" onClick={handleGoToLogin}> Przejdź do logowania </SimpleButton>   
            
        </div>
        <Spacer height_pc={160}/>
    </main>
}