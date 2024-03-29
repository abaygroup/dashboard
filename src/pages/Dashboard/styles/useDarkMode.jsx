import { useEffect, useState } from 'react';

export const useDarkMode = () => {
    const [theme, setTheme] = useState('dark')

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    }
    
    const toggleTheme = () => {
        theme === 'dark' ? setMode('light') : setMode('dark');
    }
    
    useEffect(() => {
        const storageTheme = window.localStorage.getItem('theme')
        storageTheme ? setMode(storageTheme) : setMode('dark')
    }, [])

    return [theme, toggleTheme]
}