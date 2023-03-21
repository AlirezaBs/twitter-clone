module.exports = ({ env }) => ({
  "users-permissions": {
    jwtSecret: env("JWT_SECRET") || pass,
    jwtExpiresIn: 7 * 24 * 60 * 60, // JWT expiration time set to 1 hour
  },
});
