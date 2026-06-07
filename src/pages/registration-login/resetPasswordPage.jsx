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
import { validatePassword } from "./registerPage";


export function ResetPasswordPage(){

    //fetch
    const {data, status, loading, error, fetchData} = useFetch({});
    const {data: dataReset, status: statusReset, loading: loadingReset, error: errorReset, fetchData: fetchDataReset} = useFetch({});

    //phase
    //first - sending verification code
    //second - restarting password
    const [phase, setPhase] = useState("first");

    //input values
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordAgainValue, setPasswordAgainValue] = useState("");
    
    //refs
    const loginRef = useRef();
    const passwordRef = useRef();
    const passwordAgainRef = useRef();

    //navigate
    const navigate = useNavigate();

    //errors
    const [emailError, setEmailError] = useState(null);
    const [passwordAgainError, setPasswordAgainError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    function goToPassword(){passwordRef?.current?.focus();}
    function goToEmail() {loginRef?.current?.focus()};
    function goToAgainPassword() {passwordAgainRef?.current?.focus()};

    function handeSendCode()
    {
        if(emailValue.trim() == "")
        {
            loginRef?.current?.focus();
            setEmailError("Pole email nie może być puste");
            return;
        }

        if(!checkMailPattern(emailValue.trim()))
        {
            loginRef?.current?.focus();
            setEmailError("Podany email wydaje się niepoprawny...");
            return;
        }

        setEmailError(null);

        let body = {
            "email": emailValue.trim()
        }
    
        fetchData("POST", "/auth/forgot-password", body, null);

    }

    useEffect(()=>{

        if(status == "success"){
            setPhase("second");
        }

    }, [data, error, status, loading])


    //code
    //--------------------------------------------------------
    //refs
    const digit0Ref = useRef();
    const digit1Ref = useRef();
    const digit2Ref = useRef();
    const digit3Ref = useRef();
    const digit4Ref = useRef();
    const digit5Ref = useRef();
 
    const refs = [digit0Ref, digit1Ref, digit2Ref, digit3Ref, digit4Ref, digit5Ref];
     
    //states
    const [digit1, setDigit1] = useState("");
    const [digit2, setDigit2] = useState("");
    const [digit3, setDigit3] = useState("");
    const [digit4, setDigit4] = useState("");
    const [digit5, setDigit5] = useState("");
    const [digit6, setDigit6] = useState("");
 
    const setDigits = [setDigit1, setDigit2, setDigit3, setDigit4, setDigit5, setDigit6];
    const digits = [digit1, digit2, digit3, digit4, digit5, digit6];
    const [codeError, setCodeError] = useState(null);

    function goToCode(){digit0Ref?.current?.focus();};
    //----------------------------------------------------------


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

    function handleChange()
    {
        if(!checkMail())
            return;

        let res = validatePassword(passwordValue);
        if(!res.correct){
            setPasswordError(res.message);
            return;
        }

        setPasswordError(null);

        if(passwordAgainValue != passwordValue){
            setPasswordAgainError("Hasła nie są takie same.")
            return;
        }

        setPasswordAgainError(null);

        let code = String(digit1) + String(digit2) + String(digit3) + String(digit4) + String(digit5) + String(digit6);
        if(code.length != 6)
        {
            setCodeError("Ten kod wydaje się niepoprawny...");
            return;
        }

        setCodeError(null);

        let body = {
            "email": emailValue.trim(),
            "verificationCode": code,
            "newPassword": passwordValue
        }

        console.log(body);
        
        fetchDataReset("POST", "/auth/reset-password", body, null);
    }

    useEffect(()=>{

        if(statusReset == 'success'){
            navigate(`/success?email=${encodeURIComponent(emailValue)}&type=password`, {replace: true});
        }

    }, [dataReset, statusReset, loadingReset, errorReset])

    function checkMail()
    {
        if(emailValue.trim() == "")
            {
                loginRef?.current?.focus();
                setEmailError("Pole email nie może być puste");
                return false;
            }
    
            if(!checkMailPattern(emailValue.trim()))
            {
                loginRef?.current?.focus();
                setEmailError("Podany email wydaje się niepoprawny...");
                return false;
            }
    
            setEmailError(null);
            return true;
    }

    return <main>
        {(loading || loadingReset) && <SimpleFixedLoading/>}
        <Spacer height_pc={100}/>
        <div className="grid-1-1">
            <div className="registration-left">
                <Spacer height_pc={20}/>
                <HeaderH1 text={"Restartowanie hasła!"} pc_align="center" phone_aling="center" tablet_align="center" color={"var(--dark-green)"}/>
                <Spacer height_pc={10}/>
                {phase == "first" && <SimpleParagraph text="Podaj swój adres email. Wyślemy na niego kod, który pozwoli ci zrestartować hasło" pc_align="center" phone_aling="center" tablet_align="center"/>}
                {phase == "second" && <SimpleParagraph text='Wysłaliśmy kod na twój email. Nie przyszedł? Prześlij jeszcze raz przyciskiem "Prześlij kod ponownie"' pc_align="center" phone_aling="center" tablet_align="center"/>}
                <Spacer height_pc={20}/>
            </div>
            <div className="registration-right">
              
            <SimpleLabel forWho="email-field" text={"Email* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"email-field"} value={emailValue} onChange={setEmailValue} name="email-field" type={"text"} ref={loginRef} svg={<RiMailLine/>} placeholder="Podaj email"/>
                {emailError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={emailError}/>
                </>}
                <Spacer height_pc={25}/>
                <SimpleButton type="filled" onClick={handeSendCode} style={{width: "100%"}}> {phase == "first" ? "Wyślij kod weryfikacyjny" : "Prześlij kod weryfikacyjny ponownie"} </SimpleButton>
                {error && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={"Coś poszło nie tak... Być może podany adres email nie jest poprawny?"}/>
                </>}
            </div>
        </div>
        {phase == "second" && <Spacer height_pc={40}/>}
        {phase == "second" && 
        <div className="grid-1-1">
            <div className="registration-right">
            <SimpleLabel forWho="password-field" text={"Hasło* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"password-field"} value={passwordValue} onChange={setPasswordValue} onUp={goToEmail} onDown={goToAgainPassword} name="password-field" type={"password"} ref={passwordRef} svg={<RiLock2Line/>} placeholder="Podaj hasło"/>
                {passwordError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={passwordError}/>
                </>}
                <Spacer height_pc={25}/>

                <SimpleLabel forWho="password2-field" text={"Powtórz hasło* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"password2-field"} value={passwordAgainValue} onChange={setPasswordAgainValue} onUp={goToPassword} name="dob-field" type={"password"} ref={passwordAgainRef} onEnter={goToCode} onDown={goToCode} svg={<RiLock2Line/>} placeholder="Powtórz hasło"/>
                {passwordAgainError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={passwordAgainError}/>
                </>}
            </div>
            <div className="registration-right" style={{
                display: "flex",
                justifyContent: "end",
                flexDirection: "column"
            }}>
                <span>
                <SimpleLabel forWho="password-field" text={"Podaj kod zmiany hasła* :"}/>
                <Spacer height_pc={10}/>
                <div style={{display: "flex", gap: "5px"}}>
                    <SimpleDigitInput id_param={"digit-1"} name={"digit-1"} ref={digit0Ref} value={digit1} order={0} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-2"} name={"digit-2"} ref={digit1Ref} value={digit2} order={1} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-3"} name={"digit-3"} ref={digit2Ref} value={digit3} order={2} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-4"} name={"digit-4"} ref={digit3Ref} value={digit4} order={3} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-5"} name={"digit-5"} ref={digit4Ref} value={digit5} order={4} onBackspace={handleBackspace} onChange={handlePasteValue}/>
                    <SimpleDigitInput id_param={"digit-6"} name={"digit-6"} ref={digit5Ref} value={digit6} order={5} onBackspace={handleBackspace} onChange={handlePasteValue}/>   
                </div>
                </span>
                {codeError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={codeError}/>
                </>}
                <Spacer height_pc={30}/>
                <SimpleButton style={{width: "100%"}} type="filled" onClick={handleChange}> Zmień hasło </SimpleButton>
                {errorReset && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={"Wygląda na to, że coś poszło nie tak... Sprawdź poprawność wpisanych danych"}/>
                </>}
            </div>
        </div>}
        <Spacer height_pc={160}/>
    </main>
}