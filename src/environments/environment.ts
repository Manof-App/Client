// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const firebase_environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDMhL-OZ-tuGTmgTeH_IKV8bj1M3d7rlvs',
    authDomain: 'manof-final-project.firebaseapp.com',
    databaseURL: 'https://manof-final-project.firebaseio.com',
    projectId: 'manof-final-project',
    storageBucket: 'manof-final-project.appspot.com',
    messagingSenderId: '121464988258',
    appId: '1:121464988258:web:4cf89944629b0df0fa673b',
    measurementId: 'G-2YD5HTRNX0',
  },
};

export const environment = {
  production: false,
  apiURL: 'http://localhost:3000',
};

export const globals = {
  googleMapsKey: 'AIzaSyDMhL-OZ-tuGTmgTeH_IKV8bj1M3d7rlvs',
  activityTab: 1,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
