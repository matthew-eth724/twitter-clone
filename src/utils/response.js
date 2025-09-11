const responseBody = (res, msg, data, status) => {
    return res.status(status).json({
        msg: msg,
        data: data
    })
}

module.exports = {
    responseBody
}