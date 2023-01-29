import Axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

Axios.defaults.timeout = 15 * 1000
Axios.defaults.validateStatus = (status) => {
  return status >= 100 && status < 600
}

const defaultInstance = Axios.create()

export type UseAxiosOptions = string | AxiosRequestConfig
export interface UseAxiosConfig {
  instance?: AxiosInstance
}
export const request = (options: UseAxiosOptions, config: UseAxiosConfig) => {
  const instance = config.instance ?? defaultInstance
  return typeof options === 'string' ? instance.get(options) : instance(options)
}
