export type MessageDto = {
  body: {
    typeWebhook: 'incomingMessageReceived'
    idMessage: string
    timestamp: number
    messageData: {
      textMessageData: {
        textMessage: string
      }
      typeMessage: 'textMessage'
    }
    senderData: {
      sender: string
      senderName: string
    }
  }
  receiptId: number
}
