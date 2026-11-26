const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const configuredUrl =
  process.env.SITE_URL?.trim() ||
  (productionHost ? `https://${productionHost}` : undefined);

export const siteUrl = configuredUrl ? new URL(new URL(configuredUrl).origin) : undefined;
