import fs from 'node:fs/promises';
import path from 'node:path';

const getAvailableConnectors = async () => {
  const connectorsDir = path.join(__dirname, '../connectors');
  const connectors = (await fs.readdir(connectorsDir)).map((connector) => connector.split('.')[0]);
  return connectors;
};

const connectorInitializationErrorMessage = (connector) => {
  const msg = `An error occured initializing ${connector}`;
  return msg;
};

const invalidConnectorErrorMessage = async (connector, availableConnectors) => {
  const msg = `${connector} is not a supported connector. Please use one of the currently available connectors: [${availableConnectors.join(
    ', ',
  )}]`;
  return msg;
};

const validateConnector = async (connector) => {
  const availableConnectors = await getAvailableConnectors();
  if (!connector || !availableConnectors.includes(connector.toLowerCase())) {
    throw new Error(invalidConnectorErrorMessage(connector, availableConnectors));
  }
};

const validateIsPool = (isPool) => {
  if (isPool !== undefined && typeof isPool !== 'boolean') {
    throw new Error('The isPool option must be a boolean.');
  }
};

const REQUIRED_OPTIONS = [
  { name: 'connectionString', type: 'string' },
  { name: 'connector', type: 'string' },
];

const checkRequiredOptions = (opts) => {
  let checker = true;
  REQUIRED_OPTIONS.map((opt) => {
    const failsCheck =
      opts[opt.name] === undefined ||
      // biome-ignore lint/suspicious/useValidTypeof: <explanation>
      (opts[opt.name] !== undefined && typeof opts[opt.name] !== opt.type);
    if (failsCheck) {
      checker = false;
    }
  });
  return checker;
};

const missingOptionsErrorMessage = () => {
  const msg = `Oops, looks like you forgot to pass your options. Missing one or more of the required options: [${REQUIRED_OPTIONS.map(
    (opt) => opt.name,
  ).join(', ')}]`;
  return msg;
};

const validateOptions = async (opts) => {
  if (!opts || !checkRequiredOptions(opts)) {
    throw new Error(
      `Oops, looks like you forgot to pass your options. Missing one or more of the required options: [${REQUIRED_OPTIONS.map(
        (opt) => opt.name,
      ).join(', ')}]`,
    );
  }
  await validateConnector(opts.connector);
  validateIsPool(opts.isPool);
};

const getConnector = (opts) => {
  const connector = require(`../connectors/${opts.connector}`);
  return connector(opts);
};

const deriveConnector = async (opts) => {
  const validateOpts = await validateOptions(opts);
  return getConnector(opts);
};

export {
  deriveConnector,
  getAvailableConnectors,
  missingOptionsErrorMessage,
  invalidConnectorErrorMessage,
  connectorInitializationErrorMessage,
};
