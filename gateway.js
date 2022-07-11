const {ApolloServer} =  require("apollo-server");
const { ApolloGateway, IntrospectAndCompose} = require("@apollo/gateway");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "product", url: "http://localhost:4001" },
      { name: "review", url: "http://localhost:4002" },
      {name:"analytics" , url :"http://localhost:4003"}
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

server
  .listen({
    port: 4000,
  })
  .then(({url}) => {
    console.log(`🚀 Gateway ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });