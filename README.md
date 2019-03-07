# cnode-react
> 可在[CNodejs社区注册账号，使用AccessToken登录](https://cnodejs.org/)
> [create-react-app@2.x.x](https://facebook.github.io/create-react-app/)  
> CRA@2.x.x 默认支持css或scss module，.module.scss或者.module.css的样式文件，支持样式文件切分  
> [访问地址](https://jekorx.github.io/cnode-react)，由于路由是history模式（无法配置github web服务器），在非 / 目录刷新会404  

## 更早的版本
> [branch cra-1.1.4](https://github.com/jekorx/cnode-react/tree/cra-1.1.4)，使用stylus module，但不支持样式文件切分  

## Tech Stack
> 1、[antd-mobile](https://mobile.ant.design/docs/react/introduce-cn)，移动UI  
> 2、fetch    
> 3、[mobx](https://cn.mobx.js.org)，状态管理  
> 4、[mobx-react](https://github.com/mobxjs/mobx-react)，包含React组件包装器的包，用于将React与MobX相结合  
> 5、[prop-types](https://github.com/facebook/prop-types)，props变量类型检测  
> 6、[react](https://reactjs.org)  
> 7、[react-router](https://github.com/ReactTraining/react-router#packages)，react-router-dom自动引入react-router  
> 8、[react-loadable](https://github.com/jamiebuilds/react-loadable)，以组件为中心的代码分割和懒加载  
> 9、[react-app-rewired](https://github.com/timarney/react-app-rewired)，不使用eject，修改项目配置  
> 10、[customize-cra](https://github.com/arackaf/customize-cra)，用于自定义利用react-app-rewired核心功能的Create React App v2配置  
> 11、[react-hot-loader](https://github.com/gaearon/react-hot-loader)，热更新，开发时使用  

## Directory Structure
```bash
├─ .editorconfig # 编辑器配置
├─ .env.production # 自定义生产环境的环境变量
├─ .env.development # 自定义开发环境的环境变量
├─ .eslintignore # 校验忽略
├─ .eslintrc # 校验配置
├─ .gitattributes # git属性
├─ .gitignore # git提交忽略
├─ config-overrides.js # react-app-rewired配置文件
├─ README.md
├─ package.json
├─ yarn.lock
├─ public # 静态资源
│    └─ index.html # 默认html模版
├─ build # 打包后目录
└─ src # 源代码
     ├─ api # 请求api
     │    └─ index.js # axios相关配置
     ├─ assets # 相关资源
     │    ├─ images # 资源图片
     │    └─ styles # 样式
     ├─ components # 自定义组件
     ├─ routes # 路由
     │    └─ index.js # 路由相关配置
     ├─ store # mobx
     │    └─ index.js # 整合
     ├─ layouts # 布局相关
     ├─ pages # 相关页面
     ├─ App.jsx # 根页面
     └─ index.js # 入口文件
```
