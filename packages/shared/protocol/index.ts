import { Endpoint } from './Endpoint';

export const healthCheckEndpoint = Endpoint
  .get('/health')
  .build<undefined, 'ok'>();

export const complexInputOutputEndpoint = Endpoint
  .post('/complex')
  .build<{ foo: string }, { bar: string }>();
