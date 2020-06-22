import axios from 'axios'

export function request(config){
  // 1.创建实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })



  // 2.请求，响应拦截
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
      console.log(err);
    }
  )

  instance.interceptors.response.use(
    res =>{
      // 把拦截的数据返回出去
      return res.data
    }, 
    err => {
      console.log(err);
    }
  )



  // 3.返回一个Promise
  return instance(config)
}

