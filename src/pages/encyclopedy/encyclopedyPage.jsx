import { HeaderH1, HeaderH2, Pretty, SimpleButton, SimpleFixedLoading, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import { useFetch } from "../../customHooks/useFetch";
import {useEffect, useRef, useState } from "react";
import { SimpleError, SimpleInput, SimpleLabel, SimpleTextarea } from "../../scaffolding/simple-form-elements";
import { EncyclopedyItem } from "./enItem";

export function EncyclopedyPage(){

    const {data, status, loading, error, fetchData} = useFetch({});
    const {data: dataAdd, status: statussAdd, loading: loadingAdd, error: errorAdd, fetchData: fetchDataAdd} = useFetch({});
    const user = JSON.parse(localStorage.getItem("user-data"));
    const token_data = JSON.parse(localStorage.getItem("user"));

    //states
    const [nameValue, setNameValue] = useState("");
    const [descValue, setDescValue] = useState("");

    //errors
    const [nameError, setNameError] = useState(null);
    const [descError, setDescError] = useState(null);

    //refs
    const nameRef = useRef();
    const descRef = useRef();

    useEffect(()=>{

        refreshRaces();

    },[])

    function refreshRaces()
    {
        fetchData("GET", "/races", null, token_data?.token);
    }

    useEffect(()=>{
        console.log(data);
    },[data, error, loading, status])

    function handleAdd()
    {
        if(nameValue.trim() == ""){
            setNameError("Nazwa dodawanej rasy nie może być pusta");
            nameRef?.current?.focus();
            return;
        }

        setNameError(null);

        if(descValue.trim() == ""){
            setDescError("Opis dodawanej rasy nie może być pusty");
            descRef?.current?.focus();
            return;
        }

        setDescError(null);


        let body = {
            "race": nameValue.trim(),
            "description": descValue.trim()
          }

        fetchDataAdd("POST", "/races", body, token_data?.token);

    }

    useEffect(()=>{
        if(statussAdd == "success")
        {
            refreshRaces();
            setDescValue("");
            setNameValue("");
        }
            
    },[statussAdd])

    return <main>
        {(loading || loadingAdd) && <SimpleFixedLoading/>}
        <Spacer height_pc={40}/>
        <Pretty text={"Dowiesz się niesamowitych rzeczy!"}/>
        <Spacer height_pc={20}/>
        <HeaderH1
            color={'var(--dark-green)'}
            text={"Encyklopedia Ras Kurzych"}
            font_weight={800} pc_align="center"
            phone_aling="center"
            tablet_align="center"/>
        <Spacer height_pc={50}/>

        {user?.role == "ROLE_MODERATOR" && <>
            
            <div className="grid-1-1">
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                    <HeaderH2 text={"Dodawanie nowej rasy do encyklopedii:"} font_weight={600} pc_align="center" phone_aling="center" tablet_align="center" font_size="small-plus" color={"var(--dark-green)"}/>
                    <Spacer height_pc={30}/>
                    <SimpleButton type="filled" onClick={handleAdd}> Dodaj rasę</SimpleButton>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}>
                    <SimpleLabel text={"Nazwa rasy: "}/>
                    <SimpleInput ref={nameRef} value={nameValue} onChange={setNameValue} placeholder="Podaj nazwę..."/>
                    {nameError && <>
                        <SimpleParagraph color="var(--error)" text={nameError}/>
                    </>}
                    <SimpleLabel text={"Opis rasy: "} /> 
                    <SimpleTextarea ref={descRef} value={descValue} onChange={setDescValue} maxLength={255} placeholder="Podaj opis..."/>
                    {descError && <>
                        <SimpleParagraph color="var(--error)" text={descError}/>
                    </>}
                </div>
            </div>
            {statussAdd == "success" && <>
                <Spacer height_pc={20}/>
                <SimpleParagraph text="Rasa została dodana pomyślnie" color="var(--dark-green)"/>
            </>}
            {statussAdd == "error" && <>
                <Spacer height_pc={20}/>
                <SimpleError errorData={errorAdd}/>
            </>}
            <Spacer height_pc={20}/>
            
                   
        </>}

        {data && data.length > 0 && <div style={{display: "flex", flexDirection:"column", gap: "20px"}}>
            {data.map((item, index)=>(<EncyclopedyItem key={index} onRefresh={refreshRaces} item_data={item} current_user={user} token={token_data?.token}/>))}
        </div>}
        {data && data.length == 0 && "Ojej! Encyklopedia jest pusta :("}

        <Spacer height_pc={160}/> 
    </main>
}