import { createContext, useEffect, useState } from "react";

export const ScreenContext = createContext();

const ScreenContextProvider = (props) => {

    const windowInnerWidth = window.innerWidth;
    const [screenWidth, setScreenWidth] = useState(windowInnerWidth);

    
    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', updateScreenWidth);
        return () => window.removeEventListener('resize', updateScreenWidth);        
    }, [])


    return ( 
        <ScreenContext.Provider value={{screenWidth}}>
            {props.children}
        </ScreenContext.Provider>
    );
}
 
export default ScreenContextProvider;