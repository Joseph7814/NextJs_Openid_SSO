export const getAuth0LoginUrl = () => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  return `https://${domain}/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid profile email`;
};

export const getAuth0LogoutUrl = () => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const postLogoutRedirectUri = process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URI;

  return `https://${domain}/v2/logout?client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(postLogoutRedirectUri)}`;
};
