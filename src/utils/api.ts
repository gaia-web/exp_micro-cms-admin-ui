export let API_ENDPOINT: string | undefined = import.meta.env.VITE_API_ENDPOINT ?? '/api';

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
