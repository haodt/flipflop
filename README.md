# FlipFlop
Small app to compare multiple products from lazada.sg (sort by price, rating, reviews). Only work with product page url.

Example:

- https://www.lazada.sg/xiaomi-redmi-note-4-3gb-32gb-14511333.html
- http://www.lazada.sg/apple-iphone-7-plus-256gb-jet-black-8634330.html
- https://www.lazada.sg/xiaomi-redmi-note-4-3gb-32gb-14511333.html
- http://www.lazada.sg/samsung-galaxy-s8-64gb-midnight-black-18155589.html 

![Demo](https://github.com/haodt/flipflop/raw/master/flipflop.gif)

# Development

- Server will listen on 3001 while react's webpack dev server is on 3000
- Run dev server 
```
npm run dev
```
- Run webpack dev server
```
cd clien && npm start
```

# Docker
```
docker-compose up
```
- For development with docker
```
docker-compose run --rm --service-port web npm run dev
```

# Test
- Run
```
npm test
docker-compose run --rm --service-port web npm run test
```
