// 数据库配置文件
// module.exports = {
//     mysql: {
//         host: 'localhost',
//         user: 'root',//用户名
//         password: '1234', //密码
//         database: '47blog', //数据库名称
//         port: '3306', //端口
//         multipleStatements: true, //多条查询
//          useConnectionPooling: true
//     }
// // }
var mysql = require('mysql')
var pool = mysql.createPool({
    host: '101.37.173.223',
    user: 'root', //用户名
    password: 'Yang47!_', //密码/
    // password:'1234',
    database: '47blog', //数据库名称
    port: '22', //端口
    multipleStatements: true, //多条查询
    useConnectionPooling: true
})

// var pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root', //用户名
//     password:'1234',
//     database: '47blog', //数据库名称
//     port: '3306', //端口
//     multipleStatements: true, //多条查询
//     useConnectionPooling: true
// })


exports.query = (sql,arr,callback)=>{
	 //建立链接
    pool.getConnection(function(err,connection){
        if(err){throw err;return;}
        connection.query(sql,arr,function(error,results,fields){
            //将链接返回到连接池中，准备由其他人重复使用
            connection.release();
            if(error) throw error;
            //执行回调函数，将数据返回
            callback && callback(results,fields);
        });
    });
}
