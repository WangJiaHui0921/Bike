import axios from "axios";
import { Modal } from "antd"
export default class Axios {
    static requestList(_this, url, params) {
        this.ajax({
            url,
            data: params ? params : ""
        }).then(data => {
            _this.setState({ dataSource: data.result.item_list.map((item, index) => { item.key = index; return item }) })
        })
    }

    static ajax(options) {
        let baseApi = "https://mobile-ms.uat.homecreditcfc.cn/mock/6204f860e491190027bbaf31/mockapi"
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                baseURL: baseApi,
                method: "get",
                data: (options.data && options.data.params) || "",
                timeout: 5000
            }).then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    resolve(res.data)
                } else {
                    Modal.info({
                        title: "警告",
                        content: res.data.msg
                    })
                }
            })
        })
    }
}