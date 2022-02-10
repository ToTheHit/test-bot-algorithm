// const prompt = require('prompt');
// const API = require('./telegram');
import API from './telegram';

const api = new API({ test: true });

async function main() {
  const user = await api.getUser();

  console.log('User 1st try: ', user);

  const phone = '+79200323847';
  const code = '29915';

  if (!user) {
    // const { phone } = await prompt.get('phone');
    const { phone_code_hash } = await api.sendCode(phone);

    // const { code } = await prompt.get('code');

    try {
      console.error('>> TEST', {
        code,
        phone,
        phone_code_hash
      });
      const signInResult = await api.signIn({
        code,
        phone,
        phone_code_hash
      });

      console.log('>> signInResult', signInResult);

      if (signInResult._ === 'auth.authorizationSignUpRequired') {
        const singUpResult = await api.signUp({
          phone,
          phone_code_hash
        });

        console.log('>>> singUpResult', singUpResult);
      }

      const newUser = await api.getUser();

      console.log('User 2nd try: ', newUser);
    } catch (error) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        console.log('error:', error);

        return;
      }

      // 2FA...
    }
  }

  const result = await api.call('help.getNearestDc');

  console.log('>>> RESULT', result);
  process.exit(0);
}

main();
