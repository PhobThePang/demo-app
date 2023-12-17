import log4js from 'log4js';

/* The `log4js.configure()` function is used to configure the logging system provided by the log4js
library. It takes an object as an argument, which specifies the appenders and categories for
logging. */
log4js.configure({
    appenders: { 
        out: { type: "stdout" },
        fileLog: {
            type: "file",
            filename: "logs/logs.log",
            maxLogSize: 10485760,
            backups: 1,
            compress: true,
          },
    },
    categories: { default: { appenders: ["fileLog", "out"], level: "debug" } },
});

/* `export default log4js` is exporting the `log4js` object as the default export of the module. This
means that when another module imports this module, they can access the `log4js` object directly
without having to specify its name. For example, in another module, you can import the `log4js`
object like this: */
export default log4js