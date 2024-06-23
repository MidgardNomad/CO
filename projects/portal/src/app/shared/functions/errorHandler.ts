export function errorHandler(err: any) {
  let errMessage = 'Something Went Wrong! Please, Try Again.';
  switch (err.code) {
    case 'auth/invalid-login-credentials':
      errMessage = 'Invalid credentials';
      break;
    case 'auth/network-request-failed':
      errMessage =
        'Something Went Wrong! Please, Check Your Internet Connection';
      break;
    case 'auth/invalid-email':
      errMessage = 'Invalid Email';
      break;
  }
  return errMessage;
}
