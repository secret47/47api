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
        //查询所有分类
    	queryCatalogs:"select * from catalog",
        //新建标签
        addTags:"insert into tags(id,name) values(0,?)",
        //新建文章
        createArticles:"insert into article(aid,title,author,cid,content,createDate) values(0,?,?,?,?,now())",

     }
}

module.exports = sql;