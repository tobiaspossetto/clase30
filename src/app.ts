import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import routes from './routes/routes'

import minimist from 'minimist'
import cookieParser from 'cookie-parser'
import './middleware/passport/local-auth'
import passport from 'passport'

export const args = minimist(process.argv.slice(2))

const app = express()
export const PORT = args._[0] || process.env.PORT || 4000

console.log(args._[0])
dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
  // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
  //  store: MongoStore.create({ mongoUrl: `mongodb+srv://tobias:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.ulmpx.mongodb.net/ecommerce?retryWrites=true&w=majority`, ttl: 60 }),
  secret: 'iosadyh23bu',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.set('views', './src/views')
app.set('view engine', 'pug')

app.use(routes)

export default app
