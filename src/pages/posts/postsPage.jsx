import { HeaderH1, HeaderH2, Pretty, SimpleButton, SimpleFixedLoading, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import { SimpleError, SimpleInput, SimpleLabel, SimpleTextarea } from "../../scaffolding/simple-form-elements";
import { useFetch } from "../../customHooks/useFetch";
import { useEffect, useRef, useState } from "react";

export function PostsPage()
{
    const {data, status, loading, error, fetchData} = useFetch({});
    const {data: dataAdd, status: statusAdd, loading: loadingAdd, error: errorAdd, fetchData: fetchDataAdd} = useFetch({});
    const {data: dataGet, status: statusGet, loading: loadingGet, error: errorGet, fetchData: fetchDataGet} = useFetch({});
    const token_data = JSON.parse(localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user-data"));

    //values
    const [nameValue, setNameValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [selectValue, setSelectValue] = useState(0);
    
    //errors
    const [nameError, setNameError] = useState(null);
    const [descError, setDescError] = useState(null);

    //refs
    const nameRef = useRef();
    const descRef = useRef();

    useEffect(()=>{
        
        fetchData("GET", "/races", null, token_data?.token);

    },[])

    useEffect(()=>{
        if(status == "success"){

            if(data.length > 0)
                setSelectValue(data[0]?.id);

        }
    },[status, data])

    function handleSave(){

        if(data == null)
            return;

        if(data.length <= 0)
            return;

        if(loadingAdd)
            return;

        if(nameValue.trim() == ""){
            setNameError("Nazwa posta nie może być pusta");
            nameRef?.current?.focus();
            return;
        }

        setNameError(null);

        if(descValue.trim() == ""){
            setDescError("Opis nie może być pusty");
            descRef?.current?.focus();
            return;
        }

        setDescError(null);

        const today = new Date().toISOString().split("T")[0];
        const item = data.find(obj => obj.id === selectValue);

        let body = {
            "title": nameValue.trim(),
            "text": descValue.trim(),
            "creationDate": today,
            "isBanned": false,
            "user": {
              "id": user?.id,
              "name": user?.name
            },
            "races": [
              {
                "id": item?.id,
                "race": item?.race,
                "description": item?.description
              }
            ]
          }

          console.log(body);

          fetchDataAdd("POST", "/posts", body, token_data?.token);

    }

    useEffect(()=>{
        getItems(); 
    },[])

    useEffect(()=>{

        if(status == "success"){
            setNameValue("");
            setDescValue("");
            getItems();
        }
    },[status])

    function getItems(){


        const body = {
            page: 0,
            size: 1,
            sort: ["creationDate,DESC"]
        };

        fetchDataGet("GET", "/posts?page=0&size=1", null, token_data?.token);
    }

    useEffect(()=>{

        console.log(dataGet)

    },[statusGet, dataGet])

    return <main>
        {(loading || loadingAdd || loadingGet) && <SimpleFixedLoading/>}
        <Spacer height_pc={100}/>
        <Pretty text={"Wiedza wielu w jednym miejscu!"}/>
        <Spacer height_pc={20}/>
        <HeaderH1
            color={'var(--dark-green)'}
            text={"Forum"}
            font_weight={800} pc_align="center"
            phone_aling="center"
            tablet_align="center"/>
        <Spacer height_pc={40}/>
        <div className="grid-1-1">
            <div>
                <HeaderH2 text={"Dodaj nowy post:"} font_weight={600} pc_align="center" phone_aling="center" tablet_align="center" font_size="small-plus" color={"var(--dark-green)"}/>
                <Spacer height_pc={10}/>
                <SimpleLabel text={"Tytuł Twojego posta:"}/>
                <Spacer height_pc={10}/>
                <SimpleInput ref={nameRef} value={nameValue} onChange={setNameValue} placeholder="Podaj tytuł"/>  
                {nameError && <>
                    <SimpleParagraph color="var(--error)" text={nameError}/>
                </>}
                <Spacer height_pc={20}/>
                <SimpleLabel text={"Wybierz rasę kury, której dotyczy Twój post:"}/>
                <Spacer height_pc={10}/>
                {data && <select onChange={(e)=>{setSelectValue(e.target.value)}} className="simple-input">
                    {data.map((item)=>(<option key={item?.id} value={item?.id}>{item?.race}</option>))}
                </select>}
                

            </div>  
            <div>
                <Spacer height_pc={60}/>
                <SimpleTextarea maxLength={255} ref={descRef} value={descValue} onChange={setDescValue} placeholder={"Podaj opis..."}/>
                {descError && <>
                    <SimpleParagraph color="var(--error)" text={descError}/>
                </>}
                <Spacer height_pc={20}/>
                <SimpleButton onClick={handleSave}> Zapisz post </SimpleButton>
                {statusAdd == "error" && <>
                    <Spacer height_pc={10}/>
                    <SimpleError errorData={errorAdd}/>
                </>}
                {statusAdd == "success" && <>
                    <Spacer height_pc={10}/>
                    <SimpleParagraph text="Post został dodany" color="var(--dark-green)"/>
                </>}
            </div>      
        </div> 
        <Spacer height_pc={40}/> 
        <HeaderH2 text={"Znaleziony posty:"} font_weight={600} pc_align="center" phone_aling="center" tablet_align="center" font_size="small-plus" color={"var(--dark-green)"}/>
        {statusGet == "error" && <SimpleError errorData={errorGet}/>}
        <Spacer height_pc={160}/>
    </main>
}  