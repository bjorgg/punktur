// Context provides a way to pass data through the component tree 
// without having to pass props down manually at every level

import React, { useState } from 'react'

// Creating the context object
export const DataContext = React.createContext();

// Here are the values for the context provider
export const DataProvider = ({children}) => {
  
    const [storyToUpdate, setStoryToUpdate] = useState([])
     
    

    // The Provider provides the value for this context
    return (
        <DataContext.Provider
        value={{storyToUpdate, setStoryToUpdate}}>
            {children}
        </DataContext.Provider>
    )
}