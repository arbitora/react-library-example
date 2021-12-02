import axios from "axios"

const useApiHook = () => {
    let self = {}

    const baseUrl = "https://httpbin.org/"

    const axiosRequest = (method, data, url) => {
        const isGetRequest = method == "GET"

        const axiosConfig = {
            url,
            method,
            data: isGetRequest ? null : data,
            params: isGetRequest ? data : null
        }

        return axios.request(axiosConfig).then((res) => {
            return res.data
        })
    }

    /**
     * Serializes object to url query
     * @param {*} query
     */
    const serialize = function (query) {
        if (query != null) {
            let str = []
            for (let p in obj)
                if (Object.prototype.hasOwnProperty.call(obj, p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
                }
            return str.join("&")
        }
        return ""
    }

    const getRequest = (query) => {
        let url = `${baseUrl}get`
        return axiosRequest("GET", "?" + serialize(query), url)
    }
    self.getRequest = getRequest

    const patchRequest = (data) => {
        let url = `${baseUrl}patch`
        return axiosRequest("PATCH", data, url)
    }
    self.patchRequest = patchRequest

    const postRequest = (data) => {
        let url = `${baseUrl}post`
        return axiosRequest("POST", data, url)
    }
    self.postRequest = postRequest

    const putRequest = (data) => {
        let url = `${baseUrl}put`
        return axiosRequest("PUT", data, url)
    }
    self.putRequest = putRequest

    const deleteRequest = (data) => {
        let url = `${baseUrl}delete`
        return axiosRequest("DELETE", data, url)
    }
    self.deleteRequest = deleteRequest

    return self
}

export default useApiHook
