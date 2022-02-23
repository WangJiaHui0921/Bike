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
}
export default Utils