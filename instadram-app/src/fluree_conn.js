import flureedb from "@fluree/flureedb";

const did = {
  id: "did:fluree:TfHgFTQQiJMHaK1r1qxVPZ3Ridj9pCozqnh",
  public: "03b160698617e3b4cd621afd96c0591e33824cb9753ab2f1dace567884b4e242b0",
  private: "509553eece84d5a410f1012e8e19e84e938f226aa3ad144e2d12f36df0f51c1e",
};

export const memoryConnOptions = {
  method: "memory",
  defaults: {
    context: {
      id: "@id",
      type: "@type",
      schema: "http://schema.org/",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      wiki: "https://www.wikidata.org/wiki/",
      skos: "http://www.w3.org/2008/05/skos#",
      f: "https://ns.flur.ee/ledger#",
    },
    did,
  },
};

export const isConnected = () => {
  return window.conn !== undefined;
};

export const connect = async (options) => {
  try {
    if (!isConnected()) {
      console.log("connecting...");
      window.conn = await flureedb.jldConnect(options);
    }
  } catch (err) {
    console.error(err);
  }
};

export const create = async (ledgerName) => {
  try {
    const newLedger = await flureedb.jldCreate(window.conn, ledgerName);
    if (newLedger) {
      console.log("ledger created", newLedger);
      window.ledger = newLedger;
      return newLedger;
    } else throw new Error(`There was a problem creating ${ledgerName}`);
  } catch (err) {
    console.error(err);
  }
};

export const commit = async (conn, db) => {
  try {
    const committed = await flureedb.jldCommit(conn, db);
    if (committed) {
      console.log("committed");
      window.committedDb = committed;
    }
    return committed;
  } catch (err) {
    console.error(err);
  }
};

export const stage = async (stageData) => {
  try {
    let data;
    if (typeof stageData === "string") data = JSON.parse(stageData);
    else data = stageData;
    if (window.ledger) {
      const staged = await flureedb.jldStage(window.ledger, data);
      if (staged) {
        window.stagedDb = staged;
        console.log("data staged", data);
        return staged;
      }
    } else throw new Error("Create a new ledger first");
  } catch (err) {
    console.error(err);
  }
};

export const query = async (db, q) => {
  try {
    let queryObject;
    if (typeof q === "string") queryObject = JSON.parse(q);
    else queryObject = q;
    const results = await flureedb.jldQuery(db, queryObject);
    return results;
  } catch (err) {
    console.error(err);
  }
};
