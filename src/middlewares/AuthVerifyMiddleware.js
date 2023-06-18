var jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    try {
        let Token = req.headers['token'];

        let decoded = await jwt.verify(Token, process.env.JWT_KEY)
        let email = decoded['data']['email'];
        let name=decoded['data']['name'];
        let address = decoded['data']['address'];
     
        req.headers.email = email;
        req.headers.name = name;
        req.headers.address = address;
     
debugger;
        next();
    } catch (error) {
        console.log(Token)
        res.status(401).json({ status: "unauthorized" })
    }
}
