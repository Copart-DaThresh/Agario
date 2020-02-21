class Logger {
    log(message){
        console.log(Logger.getLogPrefix() + ' ' + message);
    }

    logRequest(request){
        console.log(Logger.getLogPrefix() + ' ' + request.method + ' ' + request._parsedOriginalUrl.path);
    }

    static getDate(){
        let date = new Date();
        let dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let timeStr = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
        return dateStr + ' ' + timeStr;
    }

    static getAppName(){
        return 'Agar2';
    }

    static getLogPrefix(){
        return (Logger.getDate() + ' ' + '[' + Logger.getAppName() + ']');
    }
}

module.exports = new Logger();