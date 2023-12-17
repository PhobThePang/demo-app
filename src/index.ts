import express, { NextFunction, Request, Response, json, urlencoded } from 'express'
import log4js from 'log4js';
import os from 'os'

async function main(){
    const app = express()
    const logger = log4js.getLogger();
    logger.level = "debug";

    app.use(json())
    app.use(urlencoded({extended:true}))

    app.get('/', async (req, res, next) => {
        res.json({
            platform: os.platform()
        })
    })

    app.use(function errorHandler (err:any, req: Request, res:Response, next:NextFunction) {
        const errorObj = err as Error
        res.status(res.statusCode == 200 ? 500: res.statusCode).json({
            status: 'error',
            message: errorObj.message || err,
            stack: errorObj.stack
        })
    })
    

    app.listen(8000, '0.0.0.0', async () => {
        logger.debug("App listening on port 8000; access http://localhost:8000");
    })
}

main()