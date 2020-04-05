const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var greet = express.Router();
/*********** route ********************** */
greet.get('/jp', (req, res)=>{
    console.log(req.baseUrl);
    res.send('Konichiwa');
})
app.use(['/gre+t', '/hel{2}o'], greet);

/******************************************** */


/************bodyParser******************* */
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
//app.use('/static', express.static(path.join(__dirname, 'public')))
app.use((req, res)=>{
    res.setHeader('Content-Type', 'text/plain');
    res.write('you posted :\n');
    res.end(JSON.stringify(req.body, null, 2))
})
app.post('/profile', (req, res, next)=>{
    console.log(req.body);
})
app.get('/pro', (req, res)=>{
    console.log(req.body);
})
/************************************************ */
app.set('trust proxy', 'loopback');

app.listen(3000, ()=>{
    console.log('listen on 3000');
})