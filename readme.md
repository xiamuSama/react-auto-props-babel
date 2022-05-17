## 利用babel给对应的react组件添加props
    npm i && npm start

## 引入格式
`
 "plugins": [
      [
        "babelUlr",
        {
          "ComponentName": {
            "customerProp": "value"
          }
        }
      ]   
    ]
`
<br>
`====for example====`
<br>
`
"plugins": [
      [
        "./config/autoPropsBabel.js",
        {
          "VscodeSchemaCore": {
            "data-vscode-schema": "{FILE_SOURCE}"
          }
        }
      ]   
    ]
`

## 可拓展的用途
    1. 目前我是用于bugfix.在目标页面,右键打开vscode，快速定位到问题代码. 
        react代码里埋点，将各个tsx文件的相对位置注入到props里。通过chrome插件获取对应schema，URL协议的方式唤起本地vscode。
    2. 给所有的组件注入公共className(如Button)
    3. 等
