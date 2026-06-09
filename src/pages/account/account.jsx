import { useNavigate } from "react-router-dom";
import { HeaderH1, HeaderH2, SimpleBanInfo, SimpleButton, SimpleFixedLoading, SimplePagination, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import "./account.css"
import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { removeLocalUser } from "../../utils/loginUtils";
import { useFetch } from "../../customHooks/useFetch";
import { SimpleError } from "../../scaffolding/simple-form-elements";
import { SingleUser } from "./singleUserEntry";

export function AccountPage()
{
    //account deletion fetch
    const {data, status, loading, error, fetchData} = useFetch({});
    const {data: dataGetAllUsers, status: StatusGetAllUsers, loading: loadingGetAllUsers, error: errorGetAllUsers, fetchData: fetchDataGetAllUsers} = useFetch({});

    const user = JSON.parse(localStorage.getItem("user-data"));
    console.log(user);
    const token_data = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const {links} = useContext(AppContext);
    const [showYouSure, setShowYouSure] = useState(false);

    function goTo(link){
        navigate(link);
    }

    function handleLogOut()
    {
        removeLocalUser();
        navigate("/", {replace: true})
    }

    function refresh(){
        if(user?.role != "ROLE_USER"){
            fetchDataGetAllUsers("GET","/users", null, token_data?.token);
        }
    }

    function handleDeletion()
    {
        fetchData("DELETE", '/users/me', null, token_data.token);
    }

    useEffect(()=>{
        
        if(status == 'success'){
            removeLocalUser();
            navigate("/", {replace: true});
        }

        if(status == 'error'){
            setShowYouSure(false);
        }

    },[data, loading, status, error])


    useEffect(()=>{

        if(user?.role != "ROLE_USER"){
            fetchDataGetAllUsers("GET","/users", null, token_data?.token);
        }

    },[])

    useEffect(()=>{

        console.log(dataGetAllUsers, StatusGetAllUsers, errorGetAllUsers);
    },[dataGetAllUsers, StatusGetAllUsers, loadingGetAllUsers,errorGetAllUsers ])

    return <main>
        {(loading || loadingGetAllUsers) && <SimpleFixedLoading/>}
        {user?.banned && <SimpleBanInfo/>}
        <Spacer height_pc={30}/>
        <HeaderH1 pc_align="center" phone_aling="center" tablet_align="center"
            text={"Moje konto"} color={"var(--dark-green)"}/>
        <Spacer height_pc={30}/>
        <div className="grid-1-1" style={{gap: "50px"}}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                gap: "20px",
                border: "2px solid var(--yellow)",
                padding: "10px",
                borderRadius: "15px"
            }}>

                <HeaderH2 text={"Dane konta: "} font_size="var(--medium)" tablet_align="center" pc_align="center" phone_aling="center" color={"var(--dark-green)"} font_weight={"700"}/>
                <Spacer height_pc={10}/>
                <div className="account-data">
                    <span className="account-data-header"> Nazwa: </span>
                    <span> {user?.name} </span>
                </div>

                <div className="account-data">
                    <span className="account-data-header"> Email: </span>
                    <span> {user?.email} </span>
                </div>
                <SimpleButton style={{width: "50%"}} onClick={handleLogOut}> Wyloguj </SimpleButton>

            </div>

            <div 
                style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexDirection: "column",
                border: "2px solid var(--yellow)",
                padding: "10px",
                borderRadius: "15px"
            }}>
                <HeaderH2 text={"Dostępne opcje: "} font_size="var(--medium)" tablet_align="center" pc_align="center" phone_aling="center" color={"var(--dark-green)"} font_weight={"700"}/>
                <Spacer height_pc={10}/>
                <SimpleButton type="filled" style={{"width": "200px"}} onClick={()=>{goTo(links.forum.link)}}> Oglądaj posty </SimpleButton>
                <SimpleButton type="filled" style={{"width": "200px"}} onClick={()=>{goTo(links.encyclopedy.link)}}> Przeglądaj rasy </SimpleButton>
                <SimpleButton type="filled" style={{"width": "200px"}} onClick={()=>{goTo(links.kurkAI.link)}}> Uruchom KurkAIa </SimpleButton>
                {!showYouSure && <SimpleButton type="empty" style={{"width": "200px"}} onClick={()=>{setShowYouSure(true)}}> Zlikwiduj konto </SimpleButton>}
                {showYouSure && <>
                    <SimpleParagraph text="Jesteś pewny, że chcesz zlikwidować swoje konto?" pc_align="center" tablet_align="center" phone_aling="center"/>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        justifyContent: "center"
                    }}>
                        <SimpleButton style={{"width": "70px"}} type="filled" onClick={()=>{setShowYouSure(false)}}> Nie</SimpleButton>
                        <SimpleButton style={{"width": "70px"}} type="empty" onClick={()=>{handleDeletion}}> Tak </SimpleButton>
                    </div>
                </>}
                {error && <SimpleError errorData={error}/>}
            </div>

        </div>

        {(user?.role == "ROLE_MODERATOR" || user?.role == "ROLE_ADMIN") && 
            <div style={{display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center", alignItems: "center"}}>
                <Spacer height_pc={50}/>
                <HeaderH2 text={"Administracja"} 
                    pc_align="center" tablet_align="center" phone_aling="center" color={"var(--dark-green)"} font_weight={"600"} font_size="var(--big)"/>
                <Spacer height_pc={20}/>
                {dataGetAllUsers && <HeaderH2  text={"Wszyscy użytkownicy:"} font_weight={600} pc_align="center" phone_aling="center" tablet_align="center" font_size="small-plus" color={"var(--dark-green)"}/>}
                {dataGetAllUsers && dataGetAllUsers.map((user_item, index)=>(<SingleUser key={index} userData={user_item} loggedUserData={user} onReload={refresh} token={token_data?.token}/>))}
            
                <Spacer height_pc={50}/>
                {dataGetAllUsers && <HeaderH2  text={"Dodatkowe opcje:"} font_weight={600} pc_align="center" phone_aling="center" tablet_align="center" font_size="small-plus" color={"var(--dark-green)"}/>}
                <div style={{display: "flex", justifyContent: "space-around", gap: "50px", flexWrap: "wrap"}}>
                    <SimpleButton type="filled" style={{"width": " 300px"}} onClick={()=>{goTo(links.forum.link)}}> Zarządzaj postami</SimpleButton>
                    <SimpleButton type="filled" style={{"width": " 300px"}} onClick={()=>{goTo(links.encyclopedy.link)}}> Zarządzaj encyklopedią</SimpleButton>
                </div>
            </div>}
        
        <Spacer height_pc={160}/>
    </main>
}