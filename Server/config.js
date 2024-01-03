import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3001,
  stock_api: process.env.PYTHON_API_URL,
  react_url: process.env.REACT_URL,
  jwt_secret: process.env.JWT_TOKEN_SECRET,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_username: process.env.SMTP_USERNAME,
  smtp_password: process.env.SMTP_PASSWORD,
  crypto_secret: process.env.CRYPTO_SECRET,
  mongo_uri: process.env.MONGO_DB_URI,
};
