import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request object
 * Blocks unauthorized requests
 */
const protect = async (req, res, next) => {
    let token;

    // Check for Authorization header with Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header (Bearer <token>)
            token = req.headers.authorization.split(' ')[1];

            // Verify token using JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            // Check if user still exists
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User no longer exists'
                });
            }

            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error.message);
            
            // Handle specific JWT errors
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
            
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token has expired'
                });
            }

            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }
    }

    // No token provided
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token provided'
        });
    }
};

/**
 * Admin Authorization Middleware
 * Restricts access to admin users only
 * Must be used after protect middleware
 */
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
};

export { protect, adminOnly };
