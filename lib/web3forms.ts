export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "b64a3d12-abac-433a-b5f7-6d5b63220afb";
export const MAKE_CONTACT_WEBHOOK =
  "https://hook.eu2.make.com/pypwr0dwma9qk39wt72jjnmh7n0j6ddj";

type SubmitOptions = {
  subject?: string;
  /** Contact page only — POST to Make.com before Web3Forms. */
  notifyMakeFirst?: boolean;
};

export async function submitWeb3Form(
  fields: Record<string, string>,
  options: SubmitOptions = {}
): Promise<boolean> {
  if (options.notifyMakeFirst) {
    try {
      await fetch(MAKE_CONTACT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
    } catch {
      // Still submit to Web3Forms if the webhook fails.
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const payload: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    botcheck: "",
    ...fields,
  };
  if (options.subject) payload.subject = options.subject;

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return false;

  const result = (await res.json()) as { success?: boolean };
  return result.success === true;
}
