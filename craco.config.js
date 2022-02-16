const CracoLessPlugin = require('craco-less');

module.exports = {
    // 自定义主题
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': 'green' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    // 配置babel-plugin-import按需引用
    babel: {
        plugins: [
            [
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                },
            ],
        ],
    }
};