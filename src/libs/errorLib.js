import * as Sentry from '@sentry/browser';

const isLocal = process.env.NODE_ENV === 'development';

export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({
    dsn:
      'https://7820598a8e0641ffa7c99ea7caf16f33@o504445.ingest.sentry.io/5591372',
  });
}

export function logError(error, errorInfo = null) {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

export function onError(error) {
  let errorInfo = {};
  let message = error.toString();

  // Auth errors - https://serverless-stack.com/chapters/report-api-errors-in-react.html
  // You’ll notice that in the case of an Auth error we create an Error object and add the object that we get as the errorInfo.
  // For API errors, Amplify uses Axios. This has a config object that contains the API endpoint that generated the error.
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);

  alert(message);
}
