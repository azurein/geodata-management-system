const { getApiDocs } = require("@/lib/swagger");
const ReactSwagger = require("./react-swagger");

async function IndexPage() {
  const spec = await getApiDocs();

  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}

module.exports = IndexPage;
