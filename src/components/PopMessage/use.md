```html
<PopMessage ref="success" success>{{ message }}</PopMessage>
<PopMessage ref="fail">{{ message }}</PopMessage>
```

```js
  const message = ref('');
  const success = ref<any>(null);
  const fail = ref<any>(null);

try {
    //接口请求
      message.value = '...成功';
      success.value.popUp();
    } catch (err) {
      message.value = '...失败';
      fail.value.popUp();
    }
```
