import { useState, useEffect, useCallback, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { removeLocalUser } from "../utils/loginUtils";
import { useNavigate } from "react-router-dom";

export function useFetch({method='GET', endpoint='', body=null, token=null, auto=false}){
    const navigate = useNavigate(); 
    const {api_link} = useContext(AppContext);
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [status, setStatus] = useState('idle');
    const fetchData = useCallback(async (overrideMethod, overrideEndpoint, overrideBody, overrideToken) =>{
        setLoading(true);
        setError(null);
        setStatus('loading');
        const usedMethod = (overrideMethod || method).toUpperCase();
        const usedEndpoint = overrideEndpoint || endpoint;
        const usedBody = overrideBody !== undefined ? overrideBody : body;
        const usedToken = overrideToken !== undefined ? overrideToken : token;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if(usedToken){
            headers['Authorization'] = `Bearer ${usedToken}`;
        };
        const options = {
            method: usedMethod,
            headers,}
        if(usedBody && ["POST", "PUT", "PATCH", "DELETE"].includes(usedMethod))
            options.body = JSON.stringify(usedBody);
        try{
            
            const res = await fetch(`${api_link}${usedEndpoint}`, options);
            let json;

            const text = await res.text();

            try {
                json = JSON.parse(text);
            } catch (e) {
                json = { message: text };
            }
            if(!res.ok){
                const error = new Error(`HTTP error! Status: ${res.status}`);
                error.details = json;
                throw error;
            }
            setData(json);
            setStatus('success');
            return json;
        }
        catch(err){
            setError(err);
            setStatus('error');
            if(err && err.details){
                if(err.details.error == "TOKEN_EXPIRED"){
                    removeLocalUser();
                    navigate("/login", {replace: true});}}
            throw err;}
        finally{
            setLoading(false);
        }
    }, [method, endpoint, token, api_link, navigate]);

    useEffect(()=>{
        if(auto)
            fetchData();
    }, [auto, fetchData]);

    return {data, error, loading, status, fetchData};
}


export function useFetchFormData({method = 'POST', endpoint = '', token = null, auto = false})
{
    const { api_link } = useContext(AppContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');

    const navigate = useNavigate();

    const fetchData = useCallback(async (overrideMethod, overrideEndpoint, formData, overrideToken) => {
        setLoading(true);
        setError(null);
        setStatus('loading');

        const usedMethod = (overrideMethod || method).toUpperCase();
        const usedEndpoint = overrideEndpoint || endpoint;
        const usedToken = overrideToken !== undefined ? overrideToken : token;

        const headers = {Accept: 'application/json'};

        if (usedToken) {headers['Authorization'] = `Bearer ${usedToken}`;}

        const options = {method: usedMethod, headers, body: formData};

        ///console.log(options);
        //console.log(headers);
        try 
        {
            const res = await fetch(`${api_link}${usedEndpoint}`, options);
            let json;

            const text = await res.text();

            try {
                json = JSON.parse(text);
            } catch (e) {
                json = { message: text };
            }
            if (!res.ok) {
                const error = new Error(`HTTP error! Status: ${res.status}`);
                error.details = json;
                throw error;
            }

            setData(json);
            setStatus('success');
            return json;

        } catch (err) 
        {
            setError(err);
            setStatus('error');
            if(err && err.details){
                if(err.details.error == "TOKEN_EXPIRED")
                {
                    removeLocalUser();
                    navigate("/login", {replace: true});
                }
            }
            throw err;
        } finally 
        {
            setLoading(false);
        }
    }, [endpoint, method, token, api_link, navigate]);

    useEffect(() => {
        if (auto) fetchData();
    }, [auto, fetchData]);

    return { data, error, loading, status, fetchData };
}