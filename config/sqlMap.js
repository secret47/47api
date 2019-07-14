let sql = {
    user:{
        //注册
        regUser:'insert into user(uid,username,password) values(0,?,?)',
        //查询用户
        query:'select * from user',
        //登录
        login:'select * from user where username = ? and password = ?',
        //查询用户角色
        queryRoles:'select rolesname from userroles where uid = ?',
        //查询用户信息
        queryInfo:'select * from userinfo where uid = ?'
    },
    articles:{
    	queryCatalogs:"select * from catalog"
    }
}

module.exports = sql;