import axios from 'axios'
import config from './config'

export default axios.create({
    baseURL: config.rootPath,
    headers: {
        'X-API-KEY': process.env.REACT_APP_API_KEY,
    },
})
