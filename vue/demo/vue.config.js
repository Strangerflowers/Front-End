module.exports = {
    // baseUrl: '/mgr/dist/',
    // baseUrl: '/Reader/dist/',
    publicPath: '/mgr/',
    lintOnSave: false,
    runtimeCompiler: true,
    devServer: {
        host: 'portal-local.gtland.cn',
        //  host:'portal-local.myutopa.com',
        disableHostCheck: true,
        port: 8000,
        proxy: {
            // '/os_workinf_admin': {
            //     target: 'http://osapi-dev.gtland.cn:8081/',
            //     // target:'https://osapi-pre.myutopa.com',
            //     ws: false,
            //     pathRewrite: {
            //         '^/os_workinf_admin/': '/'
            //     },
            //     changeOrigin: true
            // },
            '/kernel-comm': {
                target: 'http://api-dev.gtland.cn',
                // target:'https://osapi-pre.myutopa.com',
                ws: false,
                pathRewrite: {
                    // '^/api/': '/'
                },
                changeOrigin: true
            },
            '/': {
                target: 'http://osapi-dev.gtland.cn/',
                // target:'https://osapi-pre.myutopa.com',
                ws: false,
                pathRewrite: {
                    // '^/apv/': '/'
                },
                changeOrigin: true
            },
            // '/app': {
            //   target: 'http://10.10.27.56:8082/',
            //   ws: false,
            //   pathRewrite: {
            //     '/app': ''
            //   },
            //   changeOrigin: true
            // }
        },
    }
}