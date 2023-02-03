import axios from "axios";
import React,{useEffect,useState} from "react";
import '../css/Login.css';
import {Link, useNavigate,useLocation} from "react-router-dom";

export default function Rencherir()
{
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const [prixmise,setPrixMise]=useState(0);
    const [chargement,setChargement]=useState('');
    const [enchere_id,setEnchere_id]=useState(parseInt(query.get('enchere_id'),10));
    const [user_id,setUser_id]=useState(parseInt(query.get('user_id'),10));


    const rencherir={prixmise,enchere_id,user_id};
    console.log(JSON.stringify(rencherir));

    const onSubmit=async(e)=>{
        e.preventDefault();
        setChargement('Veuillez patienter....');
        const result=await axios.post("https://ws-enchere-production.up.railway.app/enchere/rencherir",rencherir);
        setChargement('');
        alert(result.data);
    }

    return(
        <div className="container">
            <form id="formulaire" method="post" onSubmit={(e)=>onSubmit(e)}>
                <h1>Rencherir</h1>
                <p><input type="number" placeholder="Prix mise" value={prixmise} onChange={(e)=>setPrixMise(parseInt(e.target.value,10))}/></p>
                <p><button id="rencherir" type="submit" className="btn btn-primary">Valider</button></p>
                <p>{chargement}</p>
            </form>
        </div>
    )
}