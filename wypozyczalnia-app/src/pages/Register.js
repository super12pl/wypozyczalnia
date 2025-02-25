import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../App.css';

export default function Login() {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirm,setConfirm] = useState("")
    const [registered,setRegistered] = useState(false)
    const [warning,setWarning] = useState("")
    useEffect(()=>{
        if(registered){
            navigate("/")
        }
    },[registered])
    function validate(){
        if(confirm==password){
            return fetch("http://localhost/wypozyczalnia/register.php?email="+email+"&password="+password).then((response)=>response.json()).then((response)=> {setWarning("Konto już istnieje");return setRegistered(response)})
        }
        else{
            setWarning("Hasła się nie zgadzają")
        }
        
    }
    return(
        <div className='App'>
            <h1>Rejestracja</h1>
            <form action={validate} className='flexCol' style={{border:"2px solid cornflowerblue",padding:"10px",borderRadius:"10px"}}>
                <h2>Email</h2>
                <input onChange={(e)=>setEmail(e.target.value)} type='email'></input>
                <h2>Hasło</h2>
                <input onChange={(e)=>setPassword(e.target.value)} type='password'></input>
                <h2>Potwierdź Hasło</h2>
                <input onChange={(e)=>setConfirm(e.target.value)} type='password'></input>
                <button style={{marginTop:"20px"}} type='submit'>Zarejestruj się</button>
                <button style={{marginTop:"20px"}} onClick={()=>navigate("/")}>Zaloguj się</button>
            </form>
            <modal>{warning}</modal>
        </div>
    )}