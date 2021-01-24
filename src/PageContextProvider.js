import React, { useState, useEffect, createContext } from 'react';
export const PageContext = createContext();

const PageContextProvider = (props) => {

    const [user, setUser] = useState({
        'name': 'harry potter'
    });

    const [language, setLanguage] = useState("en");

    return (
        <PageContext.Provider value={{
            user: user,
            language: language,
            setLanguage: setLanguage
        }}>
            {props.children}
        </PageContext.Provider>
    );
}
export default PageContextProvider;