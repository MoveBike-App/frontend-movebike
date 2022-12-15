import React, { createContext, useEffect, useState } from 'react'

const AuthUserContext = React.createContext()

const AuthUserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  /* const [user, setUser] = useState({})

    const handleGetUserFromStorage = () => {
        const storage = window.localStorage.getItem('userCurrent')
        const user = storage
            ? {
                userId: storage.id,
                username: storage.username,
                role: storage.role
            }
            : null

        return user
    }

    useEffect(() => {
        setUser(handleGetUserFromStorage())
    }, []) */

  const user = {
    name: 'Samuel',
    email: 'samuel@mail.com'
  }

  return (
    <AuthUserContext.Provider value={{ isLogged, setIsLogged, user }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export default AuthUserContext
export { AuthUserContext }
