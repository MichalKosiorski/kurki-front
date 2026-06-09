import { useEffect, useRef, useState } from "react";
import { SimpleAbsoluteLoading, SimpleButton, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import "./encyclopedy.css";
import { SimpleError, SimpleInput, SimpleLabel, SimpleTextarea } from "../../scaffolding/simple-form-elements";
import { useFetch } from "../../customHooks/useFetch";

export function EncyclopedyItem({
    item_data = null,
    current_user = null,
    token = null,
    onRefresh = null,
    key = 0
}){

    const {data, status, loading, error, fetchData} = useFetch({});
    const {data: dataDelete, status: statusDelete, loading: loadingDelete, error: errorDelete, fetchData: fetchDataDelete} = useFetch({});

    const [openEdit, setOpenEdit] = useState(false);
    const [showYouSure, setShowYouSure] = useState(false);

    //values
    const [nameValue, setNameValue] = useState("");
    const [descValue, setDescValue] = useState("");

    //errors
    const [nameError, setNameError] = useState(null);
    const [descError, setDescError] = useState(null);

    //refs
    const nameRef = useRef();
    const descRef = useRef();


    useEffect(()=>{
        setNameValue(item_data?.race);
        setDescValue(item_data?.description);
    },[])

    function handleChange(){

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
        
        fetchData("PUT", `/races/${item_data?.id}`, body, token);
    }

    useEffect(()=>{

        if(status == "success" && onRefresh){
            onRefresh();
            setOpenEdit(false);
        }
            

    },[status])

    function handleDelete(){
        
        fetchDataDelete("DELETE", `/races/${item_data?.id}`, null, token);

    }

    useEffect(()=>{

        if(statusDelete == "success" && onRefresh){
            onRefresh();
        }

    },[statusDelete])

    return (
        <div className="en-item" key={key}>
            {(loading) && <SimpleAbsoluteLoading big={false}/>}
            {(current_user?.role == "ROLE_MODERATOR" || current_user?.role == "ROLE_ADMIN") && <>
            
            <div className="en-item-actions">
                {current_user?.role == "ROLE_MODERATOR" && <SimpleButton type="filled" onClick={()=>{setOpenEdit(prev=>!prev)}}> {openEdit ? "Zamknij edycję" : "Edytuj"} </SimpleButton>}
                {current_user?.role == "ROLE_ADMIN" && <>
                    {!showYouSure && <SimpleButton type="filled" onClick={()=>{setShowYouSure(true)}}> Usuń </SimpleButton>}
                    {showYouSure && <>
                        <SimpleParagraph text="Czy na pewno?" pc_align="center" tablet_align="center" phone_aling="center"/>
                        <div style={{display: "flex", gap: "20px"}}>
                            <SimpleButton onClick={()=>{setShowYouSure(false)}}> Nie </SimpleButton>
                            <SimpleButton onClick={()=>{handleDelete()}}> Tak </SimpleButton>
                        </div>
                    </>}
                </> }
           
            </div>
            {openEdit && current_user?.role == "ROLE_MODERATOR" && <>
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
                    <SimpleButton type="filled" onClick={handleChange}> Zapisz </SimpleButton>
                </div>
            </>}
            </>}

            <div className="en-header">
                {item_data?.race}
            </div>
            <div className="en-line"></div>
            <div className="en-desc"> {item_data?.description}</div>
            {status == "error" && <SimpleError errorData={error}/>}
        </div>
        
    );

}