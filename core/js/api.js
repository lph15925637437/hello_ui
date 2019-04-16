import Const from './const'
import Vue from 'vue'
import VueResource from 'vue-resource'
import {Message} from 'element-ui'

function Api () {
    Vue.use(VueResource)

    const apiList = {
        User:{
            userInfo:['user/query', 'user_id']
        }
    }

    function generateApi () {
        for (let moduleKey in apiList) {
            console.log("generateApi:{}", moduleKey)
            let moduleApiList = apiList[moduleKey]

            for (let functionName in moduleApiList) {
                console.log("functionName:{}", functionName)
                let config = moduleApiList[functionName]
                console.log("config:{}", config)
                console.log("apiList[moduleKey][functionName]:{}", apiList[moduleKey][functionName])

                apiList[moduleKey][functionName] = ((config) => {
                    return (...args) => {
                        return post(config, ...args)
                    }
                })(config)
            }
        }
    }

    generateApi.call()

    function post (api, ...args) {

        let url = Const.NET.END_POINT

        url = `${url}/${api[0]}`
        let body = ''

        // 定义目标对象用来接收源对象属性的复制
        let params = {

        }

        let requestArr = {}
        for (let i = 1; i < api.length; i++) {
            let param = args[i - 1]
            param = param === undefined ? '' : param
            requestArr[api[i]] = param
        }
        console.log("requestArr:{}", requestArr)

        body = Object.assign(params, requestArr)

        console.log(url + '?' + transformObjectToUrlencodedData(body))

      // headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        return new Promise((resolve, reject) => {
            Vue.http.post(url, transformObjectToUrlencodedData(body), {headers: headers}).then(
                response => {
                    let body = response.body
                    // 返回正常
                    if (body.hasOwnProperty('code') && body.code === 0) {
                        // if (body.hasOwnProperty('error')) {
                        //     console.error(body.error)
                        //     handleError(body.error)
                        //     return reject(body.error)
                        // } else {
                        //     return resolve(body.data)
                        // }
                      return resolve(body.data)
                    }

                    handleError(body.message)
                    return reject(body)
                },
                error => {
                    handleError(error.message)
                    return reject(error)
                }
            )
        })

    }

    function handleError(message) {
        Message({type: 'error', message: message})
    }

    function transformObjectToUrlencodedData(obj) {
        let p = []
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            }
        }
        return p.join('&')
    }

    return apiList
}

export default new Api()
