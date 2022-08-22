# auto-karaoke-lyrics的前端服务器
this is auto-karaoke-lyrics frontend repo use with nextjs.

backend repo and more infomation here -> <https://github.com/March-mitsuki/auto-karaoke-lyrics>

## Getting Started
启动开发服务器
```bash
npm run dev
```
创建部署版本并开始
```bash
npm run build
npm run start
```
导出静态服务器
```bash
npm run export
```

Open [http://localhost:19810](http://localhost:19810) with your browser to see the result.

### Todo
- [ ] 输入sort改为自动检测
- [x] 现在校准只能往前走(按慢了可以调,按快了就寄了)得修
    - [x] 增加暂停功能
    - [ ] 当前核心逻辑为查找后遍历, 可改为每次查找?
- [x] 增加自定义display-css的功能
    - [ ] 增加可自定义css-animation功能
    - [ ] 修改手动输入css为样式生成器
- [x] 增加可以交换text和ruby位置的功能
    - [ ] 把checkbox换成toggle
- [x] 增加修改歌曲memo的功能
- [ ] 前端增加自定义顺序的功能
- [ ] 现在数据储存在localStorage, 可以改成储存到服务器,每次onconnection发送当时数据进行初始化
- [ ] 增加可以添加空行(空setlist)的功能
- [ ] ~~增加播放过的行变暗的功能(可以手动取消变暗)~~
    - [ ] 完成了一半,现在的取消是保存在state里刷新就全亮了,探讨是否需要保持状态
- [ ] 整理难看的代码, 使得自建服务器只需要调整config
- [ ] 增加多房间播放功能
- [ ] 对localStorage的type进行定义, 增加代码稳定性
- [ ] 修改代码, 抑制所有不需要default event和propagetion event的按钮