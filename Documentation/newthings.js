//1) Parse incoming requests data (https://github.com/expressjs/body-parser)
//2) post in react
//   there are two ways to do it:
    //first way
    handleSubmit = async(e)=>{
       e.preventDefault()
       console.log(this.state)
       let res = await Axios.post('http://localhost:5000/api/', this.state)
    }

    //second way
    handleSubmit = (e)=>{
        e.preventDefault()
        fetch('http://localhost:5000/api/',{
            method:'post',
            headers: {
                aCcePt: 'aPpliCaTIon/JsOn', 
                'cOntENt-type': 'applicAtion/JSoN'
            },
            body: JSON.stringify(this.state)
        })
    }

//3)mysql
//prevent sql injection attack
var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);

//4) mysql pool promise async
//difinition of until.promisify : takes a function following the cn Node.js
//callback style, like (err, value)=> cb, callback as the last arguement, 
//and return a version that returns promises(.then(value), catch(err)).
const fs = require('fs');
fs.readFile('./index.js', 'utf8', (err, value) => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log(value);
    }
});
//===>> we can transfer the above version into
const fs = require('fs')
const until = require('util')
let readFile = until.promisify(fs.readFile)

readFile('index.js', 'utf8')
.then((value)=>{
    console.log(value)
})
.catch((err)=>{
    console.log(err)
})
/*============================================*/
async function doRead(){
    try{
        let value = await readFile('index.js', 'utf8')
        res.then(value)
    } catch(err){
        console.log(err)
    }
 
}
//===>>> mysql pool aswait until
var pool = require('./config/pool')
var until = require('util')
pool.query = until.promisify(pool.query)

const query = "INSERT INTO logins(login, email, password, tocken) VALUES('hehe', 'linlinfan21@gmail.com', '123', '456')"

async function doQuery(){
    try{
        let res = await pool.query(query)
        console.log(res);
    } catch(err) {
        console.log(err)
    }
}
doQuery()
        p.close()
        /*================== OR ==========================*/
pool.query(query).then((res)=>console.log(res)).catch((error)=>console.error(error));



//this function is a node normal function with (err, value) => callback
//we can use until.promisify to 

/*********************Ajax front and back **********************
Response {type: "cors", url: "http://localhost:5000/image-upload", redirected: false, status: 200, ok: true, …}
body: (...)
bodyUsed: false
headers: Headers {}
ok: true
redirected: false
status: 200
statusText: "OK"
type: "cors"
url: "http://localhost:5000/image-upload"
__proto__: Response

front//after res.json turn the response from back into an array
[
    0:
    bytes: 2627
    created_at: "2020-04-04T14:00:31Z"
    etag: "b1884f439094d6bcb3c91c850b2eeb94"
    format: "png"
    height: 64
    original_filename: "eo8ZowwK6GByGTFxbKWQSjhO"
    placeholder: false
    public_id: "ne5p5ojyt31c5f98nmeu"
    resource_type: "image"
    secure_url: "https://res.cloudinary.com/fannyfafafan/image/upload/v1586008831/ne5p5ojyt31c5f98nmeu.png"
    signature: "d53f7ebfb9ffa2c7b6a91cf403684ce591fa3c48"
    tags: []
    type: "upload"
    url: "http://res.cloudinary.com/fannyfafafan/image/upload/v1586008831/ne5p5ojyt31c5f98nmeu.png"
    version: 1586008831
    width: 64
]

 //req.files contains images's (temp, path, headers), size, name, type
    /* 
    {
      '0': {
        fieldName: '0',
        originalFilename: 'camera (1).png',
        path: '/tmp/2ezS628lJuwnh9KCku-Kzxod.png',
        headers: {
          'content-disposition': 'form-data; name="0"; filename="camera (1).png"',
          'content-type': 'image/png'
        },
        size: 2627,
        name: 'camera (1).png',
        type: 'image/png'
      }
      '1':{...}
    }
    //back:
  Object.values() return the object content of req.files into an object
   [
      {
        fieldName: '0',
        originalFilename: 'camera (1).png',
        path: '/tmp/S8sIfUpgGhaxoDpSlnto0z5f.png',
        headers: {
          'content-disposition': 'form-data; name="0"; filename="camera (1).png"',
          'content-type': 'image/png'
        },
        size: 2627,
        name: 'camera (1).png',
        type: 'image/png'
      }
      {
          ...
      }
    ]
   */

/*
the final data sended by res.json(data) from back to front
data is an array, so we need res.json to make it as json object.
so the data in the http pipeline is an object, when the data package 
arrive at front end, we need res.json() to make it to an array again.
that is why we have res.json(data) in back(express res.json() will transfer the data into json), and res.json in front

[
  {
    public_id: 'shmgq8bqyqyrcw2omwvf',
    version: 1586012507,
    signature: 'f2e2b44123932949d2bf3b0f235b26333b3b45c3',
    width: 250,
    height: 250,
    format: 'jpg',
    resource_type: 'image',
    created_at: '2020-04-04T15:01:47Z',
    tags: [],
    bytes: 16948,
    type: 'upload',
    etag: '87d130f93efafb868f12dc9b24c57436',
    placeholder: false,
    url: 'http://res.cloudinary.com/fannyfafafan/image/upload/v1586012507/shmgq8bqyqyrcw2omwvf.jpg',
    secure_url: 'https://res.cloudinary.com/fannyfafafan/image/upload/v1586012507/shmgq8bqyqyrcw2omwvf.jpg',
    original_filename: '4l85IxnPENVGiCkK1pG02ScM'
  }
]
*/