import React, {useState, useEffect} from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner/Spinner';
import axios from 'axios';

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cripto, guardarCripto] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect (() => {
    const cotizarCriptomoneda = async () => {
      if(moneda === "" || cripto ==="") return;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      guardarCargando(true);

      setTimeout(()=>{ 
        guardarCargando(false)
        guardarResultado(resultado.data.DISPLAY[cripto][moneda])
      },3000);
    }

    cotizarCriptomoneda();
  }, [moneda, cripto])

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al instante</h1>
          <Formulario guardarMoneda={guardarMoneda} guardarCripto={guardarCripto}/>
        </div>
      </div>
      <div className="row">
        {cargando ? <Spinner/> : <Resultado resultado={resultado}/>}
      </div>
    </div>
  );
}

export default App;
