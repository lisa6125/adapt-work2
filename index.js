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
    let reply = ''
    let count = 0
    let reply2
    const text = event.message.text
    if (text === '找找家') {
      if (count < informations.length) {
        count++
        // i++
        // if (i !== 0) {
        //   picshow += picshow + ','
        // }
        reply2 = {
          type: 'flex',
          altText: 'Flex',
          contents: {
            type: 'carousel',
            contents: [
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: `${informations[count].album_file}`,
                      size: 'full',
                      aspectMode: 'cover',
                      aspectRatio: '2:3',
                      gravity: 'top'
                    },
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
                              text: `${informations[count].shelter_name}`,
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
                              text: `${informations[count].shelter_address}`,
                              color: '#ebebeb',
                              size: 'sm',
                              flex: 0
                            },
                            {
                              type: 'text',
                              text: `${informations[count].shelter_tel}`,
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
                          text: `認養/${informations[count].animal_kind}/${informations[count].animal_sex}`,
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
              }, {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: `${informations[count + 1].album_file}`,
                      size: 'full',
                      aspectMode: 'cover',
                      aspectRatio: '2:3',
                      gravity: 'top'
                    },
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
                              text: `${informations[count + 1].shelter_name}`,
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
                              text: `${informations[count + 1].shelter_address}`,
                              color: '#ebebeb',
                              size: 'sm',
                              flex: 0
                            },
                            {
                              type: 'text',
                              text: `${informations[count + 1].shelter_tel}`,
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
                          text: `認養/${informations[count + 1].animal_kind}/${informations[count + 1].animal_sex}`,
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
              }, {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: `${informations[count + 2].album_file}`,
                      size: 'full',
                      aspectMode: 'cover',
                      aspectRatio: '2:3',
                      gravity: 'top'
                    },
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
                              text: `${informations[count + 2].shelter_name}`,
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
                              text: `${informations[count + 2].shelter_address}`,
                              color: '#ebebeb',
                              size: 'sm',
                              flex: 0
                            },
                            {
                              type: 'text',
                              text: `${informations[count + 2].shelter_tel}`,
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
                          text: `認養/${informations[count + 2].animal_kind}/${informations[count + 2].animal_sex}`,
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
              }, {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: `${informations[count + 3].album_file}`,
                      size: 'full',
                      aspectMode: 'cover',
                      aspectRatio: '2:3',
                      gravity: 'top'
                    },
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
                              text: `${informations[count + 3].shelter_name}`,
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
                              text: `${informations[count + 3].shelter_address}`,
                              color: '#ebebeb',
                              size: 'sm',
                              flex: 0
                            },
                            {
                              type: 'text',
                              text: `${informations[count + 3].shelter_tel}`,
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
                          text: `認養/${informations[count + 3].animal_kind}/${informations[count + 3].animal_sex}`,
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
              }, {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: `${informations[count + 4].album_file}`,
                      size: 'full',
                      aspectMode: 'cover',
                      aspectRatio: '2:3',
                      gravity: 'top'
                    },
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
                              text: `${informations[count + 4].shelter_name}`,
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
                              text: `${informations[count + 4].shelter_address}`,
                              color: '#ebebeb',
                              size: 'sm',
                              flex: 0
                            },
                            {
                              type: 'text',
                              text: `${informations[count + 4].shelter_tel}`,
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
                          text: `認養/${informations[count + 4].animal_kind}/${informations[count + 4].animal_sex}`,
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
            ]
          }
        }

        // if (count > informations.length) {
        //   count = 0
        //   reply2 = '都沒有囉'
        //   event.reply(reply2)
        // }
        event.reply(reply2)
      } else {
        count = 0
      }
    } else {
      for (const inform of informations) {
        if (text.includes(inform.animal_kind) && text.includes(inform.animal_colour) && text.includes(inform.animal_sex) && text.includes(inform.animal_place.slice(0, 3))) {
          reply += `${inform.animal_place} '\n' ${inform.shelter_address}  '\n'${inform.shelter_tel}` + '\n'
        }
      }
      console.log(reply)
      reply = (reply.length === 0) ? '找不到呦~~~' : reply
      event.reply(reply)
    }
  } catch (error) {
    event.reply('發生錯誤')
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
