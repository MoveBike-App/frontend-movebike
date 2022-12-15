/* Default */
import { useContext } from 'react'

/* Contexts */
// import { AuthUserContext } from '../context/auth-user'

export const useAuthUser = () => {
  const { isLogged, user, setIsLogged } = useContext(AuthUserContext)

  const uppercaseUser = user.toUppercase()

  return {
    isLogged,
    user: uppercaseUser,
    setIsLogged
  }
}
