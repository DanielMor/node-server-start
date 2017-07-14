import { config } from 'dotenv';

config({ silent: true });

const {
  PORT,
  NODE_ENV,
} = process.env;

export default {
  server: {
    port: PORT || 3000,
  },
  env: NODE_ENV || 'development',
  name: 'node-server-start',
};