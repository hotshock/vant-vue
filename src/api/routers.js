import axios from '@/libs/api.request'

export const getRouterReq = (access) => {
  return axios.request({
    url: 'bootapi/get_router',
    params: {
      access
    },
    method: 'get'
  })
}
