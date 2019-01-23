import { getHello } from '../repository/hello.repository';

// class HelloService {
  async function getHelloService () {
    const data = await getHello();
    return data || [];
  }
// }

// module.exports = new HelloService();
export {
  getHelloService
};


// module.exports = {
//   async getHelloService () {
//     const data = await getHello();
//     return data || [];
//   },
//   async getHelloService2 () {
//     const data = await getHello();
//     return data || [];
//   }
// };
