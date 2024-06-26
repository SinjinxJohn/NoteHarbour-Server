const JWT = require("jsonwebtoken");

const secret = "Hotlinebling1!";
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
  };
  const token = JWT.sign(payload, secret, { expiresIn: "2h" });
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
