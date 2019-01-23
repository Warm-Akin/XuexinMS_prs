import { get } from '../utils/httpHelper';

// module.exports = {

  async function getHello () {
    const url = `/xuexin/ahn/test`;
    const body = await get(url);
    return body.data;
  }
// };
export {
  getHello
};
