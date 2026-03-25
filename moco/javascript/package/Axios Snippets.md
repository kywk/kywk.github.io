---
title: Axios Snippets
description: 'Node.js: Axios 常用程式碼片段與使用技巧'
tags:
  - Node.js
  - Nodejs/Axios
  - HTTP
sidebar_position: 60
hide_table_of_contents: false
date_created: 2023-01-07T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /javascript/package/axios-snippets/
---

[Node.js] Axios Snippets
========================

Axios 是一個基於 Promise 的 HTTP 客戶端，適用於瀏覽器和 Node.js 環境。
本文整理常用的 Axios 程式碼片段與使用技巧。



基本使用
-------

### 安裝

```bash
npm install axios
```

### GET 請求

```javascript
const axios = require('axios');

// 基本 GET 請求
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// 帶參數的 GET 請求
axios.get('https://api.example.com/data', {
  params: {
    id: 123,
    name: 'example'
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### POST 請求

```javascript
// JSON 格式 POST
axios.post('https://api.example.com/data', {
    name: 'John',
    email: 'john@example.com'
  })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// 使用 async/await
async function postData() {
  try {
    const response = await axios.post('https://api.example.com/data', {
      name: 'John',
      email: 'john@example.com'
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```



進階技巧
-------

### x-www-form-urlencoded 格式

處理 `application/x-www-form-urlencoded` 格式的請求：

```javascript
const qs = require('qs');

axios.post('https://api.example.com/data',
  qs.stringify({
    name: 'John',
    email: 'john@example.com'
  }),
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
);
```

或使用 URLSearchParams：

```javascript
const params = new URLSearchParams();
params.append('name', 'John');
params.append('email', 'john@example.com');

axios.post('https://api.example.com/data', params);
```

### 攜帶 Cookie

讓請求自動攜帶 Cookie：

```javascript
axios.get('https://api.example.com/data', {
  withCredentials: true
});

// 或設定全域配置
axios.defaults.withCredentials = true;
```

### 處理 302 重定向

Axios 預設會自動跟隨重定向，但在某些情況下可能需要手動處理：

```javascript
axios.get('https://api.example.com/data', {
  maxRedirects: 0,  // 不自動跟隨重定向
  validateStatus: function (status) {
    return status >= 200 && status < 400; // 接受 3xx 狀態碼
  }
})
  .then(response => {
    if (response.status === 302) {
      console.log('重定向到:', response.headers.location);
    }
  })
  .catch(error => {
    if (error.response && error.response.status === 302) {
      console.log('捕獲到 302 重定向');
    }
  });
```

### 設定請求超時

```javascript
axios.get('https://api.example.com/data', {
  timeout: 5000  // 5 秒超時
})
  .catch(error => {
    if (error.code === 'ECONNABORTED') {
      console.log('請求超時');
    }
  });
```

### 攔截器 (Interceptors)

```javascript
// 請求攔截器
axios.interceptors.request.use(
  config => {
    // 在發送請求前做些什麼
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 響應攔截器
axios.interceptors.response.use(
  response => {
    // 對響應數據做些什麼
    return response;
  },
  error => {
    // 對響應錯誤做些什麼
    if (error.response.status === 401) {
      // 處理未授權
    }
    return Promise.reject(error);
  }
);
```

### 建立實例

```javascript
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.get('/data')
  .then(response => console.log(response.data));
```



See Also
--------

### 官方文件

- [Axios 官方網站](https://axios-http.com/)
- [GitHub - axios/axios](https://github.com/axios/axios)

### 參考資源

- [JavaScript基本功修練：Day29 - axios基本語法與練習(GET、POST請求)](https://ithelp.ithome.com.tw/articles/10253259)
- [[axios] 處理 x-www-form-urlencoded 格式問題 | Nomi Su@Coding](https://jeremysu0131.github.io/axios-處理-x-www-form-urlencoded-格式問題/)
- [axios讓請求攜帶cookie的一些小問題](https://www.jianshu.com/p/0bc30d522244)
- [axios go in catch function instead of then, if status is 302 - Stack Overflow](https://stackoverflow.com/questions/53480518/axios-go-in-catch-function-instead-of-then-if-status-is-302)
- [關於 axios 302 重定向的問題](https://xudany.github.io/axios/2020/07/14/關於-axios-302-重定向的問題/)

