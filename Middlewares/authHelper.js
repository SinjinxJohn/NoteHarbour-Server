const { validateToken } = require('../Service/auth');

function checkForToken() {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(); 
    }

  
    const token = authHeader.split(' ')[1];

    try {
      const userPayload = validateToken(token); 
      req.user = userPayload; 
      return next(); 
    } catch (error) {
   
      console.error('Token validation error:', error);
      res.sendStatus(401);
      return next(); 
    }
  };
}

module.exports = { checkForToken };
