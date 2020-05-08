const cheerio = require('cheerio')
const axios = require('axios')
const tagUrl = 'https://top-hashtags.com/instagram/'
const tagUrl2 = 'https://top-hashtags.com/instagram/201'
const fs = require('fs')

let pages = ['','101', '201', '301', '401', '501']
let listTags = []
//not include to, from and to is number; like 0-2, from page0 to page2(exclude) : page0 and page1
async function getTags(from, to){
    for(let i = 0; i < to; i++){
        let page = pages[from + i]
        let url = `${tagUrl}${page}`
        let raw = await axios.get(url)
        let $ = cheerio.load(raw.data)
        let tags = $('.i-tag').text()
        let list = tags.split('#')
        list.shift()
        listTags = [...listTags, ...list]
    }
}
//choose from 0 to 5
getTags(0,2).then((res)=>{
    console.log(listTags.indexOf('school'))
    let data = JSON.stringify(listTags)
    fs.writeFileSync('./dummy_tags.json', data)
})


