import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjIxNDY1NDUsImV4cCI6MTYyMjE1MDE0NSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJuYW1lIjoiYWRtaW4iLCJzdXJuYW1lIjoiYWRtaW4ifQ.rYm5Rv7Q1ketP54EUAm4_4i7g8lYJMOiO2N50zLhAtbOzZYfFBRKL9hR9aWsm9_VlIPwY8JNbexxmA_oSLovDAJBrFmjHbx0VmZ_zcMoL2cEEsuKpKzek2taXdiP3gCC1oODM5iR7b1V0qylu0YeClgX-m_m9cGwzoyURqmw85XNyhudkLDVmtcII1dn9YD8KSwO1ZdDF32zixUMiOi4Q2BYSMNwfKuiWgJRNynzWCABsbCQ1FNpK_IWLRsRxTRELlzWZbXUIe57MTua2B8IF7emD9QIymquj-iSzdX8C31j8dqELEak9kjJBtHou1LOXI3uGFonMNX8TQwPptDm_w',
  },
});

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       store.dispatch(logout());
//     }
//     return error;
//   }
// );

export default instance;
