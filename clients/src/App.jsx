import React, { useEffect, useState } from 'react';
import Routes from './components/Routes'
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { REACT_APP_API_URL } from '../env';


export default function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}jwtid`, {
          withCredentials: true
        });

        // // Stockez le cookie dans js-cookie
        // const jwtCookie = response.headers['set-cookie'];
        // if (jwtCookie) {
        //   const jwtToken = jwtCookie.split(';')[0].split('=')[1];
        //   Cookies.set('jwt', jwtToken); // Stockez le cookie JWT côté client
        // }

        setUid(response.data);
      } catch (error) {
        console.error("voici:", error);
      }
    };
    fetchToken();
  }, []);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>

  );
}
