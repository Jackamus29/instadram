import { useEffect, useState } from 'react';
import {
  memoryConnOptions,
  isConnected,
  connect,
  create,
  stage,
  commit,
  query,
} from '../fluree_conn';

const Portal = () => {
  const [flureeReady, setFlureeReady] = useState(isConnected());

  useEffect(() => {
    if (!isConnected()) {
      connect(memoryConnOptions).then(() => {
        setFlureeReady(isConnected());
      });
    }
  }, []);

  return <h1>{flureeReady ? 'Connected' : 'Not Connected'}</h1>;
};

export default Portal;
