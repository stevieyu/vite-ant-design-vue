
## dev
```shell script
cp .env.development .env.development.local
```


## deploy
```shell script
cp .env.production .env.production.local
```

### deploy surge
```shell
pnpx -y surge dist vvd.surge.stevie.top
```