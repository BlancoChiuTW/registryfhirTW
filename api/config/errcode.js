module.exports.errcode = {
  code: {
    // 100: 使用者相關
    100: {
      msg: '註冊失敗：該使用者已註冊',
      status: 400
    },
    101: {
      msg: '註冊失敗：資料檢核失敗',
      status: 400
    },
    102: {
      msg: '審核失敗：無此註冊單',
      status: 400
    },
    103: {
      msg: '登入失敗：帳號不存在',
      status: 400
    },
    104: {
      msg: '登入失敗：密碼錯誤',
      status: 400
    },
    105: {
      msg: '密碼重設失敗：帳號不存在',
      status: 400
    },
    106: {
      msg: '找不到使用者',
      status: 400
    },
    107: {
      msg: '密碼重設失敗：新密碼不符',
      status: 400
    },
    108: {
      msg: '密碼重設失敗：密碼錯誤',
      status: 400
    },
    109: {
      msg: '修改失敗：已有相同的 Mail',
      status: 400
    },
    110: {
      msg: '修改失敗：無法修改比自己高的權限',
      status: 400
    },
    111: {
      msg: '查詢失敗，無此使用者',
      status: 404
    },

    // IG 相關
    200: {
      msg: '找不到 IG',
      status: 400
    },
    201: {
      msg: '無法修改不是由自己發布的 IG',
      status: 403
    },
    202: {
      msg: '找不到 IG Category',
      status: 400
    },
    203: {
      msg: '找不到 IG Edition',
      status: 400
    },
    204: {
      msg: '請至少指定一個 IG 版本',
      status: 400
    },

    // 網站結構相關
    300: {
      msg: '找不到分類節點',
      status: 400
    },
    301: {
      msg: '分類節點新增失敗：資料檢核失敗',
      status: 400
    },

    // 文章相關
    400: {
      msg: '文章新增失敗：資料檢核失敗',
      status: 400
    },
    401: {
      msg: '文章新增失敗：無此上層分類 ID',
      status: 400
    },
    402: {
      msg: '文章新增失敗：無法新增於此上層分類',
      status: 400
    },
    403: {
      msg: '找不到文章',
      status: 400
    },

    // 申請相關
    500: {
      msg: '資料檢核失敗',
      status: 400
    },
    501: {
      msg: '無此申請單',
      status: 400
    },
    502: {
      msg: '本筆申請單已完成審核，無法重複審核',
      status: 400
    },

    // 連結相關
    600: {
      msg: '資料檢核失敗',
      status: 400
    },
    601: {
      msg: '無此連結',
      status: 400
    },

    // 積分相關
    700: {
      msg: '無此自填積分申請單',
      status: 400
    },
    701: {
      msg: '無此積分資料',
      status: 400
    },
    702: {
      msg: '會員資料格式錯誤',
      status: 400
    },
    703: {
      msg: '無效的活動 ID',
      status: 400
    },
    704: {
      msg: '本活動無法授予積分',
      status: 400
    },


    //- 900: 操作相關
    900: {
      msg: '操作失敗：尚未登入',
      status: 401,
    },
    990: {
      msg: '資料檢核失敗',
      status: 400,
    },
    991: {
      msg: '資料格式錯誤',
      status: 400,
    },
    992: {
      msg: '權限不足，拒絕存取',
      status: 403,
    },
    993: {
      msg: 'AppSecret 錯誤',
      status: 401,
    },
    994: {
      msg: '資料庫寫入失敗',
      status: 500,
    },
    995: {
      msg: '登入階段已過期（Session Expired）',
      status: 440,
    },
    996: {
      msg: '找不到有效的 Token 或是 Token 錯誤',
      status: 401,
    },
    997: {
      msg: '找不到該項設定',
      status: 401,
    },
    998: {
      msg: '測試階段：會員無法升級或降級',
      status: 400,
    },
    999: {
      msg: '未知的錯誤',
      status: 500,
    },
  }
};
