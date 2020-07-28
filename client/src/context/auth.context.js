import { createContext } from 'react';

const AuthContext = createContext({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuthentificated: false
})

export default AuthContext