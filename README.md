# 日文單字列表

這是一個使用 Node.js 開發的日文單字網站後端，幫每個單字加上例句與串接Google語音來幫忙加強記憶，還有考試模式可以練習，單字來源:大家的日本語

<br>
<br>
<br>

# Readme 大綱
- [簡介](#簡介)
- [專案初始化](#專案初始化)
  - [前置作業](#前置作業)
  - [安裝](#安裝)
  - [啟動專案](#啟動專案)
- [預設使用者](#預設使用者)
- [開發工具](#開發工具)

<br>
<br>

# 簡介
- 可在網站上查看單字
- 查看單字例句、聆聽例句的語音
- 使用考試模式來測驗背誦成果

<br>
<br>

# 專案初始化
## **前置作業**
已安裝 node 和 npm

<br>

## **安裝**
1. Clone 專案
```
 git clone https://github.com/TallTall22/nihonngo-back

 cd nihonngo-back
```

<br/>

2. 安裝套件
```
npm install
```

<br/>

3. 新增.env檔並且參考 .env example設置環境變數 

<br/>



## **啟動專案**

1. 啟動專案
```
npm run dev
```

如果成功會看到 App is listening on localhost:3001

<br>

2. 停止專案
```
control + c
```
<br/>
<br/>


# 開發工具
- "@google-cloud/text-to-speech": "^5.0.1",
- "cors": "^2.8.5",
- "dotenv": "^16.3.1",
- "express": "^4.18.2",
- "memory-cache": "^0.2.0"
<br>
<br>


