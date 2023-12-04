import React, {useEffect, useState} from 'react';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoginOrRegister: null,
    isLogin: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        'https://shoppingapp-37f4a-default-rtdb.firebaseio.com/users.json',
      );
      const resData = await response.json();
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          const element = resData[key];
          if (element.email === user.email) {
            if (element.password === user.password) {
              setUser(prevState => {
                return {
                  ...prevState,
                  isLogin: true,
                };
              });
            }
          }
        }
      }
    };
    if (user.isLoginOrRegister === 'Login') {
      console.log('Login');
      fetchUsers();
    } else {
      console.log('Register');
    }
  }, [user.isLoginOrRegister, user.email, user.password]);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
