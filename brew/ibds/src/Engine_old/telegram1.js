const path = require('path');
const MTProto = require('@mtproto/core');

const api_id = 7281870;
const api_hash = 'f601f39cd0d629b5b95c14db53d6133a';

// 1. Create instance
const mtproto = new MTProto({
  api_id,
  api_hash,

  storageOptions: {
    path: path.resolve(__dirname, './data/1.json')
  }
});

// 2. Print the user country code
/* mtproto.call('messages.sendMessage', {
  clear_draft: true,

  peer: {
    _: 'inputPeerSelf'
  },
  message: 'Hello @mtproto_core',
  entities: [
    {
      _: 'messageEntityBold',
      offset: 6,
      length: 13
    }
  ],

  random_id: Math.ceil(Math.random() * 0xffffff) + Math.ceil(Math.random() * 0xffffff)
}).then(result => {
  console.log(result);
})
  .catch(err => console.log('>>. error', err)) */

mtproto.call('sendCode', {
  api_id,
  api_hash,
  phone_number: '+79200323847',
  settings: {
    allow_flashcall: false,
    current_number: false,
    allow_app_hash: false
  }
}).then(result => {
  console.log(result);
})
  .catch(err => console.log('>>. error', err));
/*

mtproto.updates.on('updatesTooLong', updateInfo => {
  console.log('updatesTooLong:', updateInfo);
});

mtproto.updates.on('updateShortMessage', updateInfo => {
  console.log('updateShortMessage:', updateInfo);
});

mtproto.updates.on('updateShortChatMessage', updateInfo => {
  console.log('updateShortChatMessage:', updateInfo);
});

mtproto.updates.on('updateShort', updateInfo => {
  console.log('updateShort:', updateInfo);
});

mtproto.updates.on('updatesCombined', updateInfo => {
  console.log('updatesCombined:', updateInfo);
});

mtproto.updates.on('updates', updateInfo => {
  console.log('updates:', updateInfo);
});

mtproto.updates.on('updateShortSentMessage', updateInfo => {
  console.log('updateShortSentMessage:', updateInfo);
});
*/
