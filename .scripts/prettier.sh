#! /bin/bash

npm run prettier -- $@ ./*.config.js

npm run prettier -- --parser babel $@ ./{src,test}/**/*.{js,jsx}

# npm run prettier -- --parser babel-ts $@ ./{src,test}/**/*.{ts,tsx}

npm run prettier -- --parser css $@ ./src/**/*.css

npm run prettier -- --parser json $@ ./*.json ./{src,test}/**/*.json

npm run prettier -- --parser html $@ ./index.html # ./{src,test}/**/*.html

npm run prettier -- --parser markdown $@ ./*.md # ./{docs}/**/*.md

npm run prettier -- --parser scss $@ ./src/**/*.scss

# npm run prettier -- --parser yaml $@ ./src/**/*.yaml
