import app from './app.js';
import { authenticate, syncUp } from './config/database/database.js';
import { envs } from './config/enviorments/enviorments.js';

async function main() {
  try {
    authenticate();
    syncUp();
  } catch (error) {
    console.error(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`server running on port ${envs.PORT} 😎`);
});
