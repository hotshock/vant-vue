import axios from 'axios'
import store from '@/store'
import { Message } from 'iview'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig (url) {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    if (url !== 'login') {
      config.headers['X-token'] = store.state.user.token
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status, message } = res.data
      if (status === 20000) {
        return { data, status }
      } else {
        const { data: { statusText, status }, config } = JSON.parse(JSON.stringify(res))
        let errorInfo = {
          message,
          status,
          request: { responseURL: config.url }
        }
        Message.error(message)
        addErrorLog(errorInfo)
        return Promise.reject(res)
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      Message.error(statusText)
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(options.url), options)
    this.interceptors(instance, options.url)
	  return instance(options)
  }
}
export default HttpRequest
