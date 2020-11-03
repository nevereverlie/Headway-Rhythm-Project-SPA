import {
    SocialLoginModule,
    SocialAuthServiceConfig,
    GoogleLoginProvider,
    SocialAuthService
} from 'angularx-social-login';

export function getAuthServiceConfigs() {
    const config = new SocialAuthService([
        {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('688610565883-5r0vs55u2q7gncdg062f4fv13jp0dcbb.apps.googleusercontent.com')
        }
    ]);

    return config;
}
