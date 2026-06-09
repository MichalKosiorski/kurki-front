import { useEffect, useRef, useState } from "react";
import { HeaderH1, SimpleAbsoluteLoading, SimpleButton, SimpleLink, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import { SimpleError, SimpleInput, SimpleLabel } from "../../scaffolding/simple-form-elements";
import "./registration.css"
import { RiMailLine, RiLock2Line, RiPhoneLine,RiUser3Line, RiCalendar2Line } from "react-icons/ri";
import { useFetch } from "../../customHooks/useFetch";
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";
import { replace, useNavigate } from "react-router-dom";
import kur from "../../assets/kuraczny.png"
import { validatePassword } from "./helpers";


export default function RegisterPage(){

    //fetch
    const {data, status, loading, error, fetchData} = useFetch({});

    //links
    const {links} = useContext(AppContext);

    //navigation
    const navigate = useNavigate()

    //refs
    const loginRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const phoneRef = useRef();
    const passwordAgainRef = useRef();
    const birthOfDateRef = useRef();
    
    //states
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [usernameValue, setUsernameValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [dateOfBirthValue, setDateOfBirthValue] = useState("");
    const [passwordAgainValue, setPasswordAgainValue] = useState("");
    
    //errors
    const [emailError, setEmailError] = useState(null);
    const [dateOfBirthError, setDateOfBirthError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [passwordAgainError, setPasswordAgainError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    //navigation through form
    function goToPassword(){passwordRef?.current?.focus();}
    function goToEmail() {loginRef?.current?.focus()};
    function goToPhone() {phoneRef?.current?.focus()};
    function goToDateOfBirth() {birthOfDateRef?.current?.focus()};
    function goToUsername() {usernameRef?.current?.focus()};
    function goToAgainPassword() {passwordAgainRef?.current?.focus()};
    

    //check errors
    //run fetch 
    function handleSubmit(){


        //username validation
        if(usernameValue.trim() == "")
        {
            usernameRef?.current?.focus();
            setUsernameError("Pole nazwa użytkownika nie może być puste");
            return;
        }

        setUsernameError(null);

        //email validation
        if(emailValue.trim() == "")
        {
            loginRef?.current?.focus();
            setEmailError("Pole email nie może być puste");
            return;
        }
        const pattern = /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/gm;
        const isMatch = pattern.test(emailValue.trim());
        if(!isMatch){
            loginRef?.current?.focus();
            setEmailError("Nie wygląda to jak poprawny email. Chyba coś jest nie tak...");
            return;
        }

        setEmailError(null);

        //phone validation
        if(phoneValue.trim() == "")
        {
            phoneRef?.current?.focus();
            setPhoneError("Pole telefon nie może być puste");
            return;
        }
        const pattern_phone = /^(\+\d{11}|\d{9})$/;
        const match_phone = pattern_phone.test(phoneValue.trim());
        if(!match_phone){
            phoneRef?.current?.focus();
            setPhoneError("Nie wygląda to jak poprawny numer telefonu. Chyba coś jest nie tak...");
            return;
        }
        setPhoneError(null);


        //date of birth
        const date = new Date(dateOfBirthValue);
        const today = new Date();
        
        date.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        
        const isValid =
          dateOfBirthValue &&
          !Number.isNaN(date.getTime()) &&
          date <= today;

        if(!isValid)
        {
            birthOfDateRef?.current?.focus();
            setDateOfBirthError("Ta data wydaje się nie poprawna...");
            return;
        }
        setDateOfBirthError(null);

        //password
        if(passwordValue == "")
        {
            passwordRef?.current?.focus();
            setPasswordError("Pole hasło nie może być puste");
            return;
        }

        let res = validatePassword(passwordValue);
        if(!res.correct)
        {
            passwordRef?.current?.focus();
            setPasswordError(res.message);
            return;
            
        }
        setPasswordError(null);


        if(passwordAgainValue != passwordValue)
        {
            passwordAgainRef?.current?.focus();
            setPasswordAgainError("Hasła nie są takie same");
            return;
        }

        setPasswordAgainError(null);

        let body = {
            "username": usernameValue.trim(),
            "email": emailValue.trim(),
            "password": passwordValue,
            "dateOfBirth": dateOfBirthValue,
            "phoneNumber": phoneValue.trim()
        }

        console.log(body);

        fetchData("POST", "/auth/signup", body, null);
    }

    //if success go to account page
    useEffect(()=>{
        if(status == 'success'){
            navigate(`/verifyEmail?email=${encodeURIComponent(emailValue.trim())}`);
        }
    },[data, error, status, loading])

    return <main>
        <Spacer height_pc={100}/>
        <div className="grid-1-1">
            <div className="registration-left">
                <Spacer height_pc={20}/>
                <HeaderH1 text={"Zarejestruj się!"} pc_align="center" phone_aling="center" tablet_align="center" color={"var(--dark-green)"}/>
                <Spacer height_pc={10}/>
                <SimpleParagraph text="Jedna strona, jedno miejsce, miliony wspaniałych ludzi i jeszcze więcej ciekawych historii" pc_align="center" phone_aling="center" tablet_align="center"/>
                <Spacer height_pc={20}/>
                <img src={kur} alt="ozbodnik rejestracji" style={{width: "60%", height: "auto", transform: "scaleX(-1)"}}/>
                <Spacer height_pc={20}/>
            </div>
            <div className="registration-right">
                {loading && <SimpleAbsoluteLoading/>}
                
                <SimpleLabel forWho="username-field" text={"Nazwa użytkownika* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"username-field"} value={usernameValue} onChange={setUsernameValue} name="username-field" type={"text"} ref={usernameRef} onEnter={goToEmail} onDown={goToEmail} svg={<RiUser3Line/>} placeholder="Podaj nazwę użytkownika"/>
                {usernameError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={usernameError}/>
                </>}
                <Spacer height_pc={25}/>

                <SimpleLabel forWho="email-field" text={"Email* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"email-field"} value={emailValue} onUp={goToUsername} onChange={setEmailValue} name="email-field" type={"text"} ref={loginRef} onEnter={goToPhone} onDown={goToPhone} svg={<RiMailLine/>} placeholder="Podaj email"/>
                {emailError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={emailError}/>
                </>}
                <Spacer height_pc={25}/>

                <SimpleLabel forWho="phone-field" text={"Telefon* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"phone-field"} value={phoneValue} onUp={goToEmail} onChange={setPhoneValue} name="phone-field" type={"text"} ref={phoneRef} onEnter={goToDateOfBirth} onDown={goToDateOfBirth} svg={<RiPhoneLine/>} placeholder="Podaj telefon"/>
                {phoneError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={phoneError}/>
                </>}
                <Spacer height_pc={25}/>

                <SimpleLabel forWho="dob-field" text={"Rok urodzenia* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"dob-field"} onUp={goToPhone} value={dateOfBirthValue} onChange={setDateOfBirthValue} name="dob-field" type={"date"} ref={birthOfDateRef} onEnter={goToPassword} onDown={goToPassword} svg={<RiCalendar2Line/>} placeholder="Podaj datę urodzenia"/>
                {dateOfBirthError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={dateOfBirthError}/>
                </>}
                <Spacer height_pc={25}/>

                <SimpleLabel forWho="password-field" text={"Hasło* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"password-field"} value={passwordValue} onChange={setPasswordValue} onUp={goToDateOfBirth} onDown={goToAgainPassword} name="password-field" type={"password"} ref={passwordRef} svg={<RiLock2Line/>} placeholder="Podaj hasło"/>
                {passwordError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={passwordError}/>
                </>}
                <Spacer height_pc={25}/>

                <SimpleLabel forWho="password2-field" text={"Powtórz hasło* :"}/>
                <Spacer height_pc={10}/>
                <SimpleInput id_param={"password2-field"} value={passwordAgainValue} onChange={setPasswordAgainValue} onUp={goToPassword} name="dob-field" type={"password"} ref={passwordAgainRef} onEnter={handleSubmit} svg={<RiLock2Line/>} placeholder="Powtórz hasło"/>
                {passwordAgainError && <>
                    <Spacer height_pc={5}/>
                    <SimpleParagraph color="var(--error)" text={passwordAgainError}/>
                </>}
                <Spacer height_pc={30}/>
                
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    
                    <SimpleButton style={{width: "100%"}} type="filled" onClick={handleSubmit}> Zarejestruj się </SimpleButton>
                    <span style={{fontSize: "var(--small-plus)"}}> Masz już konto? <SimpleLink text={"Zaloguj sie!"} link={links.login.link}/></span>
                    
                </div>
                {error && <SimpleError errorData={error}/>}


            </div>
        </div>
        <Spacer height_pc={160}/>
    </main>
}