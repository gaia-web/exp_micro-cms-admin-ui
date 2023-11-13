export let API_ENDPOINT: string | null = null;

if (!API_ENDPOINT) {
  API_ENDPOINT = prompt("Enter the API endpoint.", "http://localhost:8000/api") ?? "";
}

export async function checkAuthentication() {
  try {
    return await fetch(`${API_ENDPOINT}/auth`, { credentials: "include" }).then(
      (response) => response.ok
    );
  } catch (e) {
    return false;
  }
}

export async function redirectToMePageIfNotAuthenticated(
  navigate: (to: string) => void
) {
  if (!(await checkAuthentication())) {
    navigate("/tabs/me");
  }
}

export async function signIn(passcode: string) {
  await fetch(`${API_ENDPOINT}/auth/sign-in?passcode=${passcode}`, {
    method: "POST",
    credentials: "include",
  });
}
