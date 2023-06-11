module.exports = ({ env }) => ({
  upload: {
    provider: "local",
    providerOptions: {
      destination: "theData/uploads",
      public: true,
    },
  },
});
