import { MessageDto } from '../core/MessageDto'
import { axios } from '../utils/axios'

export enum MessageUrl {
  sendMessage = 'SendMessage',
  receiveMessage = 'ReceiveNotification',
  deleteNotification = 'DeleteNotification',
}

export default abstract class MessageApi {
  public static sendMessage({ arg }: { arg: { message: string; chatId: string } }) {
    const url = `/waInstance${sessionStorage.getItem('idInstance')}/${MessageUrl.sendMessage}/${sessionStorage.getItem(
      'apiTokenInstance'
    )}`

    return axios.post<void, void, { message: string; chatId: string }>(url, arg)
  }

  public static getMessages() {
    const url = `/waInstance${sessionStorage.getItem('idInstance')}/${
      MessageUrl.receiveMessage
    }/${sessionStorage.getItem('apiTokenInstance')}`

    return axios.get<MessageDto>(url)
  }

  public static deleteNotification({ arg }: { arg: string }) {
    const url = `/waInstance${sessionStorage.getItem('idInstance')}/${
      MessageUrl.deleteNotification
    }/${sessionStorage.getItem('apiTokenInstance')}/${arg}`

    return axios.delete<void, void, string>(url)
  }
}
