import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    messages: {
      path: "./messages",
      locales: ["en", "pl"],
      format: "json",
      precompile: true,
    },
  },
});
export default withNextIntl(nextConfig);
