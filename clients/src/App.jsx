import React, { useEffect, useState } from 'react';
import Routes from './components/Routes'
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { REACT_APP_API_URL } from '../env';


export default function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUid(res.data)
      })
      .catch((err) => { console.log('No Token', err)})
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>

  );
}
