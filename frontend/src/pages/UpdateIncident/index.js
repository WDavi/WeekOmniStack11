import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './UpdateIncident.css'

import logoImg from '../../assets/logo.svg';

export default function UpdateIncident(){

    const ongId = localStorage.getItem('ongId');
    const incidentId = localStorage.getItem('incidentId');

    const history = useHistory();

    const [title, setTitle] = useState(localStorage.getItem('incidentTitle'));
    const [description, setDescription] = useState(localStorage.getItem('incidentDescription'));
    const [value, setValue] = useState(localStorage.getItem('incidentValue'));

    async function handleUpdateIncident(e) {
        e.preventDefault();

        const data = {
            id: incidentId,
            title,
            description,
            value,
        };

        try {
            await api.put('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao atualizar caso, tente novamente.');
        }
    }

    return (
        <div className="update-incident-content">
            <div className="content">
                <section>
                <img src={logoImg} alt="Be The Hero"/>

                <h1>Atualizar o caso</h1>
                <p>Atualize as informações do caso</p>


                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleUpdateIncident}>
                    <strong>Título do caso:</strong>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        
                   />
                    <strong>Descrição do caso:</strong>
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                   />
                    <strong>Valor para ajudar:</strong>
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                   />


                    <button type="submit" className="button">Atualizar</button>
                </form>
            </div>
        </div>    
    );
}