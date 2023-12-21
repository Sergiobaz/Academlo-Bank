import Transfer from './transfer.model.js';

export class TransferService {
  static async createRecordTransfer(amount, senderUserId, receiverUserId) {
    return await Transfer.create({
      amount,
      senderUserId,
      receiverUserId,
    });
  }

  static async transferHistoryById(id){
    return await Transfer.findAll({
      where:{
        senderUserId: id
      }
    })
  }
}
