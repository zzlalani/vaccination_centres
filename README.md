# vaccination_centres
vaccination centres reservation RESTful service

use docker mongodb database

    docker-compose up
    

or update mongodb configuration in `db.js` line#10 with db connection string

    await mongoose.connect('mongodb://localhost:27017/vaccination_centres');
    
install dependencies

    npm ci
    
start server

    npm run start
    
nodejs version: `v14.17.6`

npm version: `v6.14.8`

mongo: `latest`
