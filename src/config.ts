const dev = {
  STRIPE_KEY:
    'pk_test_51Hv3IgJQ3vM9SAofLyUMdplpyPQfuE3Lti7o4IpVIXy2pLLGWUwDue02cQ774aaTwRGgAyHwgpdejFMJR1JlXBeY00x1ihew52',
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'dev-notes-infra-s3-uploads4f6eb0fd-scjlzpcztegv',
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://bmrv7h8aj6.execute-api.us-east-1.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_wXqUWFHGo',
    APP_CLIENT_ID: '7qvgoon9vp171hqc2f27t6brn2',
    IDENTITY_POOL_ID: 'us-east-1:dfd50f42-0c81-4d10-a531-73ac91657f43',
  },
};

const prod = {
  STRIPE_KEY:
    'pk_test_51Hv3IgJQ3vM9SAofLyUMdplpyPQfuE3Lti7o4IpVIXy2pLLGWUwDue02cQ774aaTwRGgAyHwgpdejFMJR1JlXBeY00x1ihew52',
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'prod-notes-infra-s3-uploads4f6eb0fd-1f3uc1jvifxww',
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://lul8l9mvc6.execute-api.us-east-1.amazonaws.com/prod',
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_vAw9yJGeh',
    APP_CLIENT_ID: '57vahfcc3g389vkdj6qn5tqcra',
    IDENTITY_POOL_ID: 'us-east-1:98092899-74c6-464c-95c4-3b9c4b0b83b4',
  },
};

const config = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === 'prod' ? prod : dev),
};

export default config;
