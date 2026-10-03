
import dotenv from 'dotenv'

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI Not Found');
}

if(!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET Not Found');
}

if(!process.env.NODE_ENV){
    throw new Error('NODE_ENV Not Found');
}

if(!process.env.CLIENT_URL){
    throw new Error('CLIENT_URL Not Found');
}

const config = {
     MONGO_URI: process.env.MONGO_URI,
     JWT_SECRET: process.env.JWT_SECRET,
     NODE_ENV: process.env.NODE_ENV,
     CLIENT_URL: process.env.CLIENT_URL

}

export default config;