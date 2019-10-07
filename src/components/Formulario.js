import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

const Formulario = ({guardarMoneda, guardarCripto}) => {

    const [criptomonedas, guardarCriptomonedas] = useState ([]);
    const [monedaCotizar, guardarMonedaCotizar] = useState ("");
    const [criptoCotizar, guardarCriptoCotizar] = useState ("");
    const [error, guardarError] = useState (false);

    useEffect (()=>{

        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`;
            const resultado = await axios.get(url);
            guardarCriptomonedas (resultado.data.Data);
        }

        consultarAPI();
    },[])

    const cotizarMoneda = e => {
        e.preventDefault();
        if (monedaCotizar === "" || criptoCotizar === "") {
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(monedaCotizar);
        guardarCripto(criptoCotizar);
    }

    return (
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje="Ambos campos son obligatorios"/> : null}
            <div className="row">
                <label>Elige tu moneda</label>
                <select className="u-full-width" onChange={e => guardarMonedaCotizar(e.target.value)}>
                    <option value="">-- Elige tu moneda --</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="GBP">Libra esterlina</option>
                    <option value="EUR">Euro</option>
                    <option value="JPY">Yen</option>
                </select>
            </div>
            <div className="row">
                <label>Elige tu criptomoneda</label>
                <select className="u-full-width" onChange={e => guardarCriptoCotizar(e.target.value)}>>
                    <option value="">-- Elige tu criptomoneda --</option>
                    { criptomonedas.map(criptomoneda => 
                    <Criptomoneda 
                    key = {criptomoneda.CoinInfo.Id}
                    criptomoneda={criptomoneda} />)}
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="Calcular"/>
        </form>
    );
};

export default Formulario;