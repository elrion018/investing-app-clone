import axios from 'axios';
import { range } from '../../../domain/utilFunc';

const state = () => {
  //
};

const getters = {
  //
};

const mutations = {
  //
};

const actions = {
  /**
   * getRandomRepls
   * @property replId
   * @property userThumbnail
   * @property userName
   * @property date
   * @property contents
   * @property likes
   * - ReplySection 개발/테스트를 위한 randomuser.me API, metaphorpsum API 활용
   * - @see https://randomuser.me/documentation#multiple
   * - @see http://metaphorpsum.com/
   */
  getRandomRepls: async (): Promise<void | object> => {
    try {
      const nums = 15;

      const {
        data: { results },
        status,
        statusText,
      } = await axios.get(`https://randomuser.me/api/?results=${nums}`, { responseType: 'json' });
      if (status >= 400) throw new Error(statusText);

      const {
        data: messages,
        status: msgStatus,
        statusText: msgStatusText,
      } = await axios.get(`http://metaphorpsum.com/paragraphs/${nums}`, { responseType: 'text' });
      if (msgStatus >= 400) throw new Error(msgStatusText);

      const messagesArr = messages.split('\n\n');

      const randomRepls = Array.from({ length: nums });
      for (const i of range(0, nums)) {
        const {
          login: { uuid, username },
          picture: { thumbnail },
        } = results[i];

        const randomDate = new Date(Date.now() * Math.random());
        const date = `'${randomDate
          .getFullYear()
          .toString()
          .slice(-2)}/${(randomDate.getMonth() + 1).toString().padStart(2, '0')}/${randomDate
          .getDate()
          .toString()
          .padStart(2, '0')}`;
        randomRepls[i] = {
          replId: uuid,
          userThumbnail: thumbnail,
          userName: username,
          date,
          contents: messagesArr[i],
          likes: Math.floor(Math.random() * 15),
        };
      }

      return randomRepls;
    } catch (e) {
      return console.error(e);
    }
  },
};

const Reply = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default Reply;
