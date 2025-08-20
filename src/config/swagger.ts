import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student boat API",
      version: "1.0.0",
      description: "API documentation for backend of student boat company",
    },
    servers: [
      {
        url: "http://localhost:5000", // your local server
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/swaggerDocs/*.ts"], // 👈 Path to routes with Swagger comments
};

export const swaggerSpec = swaggerJsdoc(options);
