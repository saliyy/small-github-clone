import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const configOptions: AxiosRequestConfig = {
  baseURL: 'https://api.github.com/',
  headers: {
    'Content-type': 'application/json',
  },
}

if (configOptions.headers && import.meta.env.VITE_GITHUB_TOKEN) {
  configOptions.headers.Authorization =
    'Token ' + import.meta.env.VITE_GITHUB_TOKEN
}

const apiGithub: AxiosInstance = axios.create(configOptions)

export default apiGithub
