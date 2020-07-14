export const environment = {
  prod: false,
  jwtSecretKey: "pomrukiStraconegoKota",
  jwtCookieName: "jwt-token-client",
  hashSalt: 46682,
  mongoUser: "root",
  mongoPassword: "rootpassword",
  mongoPort: 27017,
  permissionList: ["operator.register", "operator.permission", "product.create", "product.update"]
};
