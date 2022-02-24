import { Select } from 'antd';
class Utils {
    static pagination(data, callback) {
        return {
            onchange: (current) => {
                callback(current);
            },
            page: data.page,
            current: data.current,
            pageSize: data.page_size,
            total: data.total,
            showTotal: () => {
                return `共${data.total}条数据`
            },
            showQuickJumper: true
        }
    }
    static getOptionList(data) {
        if (!data) return [];
        let options = []
        data.map(item =>
            options.push(<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
        )
        return options
    }
}
export default Utils