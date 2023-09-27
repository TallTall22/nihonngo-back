if(process.env.NODE_ENV!=='production'){
  require('dotenv').config()
}

const express=require('express')
const cors = require('cors')
const app=express()
const port=3001
const unit=require('./unit.json')
const cache = require('memory-cache');
const cacheTime = 24*24*60*60*1000;

//cors
const corsOptions = {
  origin: '*', // 指定允許的來源，可以是單個URL或一個函數
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 指定允許的HTTP方法
  allowedHeaders: 'Content-Type,Authorization', // 指定允許的HTTP標頭
}

app.use(cors(corsOptions))

// 引入Google Cloud客戶端庫
const textToSpeech = require('@google-cloud/text-to-speech');

// 創建一個客戶端
const client = new textToSpeech.TextToSpeechClient();

app.get('/', async (req, res, next) => {
  try {
    for (let i = 0; i < unit.length; i++) {
      for (const word of unit[i].vocabularies) {
        const wordKey = word.sentence; // 使用單詞作為緩存鍵
        const cachedSpeech = cache.get(wordKey);

        if (cachedSpeech) {
          // 如果緩存中有翻譯，直接返回它
          word.speech = cachedSpeech;
        } else {
          // 否則進行翻譯並存儲在緩存中
          const text = word.sentence;
          const request = {
            input: { text: text },
            voice: { languageCode: 'ja-JP', name: 'ja-JP-Neural2-B', ssmlGender: 'FEMALE' },
            audioConfig: { audioEncoding: 'MP3' }
          };

          const [response] = await client.synthesizeSpeech(request);
          word.speech = response.audioContent.toString('base64');

          // 存儲在緩存中，使用單詞作為緩存鍵
          cache.put(wordKey, word.speech, cacheTime);
        }
      }
    }

    // 將 JSON 對象作為回應發送給客戶端
    res.json(unit);
  } catch (error) {
    next(error);
  }
})

app.listen(port,()=>{
  console.info(`App is listening on localhost:${port}`)
})