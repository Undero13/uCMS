const windowFix = () => {
  global.window = Object.create(window);
  const url = "http://localhost";
  Object.defineProperty(window, "location", {
    value: {
      href: url,
    },
    writable: true,
  });
};

export default windowFix;
