module.exports = function(req, res, next){
    let excluded = false;
    logging.excluded.forEach((fileType) => {
        if(req.url.endsWith(fileType)){
            excluded = true;
        }
    });
    if(!excluded){
        Logger.logRequest(req);
    }
    next();
}