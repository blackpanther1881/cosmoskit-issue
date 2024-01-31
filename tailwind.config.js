const tailwindConf = require("@persistenceone/persistence-ui-components");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@persistenceone/persistence-ui-components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors: tailwindConf.tailwindConfigTheme.colors,
    backgroundImage: tailwindConf.tailwindConfigTheme.backgroundImage,
    backgroundColor: tailwindConf.tailwindConfigTheme.backgroundColor,
    fontFamily: tailwindConf.tailwindConfigTheme.fontFamily,
    fontSize: tailwindConf.tailwindConfigTheme.fontSize,
    screens: tailwindConf.tailwindConfigTheme.screens,
    extend: {
      ...tailwindConf.tailwindConfigTheme.extend,
      animation: {
        "spin-slow": "spin 1.5s ease-in-out infinite"
      }
    }
  }
};
