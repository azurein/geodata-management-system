const { withSwagger } = require('next-swagger-doc');

const swaggerHandler = withSwagger({
  apiFolder: "app/api",
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Next Swagger API Example",
      version: "1.0",
    },
    components: {},
    security: [],
  },
});

module.exports = swaggerHandler();
