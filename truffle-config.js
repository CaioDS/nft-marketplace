module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "192.168.1.10", //127.0.0.1
      port: 8545,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.15",
    }
  },
};
