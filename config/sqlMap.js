let sql = {
    user: {
        //注册
        regUser: 'insert into user(uid,username,password) values(0,?,?)',
        //查询用户
        query: 'select * from user',
        //登录
        login: 'select * from user where username = ? and password = ?',
        //查询用户角色
        queryRoles: 'select rolesname from userroles where uid = ?',
        //查询用户信息
        queryInfo: 'select * from userinfo where uid = ?'
    },
    articles: {
        //查询所有分类
        queryCatalogs: "select * from catalog",
        addCatalog:"insert into catalog(id,name) values(0,?)",
        //新建标签
        addTags: "insert into tags(id,name) values(0,?)",

        //新建文章
        createArticles: "insert into article(aid,title,author,cid,content,createDate) values(0,?,?,?,?,now())",
        //删除文章
        delete: "delete from article where aid = ? ",
        //根据id查询文章
        queryForId: "select * from article where aid = ?",
        //得到总页数
        queryNum: "SELECT COUNT(*) FROM table_name",
        //更改文章
        update: "update article set title = ?,cid=?,content = ? where aid = ?",

    }
}
module.exports = sql;