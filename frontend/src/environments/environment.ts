// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // cognito environment
  api_username: '1jh7qoet6h77qmu60po4oet1j2', 
  api_pwd: '1g2l58md4u5dp1kf3h0hh591akuub04f977l5a8vlot1bostb1o',

  loginURL: 'https://serverlessscrumboard.auth.us-east-1.amazoncognito.com/login?client_id=1jh7qoet6h77qmu60po4oet1j2&response_type=code&scope=openid+profile&redirect_uri=https://d1106h0s3djptg.cloudfront.net/dashboard',

  redirectURL: 'https://d1106h0s3djptg.cloudfront.net/dashboard',

  cognitoTokenURL: 'https://serverlessscrumboard.auth.us-east-1.amazoncognito.com/oauth2/token',

  logout: 'https://serverlessscrumboard.auth.us-east-1.amazoncognito.com/logout?' +
  'client_id=1jh7qoet6h77qmu60po4oet1j2' +
  'logout_uri=https://d1106h0s3djptg.cloudfront.net/homepage'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
