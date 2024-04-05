module.exports = async function (req, res, next) { 
  delete req.session.user;

  if (!req.headers.authorization || !req.headers.authorization.includes('Bearer ')) {
    return res.err({code: 996, detail: '沒有帶 Token 或是 Authorization 表頭格式錯誤'});
  }

  const token = req.headers.authorization.substring(7);

  const _session = await UsersSessions.findOne({
      token: token
  }).populate('user');

  // 判別 Session 是否存在
  if(!_session){
    return res.err({code: 996, detail: '無效的 Token'});
  }

  // 判別 Token 是否過期
  if(new Date().getTime() > _session.expiresAt) {
    return res.err({code: 995});
  }

  // 如果沒有過期，則自動延長 Token 有效時間
  const _extendExpirationTime = await UsersSessions.update({
      token: token
  }).set({
      expiredAt: new Date().getTime() + sails.config.custom.user_session_time * 60 * 1000
  });

  // 在 session 中寫回 user 資料後繼續
  req.session.user = _session.user;
  return next();

}
