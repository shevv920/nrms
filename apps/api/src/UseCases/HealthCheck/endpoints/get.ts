import { healthCheckEndpoint } from 'shared/protocol';
import { EndpointServerImplementation } from '~/endpoint';

const handler = async () => {
  return 'ok' as const;
};

export const healthCheck = EndpointServerImplementation
  .fromEndpoint(healthCheckEndpoint, handler);
