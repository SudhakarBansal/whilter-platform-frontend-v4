import ApiServiceBase from './apiServiceBase';
import { HttpContentType } from './httpContent';

export default class ApiService extends ApiServiceBase {
  constructor(serviceType: string) {
    super(serviceType);
  }

  private formatPath(path: string | string[]) {
    return typeof path === 'string' ? { route: [path] } : { route: path };
  }

  async get(path: string | string[]) {
    const instance = this.getAxiosInstance();
    const urlPath = this.formatPath(path);

    try {
      const res = await instance.get(this.getUrl(urlPath), this.getConfig(HttpContentType.Json));
      return res.data.data ?? res.data;
    } catch (err) {
      return Promise.reject(this.processError(err));
    }
  }

  async post(path: string | string[], body: any, contentType = HttpContentType.Json) {
    const instance = this.getAxiosInstance();
    const urlPath = this.formatPath(path);

    try {
      const res = await instance.post(this.getUrl(urlPath), body, this.getConfig(contentType));
      return res.data.data ?? res.data;
    } catch (err) {
      return Promise.reject(this.processError(err));
    }
  }

  async postMultipart(path: string | string[], body: any) {
    return this.post(path, body, HttpContentType.MultipartFormData);
  }

  async put(path: string | string[], body: any) {
    const instance = this.getAxiosInstance();
    const urlPath = this.formatPath(path);

    try {
      const res = await instance.put(this.getUrl(urlPath), body, this.getConfig(HttpContentType.Json));
      return res.data.data ?? res.data;
    } catch (err) {
      return Promise.reject(this.processError(err));
    }
  }

  async delete(path: string | string[]) {
    const instance = this.getAxiosInstance();
    const urlPath = this.formatPath(path);

    try {
      const res = await instance.delete(this.getUrl(urlPath), this.getConfig(HttpContentType.Json));
      return res.data.data ?? res.data;
    } catch (err) {
      return Promise.reject(this.processError(err));
    }
  }

  async getCustom(path: string) {
    const instance = this.getAxiosInstance();

    try {
      const res = await instance.get(path, this.getConfig(HttpContentType.Json));
      return res.data.data ?? res.data;
    } catch (err) {
      return Promise.reject(this.processError(err));
    }
  }
}
