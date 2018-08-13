import axios from 'axios'

const URL = 'http://47.104.228.159:8080/Wechat/user'

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