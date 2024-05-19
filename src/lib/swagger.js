const { createSwaggerSpec } = require('next-swagger-doc');

const getApiDocs = async () => {
  const spec = await createSwaggerSpec({
    apiFolder: "../../app/api",
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
  console.log(JSON.stringify(spec, null, 2));
  return spec;
};

module.exports = { getApiDocs };
