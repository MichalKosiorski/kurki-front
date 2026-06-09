import { HeaderH1, HeaderH2, Pretty, SimpleButton, SimpleFixedLoading, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import { SimpleError, SimpleInput, SimpleLabel } from "../../scaffolding/simple-form-elements";
import { useFetch } from "../../customHooks/useFetch";
import { useEffect, useState } from "react";

export function KurkAI(){

    const {data, status, loading, error, fetchData} = useFetch({});
    const token_data = JSON.parse(localStorage.getItem("user"));


    const [question, setQuestion] = useState('');
    const [errorQ, setErrorQ] = useState(null);

    function handleQuestion()
    {
        if(question.trim()=="")
        {
            setErrorQ("Pytanie nie może być puste");
            return;
        }

        setErrorQ(null);


        let body = {
            "message": question.trim()
        }

        fetchData("POST", '/chat', body, token_data?.token);
    }

    useEffect(()=>{
        console.log(data);
    },[data, status])

    return <main>
        {loading && <SimpleFixedLoading/>}
        <Spacer height_pc={100}/>
        <Pretty text={"Potęga sztucznej inteligencji!"}/>
        <Spacer height_pc={20}/>
        <HeaderH1
            color={'var(--dark-green)'}
            text={"KurkaAI"}
            font_weight={800} pc_align="center"
            phone_aling="center"
            tablet_align="center"/>
        <Spacer height_pc={40}/>
        <div className="grid-1-1">
            <div> 
                <SimpleLabel text={"W czym mogę ci pomóc ko ko kochany użytkowniku?"}/>
                <Spacer height_pc={10}/>
                <SimpleInput value={question} onChange={setQuestion} placeholder="Co ci chodzi po głowie?"/>
                {errorQ && <>
                    <SimpleParagraph color="var(--error)" text={errorQ}/>
                </>}
                <Spacer height_pc={10}/>
                <SimpleButton onClick={handleQuestion}> Zapytaj KurkAIa</SimpleButton>
                {status == "error" && <SimpleError errorData={error}/>}

            </div>
            <div>
                {data && <>
                    <HeaderH2 text={"Odpowiedź:"} color={"var(--dark-green)"} font_size="var(--small-plus)"/>
                    <Spacer height_pc={10}/>
                    <SimpleParagraph text={data?.answer}/>
                </>}

            </div>
        </div>

        <Spacer height_pc={160}/>


    </main>
}