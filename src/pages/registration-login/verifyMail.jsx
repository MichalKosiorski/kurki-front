import { useEffect, useRef, useState } from "react";
import { HeaderH1, SimpleAbsoluteLoading, SimpleButton, SimpleFixedLoading, SimpleLink, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import { SimpleDigitInput, SimpleInput, SimpleLabel } from "../../scaffolding/simple-form-elements";
import "./registration.css"
import { RiMailLine, RiLock2Line  } from "react-icons/ri";
import { useFetch } from "../../customHooks/useFetch";
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";
import { replace, useNavigate, useSearchParams } from "react-router-dom";
import { checkMailPattern } from "./helpers";


export default function VerifyMailPage(){


    //search params
    const [searchParams] = useSearchParams();
    const emailSearch = searchParams.get("email");
    const [emailParam, setEmailParam] = useState(null);

    //fetch
    const {data, status, loading, error, fetchData} = useFetch({});
    const {data: dataVerify, status: statusVerify, loading: loadingVerify, error: errorVerify, fetchData: fetchDataVerify} = useFetch({});

    //links
    const {links} = useContext(AppContext);

    //navigation
    const navigate = useNavigate()

    //refs
    const loginRef = useRef();
    const digit0Ref = useRef();
    const digit1Ref = useRef();
    const digit2Ref = useRef();
    const digit3Ref = useRef();
    const digit4Ref = useRef();
    const digit5Ref = useRef();

    const refs = [digit0Ref, digit1Ref, digit2Ref, digit3Ref, digit4Ref, digit5Ref];
    
    //states
    const [emailValue, setEmailValue] = useState("");
    const [digit1, setDigit1] = useState("");
    const [digit2, setDigit2] = useState("");
    const [digit3, setDigit3] = useState("");
    const [digit4, setDigit4] = useState("");
    const [digit5, setDigit5] = useState("");
    const [digit6, setDigit6] = useState("");

    const setDigits = [setDigit1, setDigit2, setDigit3, setDigit4, setDigit5, setDigit6];
    const digits = [digit1, digit2, digit3, digit4, digit5, digit6]

    //errors
    const [emailError, setEmailError] = useState(null);
    const [codeError, setCodeError] = useState(null);

    //check errors
    //run fetch 
    function handleSubmit(){

        if(loading || loadingVerify)
            return;

        if(emailSearch == null)
        {
           if(emailValue.trim() == "")
            {
                loginRef?.current?.focus();
                setEmailError("Email nie może być pusty")
                return;
            }
        
            if(!checkMailPattern(emailValue.trim()))
            {
                loginRef?.current?.focus();
                setEmailError("Wygląda na to, że to nie jest poprawny adres email...")
                return;
            }
            setEmailError(null);
        }
        
        let code = String(digit1) + String(digit2) + String(digit3) + String(digit4) + String(digit5) + String(digit6);
        if(code.length != 6){

            setCodeError("To nie jest poprawny kod weryfikacyjny");
            return;
        }
        
        let emailSender = emailValue.trim();
        if(emailSearch != null && emailSearch != "")
            emailSender = emailParam.trim();

        if(!checkMailPattern(emailSender)){
            navigate("/verifyEmail", {replace: true});
            window.location.reload();
            return;
        }

        let body = {
            "email": emailSender,
            "verificationCode": code
        }

        console.log(body);

        fetchDataVerify("POST", "/auth/verify", body, null);

    }

    //this makes pasting code looks nice
    function handlePasteValue(value, position) {

        const clean = value.replace(/\D/g, "").split("");
        if(clean.length == 0 ) return;
        
        let lastIndex = position;
        for (let i = 0; i < clean.length; i++) {
            const idx = position + i;
    
            if (idx >= setDigits.length) break;
    
            setDigits[idx](clean[i]);
            lastIndex = idx;
        }
    
        const next = lastIndex + 1;
    
        if (next < refs.length) {
            refs[next].current?.focus();
        } 
        else {
            refs[refs.length - 1].current?.focus();
        }
    }

    //handle backspace in code
    function handleBackspace(value, position) {

        if (value !== "") {
            setDigits[position]("");
            if (position === 0) return;    
            const prev = position - 1;
            refs[prev].current?.focus();
            return;
        }
    
        if (position === 0) return;
        const prev = position - 1;
        refs[prev].current?.focus();
    
        if (digits[prev] !== "") {
            setDigits[prev]("");
        }
    }

    //if success go to success page
    useEffect(()=>{
        
        console.log(dataVerify, errorVerify, statusVerify, loadingVerify);
        if((statusVerify == 'success') || (statusVerify == "error" && dataVerify?.message == "Account verified successfully")){

            let emailS = emailParam;
            if(emailSearch == null || emailSearch == "")
                emailS = emailValue;

            navigate(`/success?email=${encodeURIComponent(emailS)}&type=email`, {replace: true});
        }

        
    },[dataVerify, errorVerify, statusVerify, loadingVerify])

    useEffect(()=>{
        if(emailSearch && emailSearch != ""){
            setEmailParam(emailSearch);
        }
    },[])


    function hanldeChangeMail()
    {
        if(emailValue.trim() == "")
        {
            loginRef?.current?.focus();
            setEmailError("Nowy email nie może być pusty")
            return;
        }

        if(!checkMailPattern(emailValue.trim()))
        {
            loginRef?.current?.focus();
            setEmailError("Wygląda na to, że to nie jest poprawny adres email...")
            return;
        }

        setEmailError(null);

        setEmailParam(emailValue.trim());

    }

    function handleResend()
    {   
        if(loading || loadingVerify)
            return;

        let end = `/auth/resend?email=${encodeURIComponent(emailParam)}`;
        fetchData("POST", end, null, null);
    }

    return <main>
        {(loading || loadingVerify) && <SimpleFixedLoading/>}
        <Spacer height_pc={100}/>
        <div className="grid-1-1">
            <div className="registration-left">
                <Spacer height_pc={20}/>
                <HeaderH1 text={"Zweryfikuj mail!"} pc_align="center" phone_aling="center" tablet_align="center" color={"var(--dark-green)"}/>
                <Spacer height_pc={10}/>
                {emailParam && <>
                    <SimpleParagraph pc_align="center" phone_aling="center" tablet_align="center" text={`Na mail:`}/>
                    <Spacer height_pc={5}/>
                    <span style={{display: "block", fontSize: "var(--small-plus)", fontWeight: "600"}}>{emailParam}</span>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph text="wysłaliśmy Ci kod weryfikacyjny. Podaj ten kod i kliknij przycisk zweryfikuj" pc_align="center" phone_aling="center" tablet_align="center"/>
                    <SimpleParagraph text="Kod nie dotarł na Twój adres?" pc_align="center" phone_aling="center" tablet_align="center"/>
                    <Spacer height_pc={10}/>
                    <SimpleButton type="filled" onClick={handleResend}>Wyślij ponownie</SimpleButton>
                    {status == "error" && <>
                        <Spacer height_pc={15}/>
                        <SimpleParagraph color="var(--error)" text={"Coś poszło nie tak... Być może podany został zły email... Któż to może wiedzieć?"}/>
                    </>}
                    
                    {status == "success" && <>
                        <Spacer height_pc={15}/>
                        <SimpleParagraph color="var(--light-green)" text={"Kod został wysłany ponownie"}/>
                    </>}

                    <Spacer height_pc={40}/>
                    <SimpleParagraph pc_align="center" phone_aling="center" tablet_align="center" text="Powyższy mail nie jest twój? Podaj poniżej poprawny: "/>
                    <Spacer height_pc={10}/>
                    <SimpleInput id_param={"email-field"} value={emailValue} onChange={setEmailValue} name="email-field" type={"text"} ref={loginRef} svg={<RiMailLine/>} placeholder="Podaj email..."/>
                    {emailError && <>
                        <Spacer height_pc={5}/>
                        <SimpleParagraph color="var(--error)" text={emailError}/>
                    </>}
                    <Spacer height_pc={10}/>
                    <SimpleButton type="filled" onClick={hanldeChangeMail}>Zmień mail</SimpleButton>
                </>}

                {emailParam == null && <>
                    <Spacer height_pc={10}/>
                    <SimpleLabel forWho="email-field" text={"Email* :"}/>
                    <Spacer height_pc={10}/>
                    <SimpleInput id_param={"email-field"} value={emailValue} onChange={setEmailValue} name="email-field" type={"text"} ref={loginRef} svg={<RiMailLine/>} placeholder="Podaj email..."/>
                    {emailError && <>
                        <Spacer height_pc={5}/>
                        <SimpleParagraph color="var(--error)" text={emailError}/>
                    </>}
                </>
                }
                <Spacer height_pc={20}/>



            </div>
            <div className="registration-left">
                <Spacer height_pc={25}/>
                <SimpleLabel forWho="password-field" text={"Podaj kod weryfikacyjny* :"}/>
                <Spacer height_pc={10}/>
                <div style={{display: "flex", gap: "5px"}}>
                    <SimpleDigitInput id_param={"digit-1"} name={"digit-1"} ref={digit0Ref} value={digit1} order={0} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-2"} name={"digit-2"} ref={digit1Ref} value={digit2} order={1} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-3"} name={"digit-3"} ref={digit2Ref} value={digit3} order={2} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-4"} name={"digit-4"} ref={digit3Ref} value={digit4} order={3} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-5"} name={"digit-5"} ref={digit4Ref} value={digit5} order={4} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-6"} name={"digit-6"} ref={digit5Ref} value={digit6} order={5} onBackspace={handleBackspace} onChange={handlePasteValue}/>   
                </div>
                {codeError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={codeError}/>
                </>}
                <Spacer height_pc={30}/>
                <SimpleButton style={{width: "100%"}} type="filled" onClick={handleSubmit}> Zweryfikuj </SimpleButton>
                {errorVerify && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={
                        dataVerify?.message == "Account verified successfully" ? "To konto jest już zweryfikowane" :
                        "Wygląda na to, że coś poszło nie tak... Być może kod jest zły?"
                        }/>
                </>}

            </div>
        </div>
        <Spacer height_pc={160}/>
    </main>
}