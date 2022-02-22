import telegramUserModel from '@models/telegramUser.model';
import debouce from '@utils/debounce';

export default class TempLocalStorage {
  public storage;
  private phone;

  constructor(phone) {
    this.phone = phone;
    this.storage = new Map();
  }

  private setStorageDb = debouce(1000, false, async () => {
    await telegramUserModel.updateOne(
      {
        phone: this.phone,
      },
      {
        $set: { mtprotoStorage: this.storage },
      },
    );
  });

  private updateStorageFromDB = async () => {
    const { mtprotoStorage } = await telegramUserModel
      .findOne({
        phone: this.phone,
      })
      .select('mtprotoStorage')
      .lean();
    this.storage = new Map(Object.entries(mtprotoStorage));
  };

  async set(key, value) {
    this.setStorageDb();

    return this.storage.set(key, value);
  }

  async get(key) {
    if (this.storage.size === 0) {
      await this.updateStorageFromDB();
    }

    return this.storage.get(key);
  }
}
