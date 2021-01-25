// 引用line機器人套件
import linebot from 'linebot'
// 引用 dotenv 套件
import dotenv from 'dotenv'
// 引用axios套件
import axios from 'axios'

import schedule from 'node-schedule'

// 讀取.env
dotenv.config()

let informations = []

const updateDate = async () => {
  const response = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
  informations = response.data
}

schedule.scheduleJob('0 0 0 * * *', function () {
  updateDate()
})
updateDate()
// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
  try {
    const text = event.message.text
    const reply2 = {
      type: 'flex',
      altText: 'Flex',
      contents: {
        type: 'carousel',
        contents: [
        ]
      }
    }
    let count = 0
    let stopnum = 0
    if (text.includes('找找家')) {
      stopnum += 5
      for (const inform of informations) {
        if (text.includes(inform.animal_kind) && text.includes(inform.animal_sex) && text.includes(inform.animal_place.slice(0, 2)) && count < stopnum) {
          count++
          const content = {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: inform.shelter_name,
                          size: 'xl',
                          color: '#ffffff',
                          weight: 'bold'
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: inform.shelter_address,
                          color: '#ebebeb',
                          size: 'sm',
                          flex: 0
                        },
                        {
                          type: 'text',
                          text: inform.shelter_tel,
                          color: '#ffffffcc',
                          gravity: 'bottom',
                          flex: 0,
                          size: 'sm'
                        }
                      ],
                      spacing: 'lg'
                    }
                  ],
                  position: 'absolute',
                  offsetBottom: '0px',
                  offsetStart: '0px',
                  offsetEnd: '0px',
                  backgroundColor: '#a1c9c1bb',
                  paddingAll: '20px',
                  paddingTop: '18px'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '認養',
                      color: '#ffffff',
                      align: 'center',
                      size: 'xs',
                      offsetTop: '7px'
                    }
                  ],
                  position: 'absolute',
                  cornerRadius: '20px',
                  offsetTop: '20px',
                  backgroundColor: '#a1c9c1',
                  offsetStart: '20px',
                  height: '30px',
                  width: '70px'
                }
              ],
              paddingAll: '0px'
            }
          }
          if (inform.album_file.length > 0) {
            content.body.contents.unshift(
              {
                type: 'image',
                url: inform.album_file,
                size: 'full',
                aspectMode: 'cover',
                aspectRatio: '2:3',
                gravity: 'top'
              })
          }
          reply2.contents.contents.push(content)
        }
      }
      if (count > 25) {
        count = 0
        stopnum = 0
        console.log('沒了')
      }
    }
    event.reply(reply2)
    // fs.writeFile('./flex.json', JSON.stringify(reply2), () => {
    // })
  } catch (error) {
    event.reply('發生錯誤')
    console.log(error)
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
