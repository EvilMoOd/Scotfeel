```html
<PopMessage ref="success" success>{{ message }}</PopMessage>
<PopMessage ref="fail">{{ message }}</PopMessage>
```

```js
try {
    //接口请求
      message.value = '...成功';
      success.value.popUp();
    } catch (err) {
      message.value = '...失败';
      fail.value.popUp();
    }
```
