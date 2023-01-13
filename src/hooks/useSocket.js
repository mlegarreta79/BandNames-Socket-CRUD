import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';


export const useSocket =(serverPath)=> {
    const [online, setOnline] = useState(false);
    const [bands, setBands] = useState([]);

    useEffect(() => {
        console.log(socket, socket.connected);
        setOnline(socket.connected);
      }, [socket])
    
      useEffect(() => {
        socket.on('connect', () => {
          setOnline(true);
        })
      }, [socket])
      
      useEffect(() => {
        socket.on('disconnect', () => {
          setOnline(false);
        })
      }, [socket])
    
  
    const socket = useMemo(() => io.connect(serverPath, {
        transports: ['websocket']
      }), [serverPath]);

      return {
        socket,
        online
      }

}