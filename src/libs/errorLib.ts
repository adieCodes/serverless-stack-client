interface AuthError {
  message: string;
}

export function onError(error: Error | AuthError): void {
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  alert(message);
}
