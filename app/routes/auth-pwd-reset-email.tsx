import { redirect, data } from "react-router";

import { passwordReset } from "~/.server/session";
import { MESSAGES } from "~/common/constants";

//types
import type { Route } from "./+types/auth-pwd-reset-email";
import type { TPasswordResetActionResponse } from "~/common/types";

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Password Reset Check Email" };
}

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = form.get("email") as string;
  const fields = { email };
  try {
    const response = await passwordReset({ email });
    if (!response.success) {
      const pwdResetEmailActionData = Object.assign(response, {
        fields,
      });
      return data<TPasswordResetActionResponse>(pwdResetEmailActionData, {
        status: response.status,
      });
    }
    //success
    return redirect("/password-reset-check-email");
  } catch (e) {
    console.error(`Error in pwd reset email action: ${e}`);
    return data<TPasswordResetActionResponse>(
      {
        success: false,
        status: 500,
        data: null,
        errors: {
          non_field_errors: [MESSAGES["ja"].networkError],
        },
        fields,
      },
      { status: 500 }
    );
  }
} // end action

/**
 * Page
 */
export default function PwdResetEmail({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <div>{message}</div>;
}
