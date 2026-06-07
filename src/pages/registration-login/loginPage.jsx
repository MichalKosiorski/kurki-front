import { useEffect, useRef, useState } from "react";
import { HeaderH1, SimpleAbsoluteLoading, SimpleButton, SimpleLink, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import { SimpleInput, SimpleLabel } from "../../scaffolding/simple-form-elements";
import "./registration.css"
import { RiMailLine, RiLock2Line  } from "react-icons/ri";
import { useFetch } from "../../customHooks/useFetch";
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";
import { replace, useNavigate, useSearchParams } from "react-router-dom";


export default function LoginPage(){

    //fetch
    const {data, status, loading, error, fetchData} = useFetch({});

    //links
    const {links} = useContext(AppContext);

    //search params
    const [searchParams] = useSearchParams();
    const emailSearch = searchParams.get("email");

    //navigation
    const navigate = useNavigate()

    //refs
    const loginRef = useRef();
    const passwordRef = useRef();
    
    //states
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    //errors
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    function goToPassword()
    {
        passwordRef?.current?.focus();
    }

    function goToEmail()
    {
        loginRef?.current?.focus();
    }

    //check errors
    //run fetch 
    function handleSubmit(){

        if(emailValue.trim() == "")
        {
            loginRef?.current?.focus();
            setEmailError("Pole email nie może być puste");
            return;
        }

        setEmailError(null);

        if(passwordValue == "")
        {
            passwordRef?.current?.focus();
            setPasswordError("Pole hasło nie może być puste");
            return;
        }

        setPasswordError(null);

        let body = {
            "email": emailValue.trim(),
            "password": passwordValue
        }

        fetchData("POST", "/auth/login", body, null);

    }

    //if success go to account page
    useEffect(()=>{
        if(status == 'success'){
            navigate(links.account.link, {replace: true})
            window.localStorage.setItem("user", JSON.stringify(data));
        }
    },[data, error, status, loading])

    useEffect(()=>{

        if(emailSearch != null && emailSearch != "")
        {
            setEmailValue(emailSearch);
        }

    },[])

    return <main>
        <Spacer height_pc={100}/>
        <div className="grid-1-1">
            <div className="registration-left">
                <Spacer height_pc={20}/>
                <HeaderH1 text={"Zaloguj się!"} pc_align="center" phone_aling="center" tablet_align="center" color={"var(--dark-green)"}/>
                <Spacer height_pc={10}/>
                <SimpleParagraph text="Jedna strona, jedno miejsce, miliony wspaniałych ludzi i jeszcze więcej ciekawych historii" pc_align="center" phone_aling="center" tablet_align="center"/>
                <Spacer height_pc={20}/>
            </div>
            <div className="registration-right">
                {loading && <SimpleAbsoluteLoading/>}
                <SimpleLabel forWho="email-field" text={"Email* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"email-field"} value={emailValue} onChange={setEmailValue} name="email-field" type={"text"} ref={loginRef} onEnter={goToPassword} onDown={goToPassword} svg={<RiMailLine/>} placeholder="Podaj email"/>
                {emailError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={emailError}/>
                </>}
                <Spacer height_pc={25}/>
                <SimpleLabel forWho="password-field" text={"Hasło* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"password-field"} value={passwordValue} onChange={setPasswordValue} onUp={goToEmail} name="password-field" type={"password"} ref={passwordRef} svg={<RiLock2Line/>} placeholder="Podaj hasło"/>
                {passwordError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={passwordError}/>
                </>}
                <Spacer height_pc={5}/>
                <span style={{fontSize: "var(--small-plus)"}}> Nie pamiętasz hasła? <SimpleLink text={"Zrestartuj hasło!"} link={links.remindPassword.link}/></span>
                <Spacer height_pc={30}/>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    
                    <SimpleButton style={{width: "100%"}} type="filled" onClick={handleSubmit}> Zaloguj się </SimpleButton>
                    <span style={{fontSize: "var(--small-plus)"}}> Nie masz konta? <SimpleLink text={"Zarejestruj sie!"} link={links.register.link}/></span>
                    
                </div>
                {error && <>
                    <Spacer height_pc={10}/>
                    <SimpleParagraph color="var(--error)" text={"Niepoprawne dane logowania"}/>
                </>}


            </div>
        </div>
        <Spacer height_pc={160}/>
    </main>
}