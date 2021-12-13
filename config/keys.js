module.exports = {
  mongoURI: "mongodb://localhost:27017/local",
  secretOrKey: "secret",
  minioConfig: {
    endPoint: "192.168.31.12",
    port: 9000,
    useSSL: false,
    accessKey: "minioadmin",
    secretKey: "minioadmin",
  },
};
