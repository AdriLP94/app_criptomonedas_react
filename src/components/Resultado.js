import React from 'react';

const Resultado = ({resultado}) => {

    if (Object.keys(resultado).length === 0) return null;

    return (
        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio">El precio es: <span>{resultado.PRICE}</span></p>
            <p>Variación ultimas 24H: <span>{resultado.CHANGEPCT24HOUR}</span>%</p>
            <p>Última actualización: <span>{resultado.LASTUPDATE}</span></p>
        </div>
    );
};

export default Resultado;