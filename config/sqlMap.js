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
        queryInfo: 'select * from userinfo where uid = ?',
        updateInfo: 'update userinfo set avatarUrl = ?,nickname=?,gender=?,age=?,description=?,birthday = ? where uid = ?'
    },
    articles: {
        //查询所有分类
        queryCatalogs: "select * from catalog",
        //新建分类
        addCatalog: "insert into catalog(id,cname,cdesc) values(0,?,?)",
        //删除分类
        delCatalog: "delete from catalog where id = ? ",
        //新建标签
        addTags: "insert into tags(id,name) values(0,?)",
        //查询所有标签
        queryTags: "select * from tags",
        //新建文章
        createArticles: "insert into article(aid,title,uid,cid,description,coverImg,tags,content,createDate) values(0,?,?,?,?,?,?,?,now())",
        //删除文章
        delete: "delete from article where aid = ? ",
        //根据id查询文章
        queryForId: "select * from article where aid = ?",
        //得到总页数
        queryNum: "SELECT COUNT(*) FROM table_name",
        //更改文章
        update: "update article set title = ?,cid=?,content = ? where aid = ?",
        //根据姓名查找
        searchForName: "",
        //根据标题查找
        searchForTitle: "select * from article where title like ?"
    },
    blog: {
        //上一页数据
        queryPre: "select aid,title from article where aid < ? order by aid desc limit 1",
        queryNext: "select aid,title from article where aid > ? order by aid asc limit 1",
        //提交评论
        referRemark:"insert into comment(id,nickname,contact,container,aid,createDate) values(0,?,?,?,?,now())",
        //查询当前文章的评论
        queryRemark:"SELECT container,nickname,createDate FROM comment WHERE aid = ?",
        queryForYear:"select * from article where year(createDate) = ?",
        //查询文章所有的年份
        queryYear:"select DISTINCT YEAR(createDate) as year from article",
    },
    system:{
        setSysInfo:"insert into webInfo(title,topImg) values(?,?)",
        getSysInfo:"select * from webInfo",
        getNewRemark:"select comment.nickname,comment.createDate,comment.container,article.title FROM comment,article where comment.aid = article.aid ORDER BY comment.createDate DESC LIMIT 0,5"
    }
}
module.exports = sql;