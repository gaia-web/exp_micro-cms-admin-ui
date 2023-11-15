export let API_ENDPOINT: string | undefined = import.meta.env.VITE_API_ENDPOINT;

export async function checkAuthentication() {
  try {
    return await fetch(`${API_ENDPOINT}/auth`, { credentials: "include" }).then(
      (response) => response.ok
    );
  } catch (e) {
    return false;
  }
}

export async function signIn(passcode: string) {
  await fetch(`${API_ENDPOINT}/auth/sign-in?passcode=${passcode}`, {
    method: "POST",
    credentials: "include",
  });
}

export async function signOut() {
  await fetch(`${API_ENDPOINT}/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });
}

export async function obtainGeneralInfoList() {
  return await fetch(`${API_ENDPOINT}/general`).then((response) =>
    response.json()
  );
}

export async function obtainGeneralInfo(key: string) {
  return await fetch(`${API_ENDPOINT}/general/${encodeURIComponent(key)}`).then(
    async (response) => {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } finally {
        return text;
      }
    }
  );
}

export async function deleteGeneralInfo(key: string) {
  return await fetch(`${API_ENDPOINT}/general/${encodeURIComponent(key)}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function addGeneralInfo(key: string, value: unknown) {
  return await fetch(`${API_ENDPOINT}/general/${encodeURIComponent(key)}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(value),
    headers: new Headers({ "content-type": "application/json" }),
  });
}

export async function updateGeneralInfo(key: string, value: unknown) {
  return await fetch(`${API_ENDPOINT}/general/${encodeURIComponent(key)}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(value),
    headers: new Headers({ "content-type": "application/json" }),
  });
}
