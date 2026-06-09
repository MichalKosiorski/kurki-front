import { useEffect, useState } from "react";
import { SimpleButton, SimpleParagraph, SimpleAbsoluteLoading } from "../../scaffolding/simple-elements";
import "./account.css";
import { useFetch } from "../../customHooks/useFetch";
import { SimpleError } from "../../scaffolding/simple-form-elements";

export function SingleUser({userData, loggedUserData, token, onReload = null, key=0}){

    const [showYouSure, setShowYouSure] = useState(false);
    const {data: dataBan, status: statusBan, loading: loadingBan, error: errorBan, fetchData: fetchDataBan} = useFetch({});
    const {data: dataDelete, status: statusDelete, loading: loadingDelete, error: errorDelete, fetchData: fetchDataDelete} = useFetch({});


    function handleDelete()
    {
        setShowYouSure(false);
        let end = `/users/${userData.id}`;
        fetchDataDelete("DELETE", end, null, token);
    }

    useEffect(()=>{
        if(statusDelete == "success" && onReload)
        {
            onReload();
        }
    },[dataDelete, errorDelete, statusDelete, loadingDelete])

    function handleBanning()
    {
        let end = `/users/${userData.id}/ban`;
        fetchDataBan("PATCH", end, null, token);
    }

    useEffect(()=>{
        if(statusBan == "success" && onReload)
            onReload();
    },[dataBan, errorBan, statusBan, loadingBan])

    return (<div key={key} className="single-user">
        {(loadingBan || loadingDelete) && <SimpleAbsoluteLoading big={false}/>}
        <div className="single-user-left">
            <div className="account-data">
                <span className="account-data-header"> Nazwa: </span>
                <span> {userData?.name} </span>
            </div>
            <div className="account-data">
                <span className="account-data-header"> Email: </span>
                <span> {userData?.email} </span>
            </div>
            <div className="account-data">
                <span className="account-data-header"> Rola: </span>
                <span> {userData?.role == "ROLE_ADMIN" ? "Admin" : userData?.role == "ROLE_MODERATOR" ? "Moderator"  : "Użytkownik"} </span>
            </div>
        </div>
        <div className="single-user-center">
        <div className="account-data">
                <span className="account-data-header"> Email zweryfikowany: </span>
                <span> {userData?.enabled ? "Tak" : "Nie"} </span>
            </div>
            <div className="account-data">
                <span className="account-data-header"> Użytkownik zbadowany: </span>
                <span> {userData?.banned ? "Tak" : "Nie"} </span>
            </div>
        </div>
        <div className="single-user-right">
            {loggedUserData?.role == "ROLE_MODERATOR" && <SimpleButton onClick={handleBanning} type="filled" style={{"width": "100%"}}> Zbanuj </SimpleButton>}
            {loggedUserData?.role == "ROLE_ADMIN" && <>
                {!showYouSure && <SimpleButton type="filled" style={{"width": "100%"}} onClick={()=>{setShowYouSure(true)}}> Usuń użytkownika </SimpleButton>}
                {showYouSure && <>
                    <SimpleParagraph text="Czy na pewno?" pc_align="center" tablet_align="center" phone_aling="center"/>
                    <div style={{display: "flex", gap: "20px"}}>
                        <SimpleButton onClick={()=>{setShowYouSure(false)}}> Nie </SimpleButton>
                        <SimpleButton onClick={()=>{handleDelete()}}> Tak </SimpleButton>
                    </div>
                </>}
            </>}
        </div>
        {statusBan == "error" && <div style={{width: "100%"}}>
            <SimpleError errorData={errorBan}/>
        </div>}

        {statusDelete == "error" && <div style={{width: "100%"}}>
            <SimpleError errorData={errorDelete}/>
        </div>}
    </div>)

}