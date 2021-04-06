# This is a site de rencontre project.

## Architecture MVC, MVCS possible 

## The main parts:
* inscription and connexion
* a profile page for user to change their informations
* a main page to see the others users
* a chatbox to communicate if two person have liked each other
* a surchbar to allow user to surch other profile
* the pages with questions during inscription will allow the calculte their compatibility

## the technolgies for creating this site:
* Font: react. The site is a training project. Donc I have used both classic react ,react hook, reac router for training purpose. So the code is not very consistency.
* Back: nodejs avec Express as framework
* DB: Mysql

## Back detail explication:
### data direction:
#### the fakeDatas creatation:
* In order to begin the project, we need at least 500+ fake profiles data, each profile has a fake photo, name, adress, login, sex, orientation, age, birthday. The final data are stored in Back/data/dummy-datas. The following list are the technologies that I used to create all fake data, some source code are in fake_generator, some are are not included inside this repo:
  - faker: I use faker to generate base fake information
  - bcypt: to genetate hash fake password
  - uuid: to generation ramdom tocken for the user indentification
  - cheerio: I use cheerio to scraping the model's website, so I can get nice profile pictures. ;)
  - randomLocation: I use randomLocation to get latitude and longitude of a random place within 700km of NotreDame de Paris.
  - NodeGeocoder : I use NodeGeocoder to get the detail geo information like the city name, street name, postal number from a place with its latitude and longitude information. I found that their data are very precise and complete compared to other API.
#### api.js 
* this fichier contains the Api functions to get data from DB and pass them to Back/router.js
* BAApi_helpers.js: the Api fichier is too big, I try to seperate it.
### email:
* use nodeMail to send mail. perhaps I can creat a more personalised email content?
* user inscription get valided via email. and if someone liked the user, he can be informed per email.

## Font detail explication:
* I created this react project from scratch, so I did not use the build-in create-react-app
* for configuration: I use webpack to bundle all parts together + babel for js, jsx.
* for training propose, the react writing style are quite mixed: use tradictional class, class-properties-proposal, hook.

### framework for font: bootstrap4 et jquery.

### dotenv and .env
* the config variable stocked in .env and we get access to them with dotenv.
* one cavea is that when I start a script 'node createDB.js' in the direction of Back/config/, since there is no .env, so we do not have access to env varialbe. 
* solution: start the command node from the direciton where stock the .env

* the same problem can be happen for data/initData/dataSetup:
* need to lancer le node depuis le root, as .env is in the root, and the relative path of dummydata is relative to the root too.

### typescript part
* description: inorder to use some design pattern and create clean code, I integrated typescript here.
* nessessary packages: typescript, @types/express (for express)
* add to package.json
    <code>
    "scripts": {
            "tsc": "tsc"
          },
    </code>
* shell command: 
  * init a tsconfig.json : npm run tsc -- --init 
  * to transpile Typescript : npm run tsc 
  * use ts-node to executing ts without transpile only for dev env : npm install -g ts-node
  * ts-node script.ts
* class nomination with Maj, but the file is in Miniscule
* Expresso : 
  * !! operation, if var a = null/undefined/0/'' and var a, !!a = false, !a =true
  * attention: for a = [] or {} is contrary, !!a = true, !a = false
  * !! can be used to juge wether a value base variable is declared and nullable value

### database
* my problem consiste of how to acces to mysql of bitnamie
* to access to local mariadb : sudo mariadb or sudo mysql
* to access to bitnamie mysql, dans le dir /bitnamie/mysql : bin/mysql -u root -p
* the two bases de données ne sont pas les mêmes.

### mysql command cheetsheet 
* connect: mysql -u username -ppassword
* mysql show databases;
* mysql use yourDB;
* exit / quite
## the command below consite of once we have selected the db
* show tables;
* describe one_table;

## to test the project:(work not finish yet)
* you need to have the local mysql server. 
* under both Front/Back direction to start the npm

### todo
* transfert les function dans router.js and api to service/new structure
  * fusionner les villes et arrondissement dans init
  * add user model interface , import to service
  * solve the problem of filterUsers type related
  * fetch user one critera by one and then get the intersection of them
  * change back the publi function en private
* restructurer les routes et controllers, api
* refaire une jolie front
* a voir la détaille par rapport a match priority
* create base service by inspired from basecontroller write baseService error
* routes: security(inscrire, loginIn), user(public, privé), match(voir les photos, filter), notification(), chat(fixe sur footer chaque page) 
* authentification / do security controller
* les modules commun de la part de front
* les functions back
* getter and setter for entity:https://khalilstemmler.com/blogs/typescript/getters-and-setters/
* tracer l architecture avec le schema
* 
* reimport data sql file 
//drop database et reinitim gitpush


