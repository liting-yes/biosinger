import Axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

Axios.defaults.timeout = 5000
Axios.defaults.validateStatus = (status) => {
  return status >= 100 && status < 600
}

const defaultInstance = Axios.create()

type UseAxiosOptions = string | AxiosRequestConfig
interface UseAxiosConfig {
  instance?: AxiosInstance
}
const useAxios = (options: UseAxiosOptions, config: UseAxiosConfig) => {
  const instance = config.instance ?? defaultInstance
  return typeof options === 'string' ? instance.get(options) : instance(options)
}

export default useAxios
