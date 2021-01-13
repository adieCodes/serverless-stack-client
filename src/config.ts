const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY:
    'pk_test_51Hv3IgJQ3vM9SAofLyUMdplpyPQfuE3Lti7o4IpVIXy2pLLGWUwDue02cQ774aaTwRGgAyHwgpdejFMJR1JlXBeY00x1ihew52',
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'notes-app-upload-adiecodes',
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://lul8l9mvc6.execute-api.us-east-1.amazonaws.com/prod',
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_n2ApRVjni',
    APP_CLIENT_ID: '1s3gkcpco5eets256gq8mi86q5',
    IDENTITY_POOL_ID: 'us-east-1:535a370d-5fa3-435d-96e8-c1d2aa196a38',
  },
};

export default config;
