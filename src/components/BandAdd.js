import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
import { useSocket } from '../hooks/useSocket';

export const BandAdd = () => {
  const [valor, setValor] = useState('');
  const {socket} = useContext(SocketContext);

const onSubmit =(ev)=>{
  ev.preventDefault();
  //console.log
  console.log('Valor', valor);
  if(valor.length>0) {
    //Llamar funcion para emitir evento
    socket.emit('nueva-banda', {nombre:valor});
    setValor('');
  }
}

  return (
    <>
        <h3>Agregar Banda</h3>
        <form onSubmit={onSubmit}>
            <input
                className='form-control'
                placeholder='Nuevo nombre de banda'
                onChange={(ev) => setValor(ev.target.value)}
                value={valor}
            />
        </form>
    </>
  )
}
