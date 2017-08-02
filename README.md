# FlipFlop
Small app to compare 2 products from lazada.sg

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
