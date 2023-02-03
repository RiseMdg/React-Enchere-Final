import React,{useEffect,useState} from "react";
import axios from "axios";
import '../css/Login.css';
import {Link, useNavigate,useLocation} from "react-router-dom";

export default function Login(props)
{
    const [email,setEmail]=useState('fitia@gmail.com');
    const [password,setPassword]=useState('fitiamdp');
    const [chargement,setChargement]=useState('');

    const user={email,password};
    
    const navigate=useNavigate();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const enchere_id = query.get('enchere_id');
    const isHistorique = query.get('isHistorique');

    const onSubmit=async(e)=>{
        e.preventDefault();
        setChargement('veuillez patienter...');
        const result=await axios.post("https://ws-enchere-production.up.railway.app/enchere/login",user);
        setChargement('');
        if(isHistorique)
        {
            navigate('/Historique?user_id='+result.data.id);
        }
        else
        {
            navigate('/Rencherir?user_id='+result.data.id+'&enchere_id='+enchere_id);
        }
    }

    return(
        <div className="container">
            <form id="formulaire" method="post" onSubmit={(e)=>onSubmit(e)}>
                <h1>Login</h1>
                <p><input value={email} type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/></p>
                <p><input value={password} type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/></p>
                <p><button type="submit" id="rencherir" className="btn btn-primary">Log in</button></p>
                <p>{chargement}</p>
            </form>
        </div>
    )
}