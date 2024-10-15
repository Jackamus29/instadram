import { useState, useEffect } from 'react';
import { FlureeClient } from '@fluree/fluree-client';
import { ContextStatement } from '@fluree/fluree-client/dist/types/ContextTypes';

export type FlureeClientConnectionStatus = 'CONNECTING' | 'SUCCESS' | 'FAILURE';

const useFlureeClient = (defaultContext?: ContextStatement) => {
  const [flureeClient, setFlureeClient] = useState<FlureeClient | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<FlureeClientConnectionStatus>('CONNECTING');

  useEffect(() => {
    const initializeFlureeClient = async () => {
      try {
        const flureeClient = new FlureeClient({
          ledger: 'instadram',
          isFlureeHosted: false,
          host: 'localhost',
          port: 58095,
          create: false,
          defaultContext,
        });
        await flureeClient.connect();

        setFlureeClient(flureeClient);
        setConnectionStatus('SUCCESS');
      } catch (error) {
        console.error('Failed to initialize Fluree client:', error);
        setConnectionStatus('FAILURE');
      }
    };

    initializeFlureeClient();
  }, [defaultContext]);

  return { flureeClient, connectionStatus };
};

export default useFlureeClient;
