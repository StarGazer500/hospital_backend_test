// utils/jwt.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// These should be in your .env file
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET 

// Access token expires in 15 minutes
const generateAccessToken = async(user) => {
  return jwt.sign(
    { 
      userId: user._id,
      username: user.username,
      role: user.role 
    }, 
    ACCESS_TOKEN_SECRET, 
    { expiresIn: '15m' }
  );
};

// Refresh token expires in 7 days
const generateRefreshToken = async(user) => {
  return jwt.sign(
    { 
      userId: user._id,
      username: user.username,
      role: user.role
    }, 
    REFRESH_TOKEN_SECRET, 
    { expiresIn: '7d' }
  );
};

const verifyAccessToken = async(token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = async(token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};


// middleware/auth.js

const authenticateTokenMiddleware = async (req, res, next) => {
    // Retrieve the access token from cookies
    const accessToken = req.cookies['accessToken'];
    console.log("access working",accessToken)
  
    // If there's no access token, we need to check for a refresh token
    if (!accessToken) {
      const refreshToken = req.cookies['refreshToken'];
  
      if (refreshToken) {
        // Verify the refresh token
        const refreshTokenPayload = await verifyRefreshToken(refreshToken);
  
        if (refreshTokenPayload) {
          // Generate a new access token based on the valid refresh token
          const newAccessToken = await generateAccessToken({
            _id: refreshTokenPayload.userId,
            username: refreshTokenPayload.username,
            role: refreshTokenPayload.role,
          });
  
          // Set the new access token as a cookie
          res.cookie('accessToken', newAccessToken, {
            httpOnly: true, // Ensures the cookie is not accessible via JavaScript (security)
            // secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            maxAge: 15 * 60 * 1000, // Cookie expires in 15 minutes (same as the JWT expiration)
            sameSite: 'Lax', // Protect against CSRF attacks
          });
  
          // Verify the new access token
          const user = await verifyAccessToken(newAccessToken);
          if (!user) {
            return res.status(403).json({ message: 'Invalid or expired token' });
          }
  
          // Attach user data to the request object and proceed to the next middleware
          req.user = user;
          return next();
        }
      }
  
      // If no valid refresh token, return an unauthorized error
      return res.status(401).json({ message: 'You have not logged in' });
    }
  
    // Verify the access token directly if present
    const user = await verifyAccessToken(accessToken);
    if (!user) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  
    // Attach user data to the request object
    req.user = user;
    next();
  };



const hashPassword = async (password) => {
    const saltRounds = 10; // The cost factor, higher is more secure but slower
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};


const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authenticateTokenMiddleware,
  hashPassword,
  verifyPassword
  
};