// initial return hello

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const AIMLParser = require('aimlparser')

const app = express()
const port = process.env.PORT || 4000

const aimlParser = new AIMLParser({name: 'HelloBot'})
aimlParser.load(['./test-aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {

    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    aimlParser.getResult(msg, (answer, wildCardArray, input) => {
        reply(reply_token, answer)
    })
    
    res.sendStatus(200)
})

app.listen(port)

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {leSLT6TM73BCkORSMedsDEI0MfrS29lfV6wIIsXbF6UmJ5Y2d+Y80RAlxtIkfFuPhJOL5+8lx4Wyv6ojj1Eibr04O1n3fORRGHwUnIyM8tfV//liRGkp73cDYiCTN/ZTkd42KICBYRCWO4ctm02u/wdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        /*
        messages: [{
            type: 'text',
            text: 'Hello I am sunny'
        },
        {
            type: 'text',
            text: 'How can I help you?'
        }]*/

        messages: [{
            type: 'text',
            text: msg
        }]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {

        console.log('status = ' + res.statusCode);
    });
}