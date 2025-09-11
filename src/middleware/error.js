const errorHandler = (err, req, res, next) => {
    console.error("AN ERROR OCCURED 😑", err)
    res.status(500).json({
        msg: err
    })
    next()
}

module.exports = errorHandler