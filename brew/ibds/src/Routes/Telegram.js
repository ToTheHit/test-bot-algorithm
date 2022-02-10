const { Router } = require('express');
const API = require('../Engine/telegram');

const telegramRouter = new Router();
const allowedIds = new Map([
  ['1793944123', '2nd profile']
]);
const api = new API();

let phone_code_hash = '';

telegramRouter.get('/auth', async (req, res) => {
  const user = await api.getUser();

  res.send(user || 'nothing');
});

telegramRouter.post('/code/send', async (req, res) => {
  const result = await api.sendCode(req.body.phone);

  console.log('>>> result', result);
  phone_code_hash = result.phone_code_hash;
  console.log('phone_code_hash', phone_code_hash);
  res.end(phone_code_hash);
});

telegramRouter.post('/code/accept', async (req, res) => {
  let signInResult;

  try {
    signInResult = await api.signIn(req.body.code, req.body.phone, req.body.phone_code_hash);
  } catch (error) {
    if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
      return res.send(error);
    }

    const password = '----';
    const { srp_id, current_algo, srp_B } = await api.getPassword();
    const {
      g, p, salt1, salt2
    } = current_algo;
    const { A, M1 } = await api.mtproto.crypto.getSRPParams({
      g,
      p,
      salt1,
      salt2,
      gB: srp_B,
      password
    });

    signInResult = await api.checkPassword({ srp_id, A, M1 });
  }

  console.log('signInResult', signInResult);
  const { user } = signInResult;

  res.send(signInResult);
});

telegramRouter.get('/test', (req, res) => {
  res.send('ok');
});

api.mtproto.updates.on('updates', updateInfo => {
  const messages = [];

  for (const { message } of updateInfo.updates) {
    if (!message) {
      continue;
    }

    if (allowedIds.get(message.peer_id.user_id)) {
      messages.push(message);
    }
  }
  if (messages.length) {
    console.log('updates', messages);
  }
});

api.mtproto.updates.on('updateShortMessage', updateInfo => {
  console.log(`updateShortMessage: ${updateInfo.out ? 'outgoin' : 'incoming'} > ${updateInfo.message}`);
});

api.mtproto.updates.on('updateShortChatMessage', updateInfo => {
  console.log('updateShortChatMessage:', updateInfo);
});

/* api.mtproto.updates.on('updateShort', updateInfo => {
  // console.log('updateShort:', updateInfo);
});

api.mtproto.updates.on('updatesTooLong', updateInfo => {
  console.log('updatesTooLong:', updateInfo);
});

api.mtproto.updates.on('updatesCombined', updateInfo => {
  // console.log('updatesCombined:', updateInfo);
});

api.mtproto.updates.on('updateShortSentMessage', updateInfo => {
  // console.log('updateShortSentMessage:', updateInfo);
});

api.mtproto.updates.on('updateNewMessage', updateInfo => {
  // console.log('updateNewMessage:', updateInfo);
});
api.mtproto.updates.on('updateMessage', updateInfo => {
  // console.log('updateNewMessage:', updateInfo);
}); */

module.exports = telegramRouter;
