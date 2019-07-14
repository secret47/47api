const jwt = require('jsonwebtoken');//引用jsonwentoken

const Token = {
  encrypt:function(data,time){ //data加密数据，time过期时间
    return jwt.sign(data, 'token', {expiresIn:time})
  },
  //解密数据
  decrypt:function(token){
    try {
      let data = jwt.verify(token, 'token');
      return {
        token:true,
        id:data.id
      };
    } catch (e) {
      return {
        token:false,
        data:e
      }
    }
  }
}
module.exports = Token;
