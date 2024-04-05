const d = require('date-fns');

module.exports = async function (req, res, next) {
  delete req.session.user;

  if (!req.headers.authorization || !req.headers.authorization.includes('Bearer ')) {
    // 如果還沒登入，就把 req.session.user 設定為 null
    req.session.user = null;
    return next();
  }

  const token = req.headers.authorization.substring(7);

  const _session = await User_sessions.findOne({
      token: token
  }).populate('user');

  // 判別 Session 是否存在
  if(!_session){
    return res.err({code: 996, detail: '無效的 Token'});
  }

  // 判別 Token 是否過期
  if(d.isAfter(d.parseISO(new Date()), d.fromUnixTime(parseFloat(_session.expiredAt)/1000))) {
    return res.err({code: 995});
  }

  // 如果沒有過期，則自動延長 Token 有效時間
  const _extendExpirationTime = await User_sessions.update({
      token: token
  }).set({
      expiredAt: d.add(new Date(), {hours: 3}).valueOf()
  });

  // 在 session 中寫回 user 資料後繼續
  req.session.user = _session.user;

  return next();

}
