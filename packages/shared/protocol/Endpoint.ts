import { HttpMethod } from '../types';

export class Endpoint<Input, Output> {
  public readonly path: string;
  public readonly method: HttpMethod;

  constructor(
    path: string,
    method: HttpMethod,
  ) {
    this.path = path;
    this.method = method;
  }

  static get(path: string): EndpointBuilder {
    return new EndpointBuilder('get', path);
  }

  static post(path: string): EndpointBuilder {
    return new EndpointBuilder('post', path);
  }

  static put(path: string): EndpointBuilder {
    return new EndpointBuilder('put', path);
  }

  static delete(path: string): EndpointBuilder {
    return new EndpointBuilder('delete', path);
  }

  static patch(path: string): EndpointBuilder {
    return new EndpointBuilder('patch', path);
  }

  static options(path: string): EndpointBuilder {
    return new EndpointBuilder('options', path);
  }

  static head(path: string): EndpointBuilder {
    return new EndpointBuilder('head', path);
  }
}

class EndpointBuilder {
  private readonly method: HttpMethod;
  private readonly path: string;

  constructor(method: HttpMethod, path: string) {
    this.method = method;
    this.path = path;
  }

  public build<Input, Output>() {
    return new Endpoint<Input, Output>(this.path, this.method);
  }
}
