import React, { createContext } from "react";
import {useSocket} from '../hooks/useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    const {socket, online} = useSocket('http://192.168.55.188:8080');

    return (
        <SocketContext.Provider value={{socket, online}}>
            { children }
        </SocketContext.Provider>
    )
}
