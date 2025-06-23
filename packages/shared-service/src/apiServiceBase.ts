import AxiosInstance, { AxiosInstance as AxiosInstanceType, AxiosRequestConfig } from 'axios'

type QueryParams = Record<string, string | number | boolean | undefined>

type UrlPath = {
  route?: string[]
  query?: QueryParams
}

export default class ApiServiceBase {
  private serviceType: string
  private tokenSubscribers: any[] = []

  constructor(serviceType: string) {
    this.serviceType = serviceType
  }

  /**
   * Handle API error response
   */
  processError(error: any): Error {
    const errorCode: number = error.response ? error.response.status || 500 : 500

    switch (errorCode) {
      case 401: {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data ||
          error.message ||
          'Unauthorized'
        return new Error(errorMessage)
      }

      case 404:
        return new Error('The request is not found')

      case 400:
      case 500: {
        const errorMessage =
          error.response?.data?.title ||
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data ||
          error.message ||
          'Internal server error'
        return new Error(errorMessage)
      }

      case 422: {
        const err = error.response?.data?.errors
        if (Array.isArray(err) && err.length > 0) {
          return new Error(err[0]?.message || err[0]?.Message || err[0]?.toString())
        } else if (err?.message || err?.Message || err?.error) {
          return new Error(err.message || err.Message || err.error)
        } else {
          return new Error('Unprocessable entity')
        }
      }

      default:
        return new Error(error.message || 'Unknown error')
    }
  }

  /**
   * Return config for HTTP request
   */
  getConfig(contentType: string = 'application/json'): AxiosRequestConfig {
    return {
      headers: {
        'Content-Type': contentType
      }
    }
  }

  /**
   * Determine if auth token is required for the API request
   */
  isAuthTokenRequired(path: string): boolean {
    return path.includes('/api')
  }

  /**
   * Create a new Axios instance with interceptors
   */
  getAxiosInstance(): AxiosInstanceType {
    const instance = AxiosInstance.create()

    instance.interceptors.request.use(
      config => {
        // store.dispatch(showLoader());
        // const { token } = store.getState().auth;
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config
      },
      error => Promise.reject(error)
    )

    instance.interceptors.response.use(
      response => {
        // store.dispatch(hideLoader());
        return response
      },
      error => {
        const status = error?.response?.status || 0
        if (status === 401) {
          // store.dispatch(logout());
        }
        // store.dispatch(hideLoader());
        return Promise.reject(error)
      }
    )

    return instance
  }

  /**
   * Format URL using path and query params
   */
  getUrl(path: UrlPath): string {
    let url = this.serviceType

    if (path.route && path.route.length > 0) {
      for (const route of path.route) {
        if (route) {
          url += url.endsWith('/') ? route : '/' + route
        }
      }
    }

    if (path.query) {
      const queryParams = Object.entries(path.query)
        .filter(([_, value]) => value != null)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value!.toString())}`
        )
        .join('&')

      if (queryParams) {
        url += `?${queryParams}`
      }
    }

    return url
  }
}
