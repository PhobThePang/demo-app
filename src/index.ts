import LogManager from './LogManager';
import express, { NextFunction, Request, Response, json, urlencoded } from 'express'
import os from 'os'


/**
 * The main function sets up an Express server that listens on a specified port and IP address, and
 * logs debug messages.
 * @param [port=8000] - The `port` parameter specifies the port number on which the server will listen
 * for incoming requests. By default, it is set to 8000.
 * @param [listenIP=0.0.0.0] - The `listenIP` parameter specifies the IP address on which the server
 * should listen for incoming connections. In this case, the value "0.0.0.0" means that the server will
 * listen on all available network interfaces. This allows the server to accept connections from any IP
 * address.
 * @param [logLevel=debug] - The `logLevel` parameter determines the level of logging that will be
 * displayed. It can have one of the following values:
 */
async function main(port=8000, listenIP="0.0.0.0"){
    const app = express()
    const logger = LogManager.getLogger();

    app.use(json())
    app.use(urlencoded({extended:true}))

    app.get('/', async (req, res, next) => {
        res.json({
            platform: os.platform()
        })
    })

    app.get('/err', async (req, res, next) => {
        try{
            throw Error("Opang is so noob")
        }catch(err){
            next(err)
        }
    })

    /* The `app.use` function is used to add middleware to the Express application. In this case, the
    middleware function is called `errorHandler`. */
    app.use(function errorHandler (err:any, req: Request, res:Response, next:NextFunction) {
        const errorObj = err as Error
        logger.error(err)
        res.status(res.statusCode == 200 ? 500: res.statusCode).json({
            status: 'error',
            message: errorObj.message || err,
            stack: errorObj.stack
        })
    })
    
    /* `app.listen(port, listenIP, async () => { ... })` is starting the Express server and listening
    for incoming requests on the specified `port` and `listenIP`. */
    app.listen(port, listenIP, async () => {
        logger.debug(`App listening on port ${port}; access http://${listenIP}:${port}`);
    })
}

main()