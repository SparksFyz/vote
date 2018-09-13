import axios from 'axios'
import { get } from 'http';

const URL = 'http://huwaicanju.com/Wechat/user'

axios.defaults.withCredentials = true

export function getProjects() {
  return axios.post(`${URL}/projectList`)
}

export function getComments() {
  return axios.post(`${URL}/commentList`)
}

export function getCommentsByProjectId(id) {
  return axios.post(`${URL}/comment/${id}`)
}

export function getProjectById(id) {
  return axios.post(`${URL}/project/${id}`)
}

export function getSignature(url) {
  return axios.post(`${URL}/sdkSignature`, {
    url
  })
}

export function getProfile(openid) {
  return axios.post(`${URL}/wechatUser/${openid}`)
}

export function getCode() {
  const wexinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
  const appId = 'wx59e7e11099c2c50f'
  const redirect_uri = 'http://huwaicanju.com'
  return `${wexinUrl}appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`

  // return axios.get(`${wexinUrl}appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`)
}