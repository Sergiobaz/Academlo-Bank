import { TransferService } from '../transfers/transfer.service.js';
import { UserService } from './user.service.js';

export const singup = async (req, res) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.floor(Math.random() * 900000) + 100000;

    const user = await UserService.create({ name, password, accountNumber });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server errror',
      error,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await UserService.login({ accountNumber, password });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'AccountNumber or password not valid',
      });
    }
    return res.status(200).json({
      message: 'you have been logged',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server errror',
      error,
    });
  }
};
export const getHistory = async (req, res) => {
  try {

    const { id } = req.params 

    const userHistory = await TransferService.transferHistoryById(id)

    if (!userHistory) {
      return res.status(404).json({
        status: "error",
        message: "user nor found"
      })
    }

    return res.status(200).json(userHistory)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server errror',
      error,
    });
  }
};
