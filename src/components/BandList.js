import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {
    const [bands, setBands] = useState([]);
    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        })

        return () => socket.off('current-bands');
    }, [socket])
    
    const cambioNombre = (event, id) => {
        console.log(event.target.value, id);
        const nuevoNombre = event.target.value;
        setBands(bands => bands.map(band => {
            if(band.id === id) {
                band.name = nuevoNombre;
            }
            return band;
        }))

    }

const votar = (id) => {
    socket.emit('votar-banda', id);
  }    

const borrar = (id) => {
    socket.emit('borrar-banda', id);
  }

    const onPerdioFoco = (id, nombre) => {
        socket.emit('cambiar-nombre', {id:id, nombre:nombre});

    }

    const crearRows =()=> {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button className='btn btn-primary'
                            onClick={() => votar(band.id)}
                        > +1 </button>
                    </td>
                    <td>
                        <input value={band.name} className='form-control' 
                            onChange={ (event) => cambioNombre(event, band.id)}
                            onBlur={() => onPerdioFoco(band.id, band.name )}
                        />
                    </td>
                    <td><h3> {band.votes} </h3></td>
                    <td>
                        <button 
                            className='btn btn-danger'
                            onClick={()=> borrar(band.id)}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>

            ))
        )
    }

  return (
    <>
        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                { crearRows() }
            </tbody>


        </table>
    </>
  )
}
