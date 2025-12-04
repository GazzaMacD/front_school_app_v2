import { createCookieSessionStorage, redirect } from "react-router";

import {
  SESSION_NAME,
  SESSION_SECRET,
  BASE_API_URL,
  LOGIN_REDIRECT,
} from "~/.server/env";

import type {
  TLogin,
  TLoginOk,
  TLoginResponse,
  TRefreshedToken,
  TRegister,
  TRegisterResponse,
  TUserData,
  TValidateTokens,
  TValidateTokensResponse,
  TVerifyEmailResponse,
  TPasswordResetResponse,
  TResetConfirm,
  TResetConfirmResponse,
  TResetConfirmErrors,
  TResetConfirmOk,
} from "~/common/types";

import { MESSAGES } from "~/common/constants";

/**
 * Auth utility functions
 */

export function secureRedirect(to: FormDataEntryValue | null): string {
  if (!to || typeof to !== "string") {
    return LOGIN_REDIRECT;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return LOGIN_REDIRECT;
  }

  return to;
}

/*
 * Storage
 */
const storage = createCookieSessionStorage({
  cookie: {
    name: SESSION_NAME,
    secure: true,
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, //30 days
    httpOnly: true,
  },
});

/*
 * Session
 */
export async function createUserSession(
  userData: TLoginOk,
  redirectTo: string
) {
  const session = await storage.getSession();
  session.set(SESSION_NAME, userData);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

/*
 * Auth Functions
 */

// Login
export async function login({
  email,
  password,
}: TLogin): Promise<TLoginResponse> {
  try {
    const apiUrl = `${BASE_API_URL}/auth/login/`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        data: null,
        errors: responseData,
      };
    }
    return {
      success: true,
      status: 200,
      data: responseData,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      data: null,
      errors: {
        non_field_errors: [MESSAGES["ja"].networkError],
      },
    };
  }
}

/* password reset confirm */
export async function resetConfirm({
  uid,
  token,
  new_password1,
  new_password2,
}: TResetConfirm): Promise<TResetConfirmResponse> {
  try {
    const response = await fetch(
      `${BASE_API_URL}/auth/password/reset/confirm/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          token,
          new_password1,
          new_password2,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        data: null,
        errors: data,
      };
    }
    return {
      success: true,
      status: response.status,
      data: data,
      errors: null,
    };
  } catch (e) {
    console.error(`Error in 'resetConfirm': ${e}`);
    return {
      success: false,
      status: 500,
      data: null,
      errors: {
        non_field_errors: [MESSAGES["ja"].networkError],
      },
    };
  }
}

/* password reset */
export async function passwordReset({
  email,
}: {
  email: string;
}): Promise<TPasswordResetResponse> {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/password/reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        data: null,
        errors: data,
      };
    }
    // success
    return {
      success: true,
      status: response.status,
      data: data,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      data: null,
      errors: {
        non_field_errors: [MESSAGES["ja"].networkError],
      },
    };
  }
}

/* verify email */
export async function verifyEmail({
  key,
}: {
  key: string;
}): Promise<TVerifyEmailResponse> {
  try {
    const response = await fetch(
      `${BASE_API_URL}/auth/registration/verify-email/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        data: null,
        errors: data,
      };
    }
    return {
      success: true,
      status: response.status,
      data,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      data: null,
      errors: {
        // NOTE: Why is this different to other functions?
        detail: MESSAGES["ja"].networkError,
      },
    };
  }
} //verifyEmail

export async function register({
  email,
  password1,
  password2,
}: TRegister): Promise<TRegisterResponse> {
  try {
    const apiUrl = `${BASE_API_URL}/auth/registration/`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password1,
        password2,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        data: null,
        errors: responseData,
      };
    }
    return {
      success: true,
      status: response.status,
      data: responseData,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      data: null,
      errors: {
        non_field_errors: [MESSAGES["ja"].networkError],
      },
    };
  }
}

// Logout
export async function logout(request: Request, redirectPath = "/") {
  const session = await getUserSession(request);
  const sessionData: TUserData | undefined = session.get(SESSION_NAME);

  // No userData
  if (!sessionData) {
    return redirect(redirectPath);
  }

  //Get valid token or no token
  const validRes = await validateTokens({
    accessToken: sessionData.access,
    refreshToken: sessionData.refresh,
  });

  // if no token - session is dead anyway so destroy session
  if (!validRes.isValid && !validRes.isNew && !validRes.accessToken) {
    return redirect(redirectPath, {
      headers: {
        "Set-Cookie": await storage.destroySession(session),
      },
    });
  }

  // if token -> logout backend -> destroy sesson
  if (validRes.isValid && validRes.accessToken) {
    const logoutUrl = `${BASE_API_URL}/auth/logout/`;
    const headers = await createAuthenticatedHeaders(validRes.accessToken);
    await fetch(logoutUrl, { method: "POST", headers });
  }

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
} //logout

/**
 * User and Access functions
 */
export async function createAuthenticatedHeaders(accessToken: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  return headers;
}

export async function authenticatedUser(
  request: Request
): Promise<TUserData | null> {
  const session = await getUserSession(request);
  const sessionData: TUserData | undefined = session.get(SESSION_NAME);
  const redirectPath = new URL(request.url).pathname;
  if (!sessionData) return null;

  //validate session data
  const validatedResponse = await validateTokens({
    accessToken: sessionData.access,
    refreshToken: sessionData.refresh,
  });

  if (!validatedResponse.isValid) {
    // Throw redirect and destroy session as invalid data in session
    throw redirect(redirectPath, {
      headers: {
        "Set-Cookie": await storage.destroySession(session),
      },
    });
  } else if (validatedResponse.isValid && !validatedResponse.isNew) {
    // No changes required to session, all good here so return sessionData
    return sessionData;
  } else if (
    validatedResponse.isValid &&
    validatedResponse.isNew &&
    validatedResponse.accessToken
  ) {
    // THe access token has been renewed so session needs to be updated
    // and the cookie set again
    sessionData.access = validatedResponse.accessToken;
    session.set(SESSION_NAME, sessionData);
    throw redirect(redirectPath, {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  } else {
    return null;
  }
} // authenticatedUser

/**
 * Token Validation functions
 */
async function verifyAccessToken(accessToken: string): Promise<boolean> {
  const verifyUrl = `${BASE_API_URL}/auth/token/verify/`;
  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: accessToken,
      }),
    });
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
} //verifyAccessToken

async function getNewAccessTokenFromRefresh(
  refreshToken: string
): Promise<string | null> {
  const refreshUrl = `${BASE_API_URL}/auth/token/refresh/`;
  try {
    const res = await fetch(refreshUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });
    if (!res.ok) {
      //if not 200 return null
      return null;
    }
    const data: TRefreshedToken = await res.json();
    return data.access;
  } catch (error) {
    // 500 errors or other unknown
    console.error(error);
    return null;
  }
} //getRefreshToken

async function validateTokens({
  accessToken,
  refreshToken,
}: TValidateTokens): Promise<TValidateTokensResponse> {
  const isVerified = await verifyAccessToken(accessToken);
  if (isVerified) {
    return {
      isValid: true,
      isNew: false,
      accessToken: accessToken,
    };
  }
  // notVerified so try to get new token using refresh token
  const newAccessToken = await getNewAccessTokenFromRefresh(refreshToken);
  if (!newAccessToken) {
    // calling function must destroy session with logout
    return {
      isValid: false,
      isNew: false,
      accessToken: null,
    };
  }
  //has new access Token, calling function must set new session
  return {
    isValid: true,
    isNew: true,
    accessToken: newAccessToken,
  };
}
