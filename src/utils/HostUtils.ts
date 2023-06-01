import { IRequest } from 'itty-router';

export default class HostUtils {
  static getHostFromURL(url: string, withProtocol = false) {
    const urlObj = new URL(url);
    if (withProtocol) {
      return `${urlObj.protocol}//${urlObj.host}`;
    }
    return urlObj.host;
  }

  static getHostFromRequest(request: IRequest, withProtocol = false) {
    const urlObj = new URL(request.url);
    if (withProtocol) {
      return `${urlObj.protocol}//${urlObj.host}`;
    }
    return urlObj.host;
  }
}
