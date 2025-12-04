import { data, Form, useNavigation, redirect } from "react-router";

import { resetConfirm } from "~/.server/session";
import { MESSAGES } from "~/common/constants";

// type imports
import type { Route } from "./+types/auth-pwd-reset-confirm";
import type { TResetConfirmActionResponse } from "~/common/types";

/**
 * Loaders and Actions
 */
export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const uid = Number(form.get("uid")) as number;
  const token = form.get("token") as string;
  const new_password1 = form.get("new_password1") as string;
  const new_password2 = form.get("new_password2") as string;

  const fields = {
    uid,
    token,
    new_password1,
    new_password2,
  };

  try {
    const response = await resetConfirm(fields);
    if (!response.success) {
      const pwdResetConfirmActionData = Object.assign(response, {
        fields,
      });
      if (response.errors?.uid || response.errors?.token) {
        //invalid
        return data<TResetConfirmActionResponse>(
          {
            success: false,
            status: response.status,
            data: null,
            errors: {
              non_field_errors: [MESSAGES["ja"].formInvalid],
            },
            fields,
          },
          { status: response.status }
        );
      } else {
        //form field errors
        return data<TResetConfirmActionResponse>(pwdResetConfirmActionData, {
          status: response.status,
        });
      }
    }

    //success
    return redirect("/password-reset-done");
  } catch (e) {
    console.error(`Error in reset confirm action: ${e}`);
    return data<TResetConfirmActionResponse>(
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
export default function PwdResetConfirm({ loaderData }: Route.ComponentProps) {
  return <div>Password Reset Confirm</div>;
}
