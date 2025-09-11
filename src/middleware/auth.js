const auth = (req, res, next) => {
    try {
        if (req.url == "/api/v1/user" && req.method == "GET" && req.params.id) 
            next()

        if (!req.session.user) 
            res.status(401).end()

        next()
        
    } catch (error) {
        throw error
        next()
    }
}

module.exports = auth