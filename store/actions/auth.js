export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const signup = (email, password) => {
  console.log('hello', email, password);
  return async dispatch => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTVB_8-Dng-s2C12zFMwUrs-866iyRxXk',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );

      if (!response.ok) {
        // Handle error here, e.g., throw an error or dispatch an error action
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resData = await response.json();
      console.log('ggg', resData);
      dispatch({type: SIGNUP});
    } catch (error) {
      console.error('Error during signup:', error);
      // You might want to dispatch an error action here
    }
  };
};

export const login = (email, password) => {
  console.log('hello000', email, password);
  return async dispatch => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTVB_8-Dng-s2C12zFMwUrs-866iyRxXk',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );

      if (!response.ok) {
        // Handle error here, e.g., throw an error or dispatch an error action
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resData = await response.json();
      console.log('ggg', resData);
      dispatch({type: LOGIN});
    } catch (error) {
      console.error('Error during Login:', error);
      // You might want to dispatch an error action here
    }
  };
};
