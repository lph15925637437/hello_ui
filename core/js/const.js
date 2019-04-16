function Const () {
    let constData = {
        NET:{
            END_POINT:'http://localhost:8080'
        }
    };

    // 本地ip
    if (window.location.href.indexOf('localhost') < 0) {
        // 可以将项目通过nginx做转发下面可以填写nginx安装的虚拟机地址
        constData.NET.END_POINT = "192.168.230.128:80"
    }

    return constData
}

export default new Const()
