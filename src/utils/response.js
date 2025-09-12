const responseBody = (res, msg, data, status) => {
    return res.status(status).json({
        msg: msg,
        data: data
    })
}

const response = (res, msg, status) => {
    return res.status(status).json({
        msg: msg
    })
}
module.exports = {
    responseBody, response
}