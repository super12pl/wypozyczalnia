import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../App.css';

export default function Login() {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loggedIn,setLoggedIn] = useState(false)
    const [warning,setWarning] = useState("")
    useEffect(()=>{
        if(loggedIn){
            navigate("/main")
        }
        
    },[loggedIn])
    function validate(){
        return fetch("http://localhost/wypozyczalnia/login.php?email="+email+"&password="+password).then((response)=>response.json()).then((response)=> {setWarning("Niepoprawne hasło/Konto nie istnieje");return setLoggedIn(response)})
    }
    return(
        <div className='App'>
            <h1>Logowanie</h1>
            <form action={validate} className='flexCol' style={{border:"2px solid cornflowerblue",padding:"10px",borderRadius:"10px"}}>
                <h2>Email</h2>
                <input onChange={(e)=>setEmail(e.target.value)} type='email'></input>
                <h2>Hasło</h2>
                <input onChange={(e)=>setPassword(e.target.value)} type='password'></input>
                <button style={{marginTop:"20px"}} type='submit'>Zaloguj się</button>
                <button style={{marginTop:"20px"}} onClick={()=>navigate("/register")}>Zarejestruj się</button>
            </form>
            <modal>{warning}</modal>
        </div>
    )}