const jwt = require('jsonwebtoken');
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader); // 👈 Log
  
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      console.log('Token:', token); // 👈 Log
  
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log('JWT Error:', err); // 👈 Log error
          return res.sendStatus(403);
        }
        console.log('Decoded User:', user); // 👈 Log decoded user
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  module.exports = { authenticateJWT };
