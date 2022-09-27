/* src/App.js */
import React, { useEffect, useState } from 'react'
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import awsconfig from './aws-exports';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

Amplify.configure({
  Auth:{
    identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
    region: 'XX-XXXX-X',
    identityPoolRegion: 'XX-XXXX-X',
    userPoolId: 'XX-XXXX-X_abcd1234',
    userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
    mandatorySignIn: false,
    signUpVerificationMethod: 'code', 
    cookieStorage: {
          domain: '.yourdomain.com',
          path: '/',
          expires: 365,
          sameSite: "strict" | "lax",
          secure: true
      },
      storage: MyStorage,
        
      authenticationFlowType: 'USER_PASSWORD_AUTH',

      clientMetadata: { myCustomKey: 'myCustomValue' },

      oauth: {
          domain: 'your_cognito_domain',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn: 'http://localhost:3000/',
          redirectSignOut: 'http://localhost:3000/',
          responseType: 'code' 
      }
  }
});

async function signUp(){
  try{
    const {user} = await Auth.signUp({
      username,
      password,
      attributes:{
        email,
        phone_number,
      },
      autoSignIn:{
        enabled: true,
      }
    });

    console.log(user);
  }
  catch(error){
    console.log('error signing up:', error);
  }
}

const currentConfig = Auth.configure();

function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);

