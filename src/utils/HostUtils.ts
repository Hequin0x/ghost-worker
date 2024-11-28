import { IRequest } from 'itty-router';

export default class HostUtils {
  static getHostFromURL(url: string, withProtocol = false) {
    const { protocol, host } = new URL(url);
    return withProtocol ? `${protocol}//${host}` : host;
  }

  static getHostFromRequest(request: IRequest, withProtocol = false) {
    const { protocol, host } = new URL(request.url);
    return withProtocol ? `${protocol}//${host}` : host;
  }
}
