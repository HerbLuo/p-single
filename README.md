### 简介

pSingle 用于处理异步操作
pSingle 包裹的异步操作在完成前不会再次执行。 
只有当 pSingle 包裹的异步操作执行完毕后，pSingle才会使其可能再次运行

### 使用方法

pSingle 接受一个参数，该参数是一个方法，该方法需返回Promise。  

```javascript 
import pSingle from './p-single.js'

// pSingle需要一个返回 Promise的方法
const doWhenClick = pSingle(function promiseReturnedFunc() {
  return new Promise(/*...*/)
})

// 或者直接使用 async
const getAccessToken = pSingle(async (username, password) => {
  // ...
})
```

如果你使用了 ES Next - decorator，你可以这样使用 pSingle

```javascript 
import {PSingle} from './p-single.js'

class Api {
  /**
   * 刷新 token
   * 该请求直到返回前不会再次发送，
   * 该请求返回结果后，每一个调用者都会收到正确的 Promise信号
   */
  @PSingle()
  oauthByRefreshToken (refreshToken) {
    return fetch(/*...*/)
      // ...
  }
}
export default new Api()
```