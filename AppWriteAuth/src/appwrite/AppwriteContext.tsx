import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, FC, PropsWithChildren, useState } from 'react'
import AppwriteService from './service';

type AppwriteContextType = {
    appwriteService: AppwriteService,
    isLoggedIn: Boolean,
    setIsLoggedIn : (isLoggedIn: Boolean) => void

}

export const AppwriteContext = createContext<AppwriteContextType>({
    appwriteService: new AppwriteService(),
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});

export const AppwriteProvider : FC<PropsWithChildren>= ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const defaultValue = {
        appwriteService: new AppwriteService(),
        isLoggedIn,
        setIsLoggedIn
    }
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  )
}


