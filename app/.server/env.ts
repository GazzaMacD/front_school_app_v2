/*
 * Env Types
 */

type TENV_VARS =
  | "BASE_API_URL"
  | "BASE_BACK_URL"
  | "SESSION_SECRET"
  | "HOME_URL"
  | "SCHEDULE_PERMS"
  | "SESSION_NAME"
  | "LOGIN_REDIRECT"
  | "MC_API_KEY"
  | "MC_URL"
  | "MC_AUD_ALL_ID";
/*
 * Env Functions
 */
function getEnvOrThrow(name: TENV_VARS): string {
  const envVar = process.env[name];
  if (!envVar) {
    throw new Error(`Missing environment variable "${name}". Please set it.`);
  }
  return envVar;
}

/*
 * Env Vars
 */

export const BASE_API_URL = getEnvOrThrow("BASE_API_URL");
export const BASE_BACK_URL = getEnvOrThrow("BASE_BACK_URL");
export const SESSION_SECRET = getEnvOrThrow("SESSION_SECRET");
export const HOME_URL = getEnvOrThrow("HOME_URL");
export const PERMISSIONS = {
  schedule: getEnvOrThrow("SCHEDULE_PERMS"),
};
export const SESSION_NAME = "__xl_session__";
export const LOGIN_REDIRECT = "/my-page";
export const MC_API_KEY = getEnvOrThrow("MC_API_KEY");
export const MC_URL = getEnvOrThrow("MC_URL");
export const MC_AUD_ALL_ID = getEnvOrThrow("MC_AUD_ALL_ID");
