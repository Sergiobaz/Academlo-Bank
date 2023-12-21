import { UserService } from '../users/user.service.js';
import { TransferService } from './transfer.service.js';

export const createTransfer = async (req, res) => {
  try {
    const { amount, recipientAccountNumber, senderAccountNumber } = req.body;

    const amountNumber = parseInt(amount, 10);

    const recipientUserPromise = UserService.findOneAccount(
      recipientAccountNumber
    );
    const senderUserPormise = UserService.findOneAccount(senderAccountNumber);

    const [recipientUser, senderUser] = await Promise.all([
      recipientUserPromise,
      senderUserPormise,
    ]);

    if (!recipientUser) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Recipient account does not exist' });
    }

    if (!senderUser) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Sender account does not exist' });
    }

    if (amount > senderUser.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'insufficient funds',
      });
    }

    const recipientUserToNumber = parseInt(recipientUser.amount, 10);
    const senderUserToNumber = parseInt(senderUser.amount, 10);

    const newRecipientBalance = recipientUserToNumber + amountNumber;
    const newSenderBalance = senderUserToNumber - amountNumber;

    console.log(newRecipientBalance, newSenderBalance);

    const updateSenderUserPromise = UserService.updateAmount(
      recipientUser,
      newRecipientBalance
    );
    const updateRecipientUserPorimise = UserService.updateAmount(
      senderUser,
      newSenderBalance
    );
    const transferPormise = TransferService.createRecordTransfer(
      amountNumber,
      senderUser.id,
      recipientUser.id
    );

    await Promise.all([recipientUserToNumber, senderUserToNumber]);

    res.status(201).json({ message: 'transfer OK!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server errror',
      error,
    });
  }
};
