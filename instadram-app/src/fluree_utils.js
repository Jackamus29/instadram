import axios from 'axios';

const LEDGER_ID = '369435906932771';

const flureeInstance = axios.create({
  baseURL: `https://api.dev.flur.ee/fdb/fluree-jld/${LEDGER_ID}`,
  headers: {
    Authorization:
      'Bearer 796bf3c6ad7fea9f7b91b46c083a20fbe3e0c0d8460fe7b5042077c715dd854d',
  },
});


export {
  flureeInstance,
};

