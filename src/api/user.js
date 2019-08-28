import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    username: userName,
    password: password
  }
  return axios.request({
    url: 'bootapi/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'bootapi/get_info',
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'bootapi/logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'bootapi/message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'bootapi/message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'bootapi/message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'bootapi/message/has_read',
    method: 'post',
    params: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'bootapi/message/remove_readed',
    method: 'post',
    params: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'bootapi/message/restore',
    method: 'post',
    params: {
      msg_id
    }
  })
}
