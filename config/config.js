const { PRIMARY_HOST, SECONDARY_HOST, CANDIDATE_HOST } = process.env;

export const {
  ENVIRONMENT,
  APP_NAME,
  PROXY_PORT,
  ADMIN_PORT,
  SECRET,
  WEBHOOK_URL
} = process.env;

export const HTTP_SERVER_PORT = (env =>
  ({ production: 3000, test: 4004, development: 5005 }[env] || 6006))(
  ENVIRONMENT
);

export const testHosts = [PRIMARY_HOST, SECONDARY_HOST, CANDIDATE_HOST];
