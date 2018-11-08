### 简介

\[p-single] 用于处理异步操作  

\[p-single] 包裹的异步操作在完成前不会再次执行。   

只有当 \[p-single] 包裹的异步操作执行完毕后，\[p-single] 才会使其可能再次运行  


\[p-single] 的应用其实非常多，比如：

* 它可减少api的前置（如登陆）或者后置（如刷新token）请求数量。

* 对一个请求预加载时，当实际操作触发，此时如果预加载没有完成。
此时我们如果再次发送一个请求（用于刷新预加载的内容），显然时不合理的。
\[p-single] 恰好可以解决该问题。


### 安装
```bash
npm install --save p-single
```

### 使用方法

例1：pSingle 接受一个参数，该参数是一个方法，该方法需返回Promise。  

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

例2：如果你使用了 ES Next - decorator，你可以这样使用 pSingle

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
