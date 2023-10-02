import type { StorybookConfig } from "@storybook/react-webpack5";

import webpack from "webpack";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || { fs: false };
    config.resolve.fallback["fs"] = false;
    if (config.plugins)
      config.plugins.push(
        new webpack.SourceMapDevToolPlugin({
          append: "\n//# sourceMappingURL=[url]",
          fileContext: "./",
          filename: "[file].map",
        })
      );
    return config;
  },
  features: {
    storyStoreV7: true,
  },
};
export default config;
