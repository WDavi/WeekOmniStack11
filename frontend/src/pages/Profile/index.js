import React, { useEffect, useState } from 'react';
import {Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiMenu } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';
import './Profile.css'

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    //Usando para poder mover o usuario de entre páginas
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    function handleLogout() {
        localStorage.clear();

        history.push("/");
    }

    function handleModifyIncident(id, title, description, value){
        localStorage.setItem('incidentId',id);
        localStorage.setItem('incidentTitle', title);
        localStorage.setItem('incidentDescription', description);
        localStorage.setItem('incidentValue', value);

        history.push("/incident/modify");
    }

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers : {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/> 
                <span>Bem vinda, {ongName}</span>

                <Link to="/incident/new" className="button">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                        <button type="button" className="update-button" onClick={() => handleModifyIncident(
                            incident.id, 
                            incident.title, 
                            incident. description,
                            incident.value
                            )}>
                            <FiMenu size={20} color="#e02041"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}