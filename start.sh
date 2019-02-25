#!/bin/sh
if  [[ "$DOTENV_URL" == "https://"* ]];
then
  curl $DOTENV_URL -H 'Cache-Control: no-cache' -s -S -o .env
fi

if  [[ "$DOTENV_URL" == "s3://"* ]];
then
  aws s3 cp $DOTENV_URL .env
fi
pm2-docker ./index.js