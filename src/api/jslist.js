import axios from '@/libs/api.request'

export const getJSDataCount = msg => {
  return axios.request({
    url: 'bootapi/get_JSData_count',
    method: 'post',
    params: {
      msg
    }
  })
}

export const getJSData = ({ msg, pageid}) => {
  return axios.request({
    url: 'bootapi/get_JSData',
    method: 'post',
    params: {
      msg,
      pageid
    }
  })
}

export const getJSDetail = ({ msg, dtid}) => {
  return axios.request({
    url: 'bootapi/get_JSDetail',
    method: 'post',
    params: {
      msg,
      dtid
    }
  })
}
