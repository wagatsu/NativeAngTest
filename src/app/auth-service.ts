import {
  TnsOAuthClient,
  configureTnsOAuth,
  ITnsOAuthTokenResult,
} from "nativescript-oauth2";
import {
  TnsOaProvider,
  TnsOaProviderGoogle,
  TnsOaProviderOptionsGoogle,
  TnsOaProviderOptionsIdentityServer,
  TnsOaProviderIdentityServer
} from "nativescript-oauth2/providers";
import { openUrl } from "tns-core-modules/utils/utils";

let client: TnsOAuthClient = null;

export function configureOAuthProviders() {
  //const myCustomProvider = configureOAuthProviderMyCustomProvider();
  const myCustomProvider = configureOAuthProviderGoogle();
  configureTnsOAuth([myCustomProvider]);
}

function configureOAuthProviderGoogle(): TnsOaProvider {
  const myCustomProviderOptions: TnsOaProviderOptionsGoogle = {
    openIdSupport: "oid-full",
    clientId: "553945652641-tnuugkkl8qs6ls8fpgknchh7v3so9ogj.apps.googleusercontent.com",
    redirectUri: "com.googleusercontent.apps.553945652641-tnuugkkl8qs6ls8fpgknchh7v3so9ogj:/auth",
    urlScheme: "com.googleusercontent.apps.553945652641-tnuugkkl8qs6ls8fpgknchh7v3so9ogj",
    scopes: ["email"]
  };
  const myCustomProvider = new TnsOaProviderGoogle(myCustomProviderOptions);
  return myCustomProvider;
}

function configureOAuthProviderIdentityServer(): TnsOaProvider {
  const identityServerProviderOptions: TnsOaProviderOptionsIdentityServer = {
    openIdSupport: 'oid-full',
    issuerUrl: 'https://demo.identityserver.io',
    clientId: 'native.code',
    urlScheme: 'org.nativescript.demoangular',
    redirectUri: 'org.nativescript.demoangular://auth',
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  };
  const identityServerProvider = new TnsOaProviderIdentityServer(
    identityServerProviderOptions
  );
  return identityServerProvider;
}



// function configureOAuthProviderMyCustomProvider(): TnsOaProvider {
//   const myCustomProviderOptions: TnsOaMyCustomProviderOptions = {
//     openIdSupport: "oid-full",
//     clientId:
//       "js",
//     redirectUri:
//       "org.nativescript.democustomprovider:/auth",
//     urlScheme:
//       "org.nativescript.democustomprovider",
//     scopes: ["openid", "app2api", "offline_access"]
//   };
//   const myCustomProvider = new TnsOaProviderMyCustomProvider(myCustomProviderOptions);
//   return myCustomProvider;
// }



export function tnsOauthLogin(providerType) {
  client = new TnsOAuthClient(providerType);

  client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult , error, ) => {

    if (error) {
      console.error("back to main page with error: ");
      console.error(error);
    } else {
      console.log("back to main page with access token: ");
      console.log(tokenResult);
      console.log(client.tokenResult);
      client.refreshTokenWithCompletion((tokenResultx: ITnsOAuthTokenResult, error) => {
        if (error) {
          console.error("Unable to refresh token with error: ");
          console.error(error);
        } else {

          console.log("Successfully refreshed access token: ");
          console.log(tokenResultx);
        }
      });
    }
  });
}

export function tnsOauthLogout() {
  if (client) {
    // var id_token_hint = client.tokenResult.accessToken
    client.logout();
    openUrl(client.provider.tokenEndpointBase + "/connect/endsession");
    // openUrl(client.provider.tokenEndpointBase + "/connect/endsession?id_token_hint=" + client.tokenResult.id_token + "&post_logout_redirect_uri=" + encodeURI(client.provider.options.redirectUri));
    //[how to get id_token from ITnsOAuthTokenResult and · Issue #96 · alexziskind1/nativescript-oauth](https://github.com/alexziskind1/nativescript-oauth/issues/96)
    //GET /connect/endsession?id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6IjdlOGFkZmMzMjU1OTEyNzI0ZDY4NWZmYmIwOThjNDEyIiwidHlwIjoiSldUIn0.eyJuYmYiOjE0OTE3NjUzMjEsImV4cCI6MTQ5MTc2NTYyMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoianNfb2lkYyIsIm5vbmNlIjoiYTQwNGFjN2NjYWEwNGFmNzkzNmJjYTkyNTJkYTRhODUiLCJpYXQiOjE0OTE3NjUzMjEsInNpZCI6IjI2YTYzNWVmOTQ2ZjRiZGU3ZWUzMzQ2ZjFmMWY1NTZjIiwic3ViIjoiODg0MjExMTMiLCJhdXRoX3RpbWUiOjE0OTE3NjUzMTksImlkcCI6ImxvY2FsIiwiYW1yIjpbInB3ZCJdfQ.STzOWoeVYMtZdRAeRT95cMYEmClixWkmGwVH2Yyiks9BETotbSZiSfgE5kRh72kghN78N3-RgCTUmM2edB3bZx4H5ut3wWsBnZtQ2JLfhTwJAjaLE9Ykt68ovNJySbm8hjZhHzPWKh55jzshivQvTX0GdtlbcDoEA1oNONxHkpDIcr3pRoGi6YveEAFsGOeSQwzT76aId-rAALhFPkyKnVc-uB8IHtGNSyRWLFhwVqAdS3fRNO7iIs5hYRxeFSU7a5ZuUqZ6RRi-bcDhI-djKO5uAwiyhfpbpYcaY_TxXWoCmq8N8uAw9zqFsQUwcXymfOAi2UF3eFZt02hBu-shKA&post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A7017%2Findex.html

  }
}
