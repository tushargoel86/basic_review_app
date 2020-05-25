# basic_review_app

<p> Basic review app using Node, Express, React, React-Bootstrap, MongoDB using Docker </p>

Simple app with 2 features
  1. Add review
  2. List all reviews
  
# Technology stack
  1) Backend: Node JS, Express JS
  2) Front End: React, React Bootstrap
  3) DB: MongoDB using docker image

# Docker Steps:
1) Pull mongo image
```
 docker pull mongo
```
2) Start mongodb container on 27017 port with interative logging and volume mounted so that data will not be lost after container stops.

```
    docker run -it -v /data/db:/d/javascript/signatures -p 27017:27017 --name mongodb mongo
```
    
# How to verify:
```
  Run http://<docker-ip>:27010  on browser, you must seen some message.
 ```
 
 In case you don't want to use docker update the mongodb server IP [here](https://github.com/tushargoel86/basic_review_app/blob/master/backend/src/.env)
 
 
 
# API endpoint created using Node and Express JS:
``` 
HTTP GET: http://localhost:3005/api/reviews
```

```
HTTP POST: http://localhost:3005/api/reviews

body:
{
    "comments": "This is nice place to stay for few days.",
    "name": "Tushar Goel"
}
```  
 
![](https://github.com/tushargoel86/basic_review_app/blob/master/images/basic.PNG)
![](https://github.com/tushargoel86/basic_review_app/blob/master/images/comment1.PNG)

    
