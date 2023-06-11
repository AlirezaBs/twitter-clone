module.exports = ({ env }) => {
  console.log("Loaded config:", env);
  return {
    upload: {
      provider: "local",
      providerOptions: {
        destination: "theData/uploads",
        public: true,
      },
    },
  };
};
