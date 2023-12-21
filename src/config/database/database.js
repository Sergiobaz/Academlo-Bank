import { Sequelize } from 'sequelize';
import { envs } from '../enviorments/enviorments.js';

export const sequelize = new Sequelize(envs.DE_URI, {
  logging: false,
});

export async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection success 😎');
  } catch (error) {
    throw new Error('Error al autenticar: ', error);
  }
}

export async function syncUp() {
  try {
    await sequelize.sync();
    console.log('Synchonize success 👌');
  } catch (error) {
    throw new Error('Error al sincronizar: ', error);
  }
}

export default sequelize;
