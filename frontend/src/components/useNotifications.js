import { Notify } from 'quasar';

export function useNotifications() {
  const notifySuccess = (message) => {
    Notify.create({
      type: 'positive',
      message: message || '操作成功',
      timeout: 3000,
      position: 'top',
    });
  };

  const notifyError = (message) => {
    Notify.create({
      type: 'negative',
      message: message || '操作失败',
      timeout: 3000,
      position: 'top',
    });
  };

  const handleErrorResponse = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      let message = '未知错误';

      switch (status) {
        case 400:
          message = data.msg || '資料檢核失敗';
          break;
        case 401:
          message = data.msg || '請先登入';
          break;
        case 403:
          message = data.msg || '無法修改不是由自己發布的 IG';
          break;
        case 404:
          message = data.msg || '找不到資源';
          break;
        case 500:
          message = data.msg || '我掛了，請聯絡 Lorex';
          break;
        default:
          message = data.msg || `錯誤: ${status}`;
      }

      notifyError(message);
    } else {
      notifyError('未知錯誤');
    }
  };

  return {
    notifySuccess,
    notifyError,
    handleErrorResponse,
  };
}
