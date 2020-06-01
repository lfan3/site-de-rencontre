# This is a site de rencontre project.

## The main parts:
* inscription and connexion
* a profile page for user to change their informations
* a main page to see the others users
* a chatbox to communicate if two person have liked each other
* a surchbar to allow user to surch other profile
* the pages with questions during inscription will allow the calculte their compatibility

## the technolgies for creating this site:
* Font: react. The site is a training project. Donc I have used both classic react and react hook for training purpose. So the code is not very consistency.
* Back: nodejs avec Express as framework
* DB: Mysql

## data direction:
### the fakeDatas creatation:
* In order to begin the project, we need at least 500+ fake profiles data, each profile has a fake photo, name, adress, login, sex, sex_orientation, age, birthday. The final data are stored in Back/data/dummy-datas. The following list are the technologies that I used to create all fake data, some source code are in fake_generator, some are are not included inside this repo:
  - faker: I use faker to generate base fake information
  - bcypt: to genetate hash fake password
  - uuid: to generation ramdom tocken for the user indentification
  - cheerio: I use cheerio to scraping the model's website, so I can get nice profile pictures. ;)
  - randomLocation: I use randomLocation to get latitude and longitude of a random place within 700km of NotreDame de Paris.
  - NodeGeocoder : I use NodeGeocoder to get the detail geo information like the city name, street name, postal number from a place with its latitude and longitude information. I found that their data are very precise and complete compared to other API.
### api.js 
* this fichier contains the Api functions to get data from DB and pass them to Back/router.js
* BAApi_helpers.js: the Api fichier is too big, I try to seperate it.

## email:
* use nodeMail to send mail
  
  

## to test the project:
* you need to have the local mysql server. 
* under both Front/Back direction to start the npm
