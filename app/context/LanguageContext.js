'use client'
import { createContext , useEffect , useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({children}) {
    const [language , setLanguage ] = useState("en");

    useEffect(() => {
        const savedLanguange = 
        localStorage.getItem("language");
        if (savedLanguange) {
            setLanguage(savedLanguange);
        }
    } , []);
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem("language" , newLanguage);
    };
    return (
        <LanguageContext.Provider value={{language , changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}
