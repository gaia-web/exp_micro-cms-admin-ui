export let API_ENDPOINT: string | undefined =
  import.meta.env.VITE_API_ENDPOINT ?? "/api";

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

export async function getInfoKeys() {
  return await fetch(`${API_ENDPOINT}/info`).then((response) =>
    response.json()
  );
}

export async function getInfo(key: string) {
  return await fetch(`${API_ENDPOINT}/info/${encodeURIComponent(key)}`).then(
    async (response) => {
      const text = await response.text();
      return {
        content: text,
        contentType: response.headers.get("Content-Type") ?? undefined,
      };
    }
  );
}

export async function createInfo(
  key: string,
  value: string,
  contentType: string = "text/plain"
) {
  return await fetch(`${API_ENDPOINT}/info/${encodeURIComponent(key)}`, {
    method: "POST",
    credentials: "include",
    body: value,
    headers: new Headers({ "content-type": contentType }),
  });
}

export async function updateInfo(
  key: string,
  value: string,
  contentType: string = "text/plain"
) {
  return await fetch(`${API_ENDPOINT}/info/${encodeURIComponent(key)}`, {
    method: "PUT",
    credentials: "include",
    body: value,
    headers: new Headers({ "content-type": contentType }),
  });
}

export async function deleteInfo(key: string) {
  return await fetch(`${API_ENDPOINT}/info/${encodeURIComponent(key)}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function getBlobKeys() {
  return await fetch(`${API_ENDPOINT}/blob`).then((response) =>
    response.json()
  );
}

export function getBlobUrl(key: string) {
  return `${API_ENDPOINT}/blob/${encodeURIComponent(key)}`;
}

export async function createBlob(
  key: string,
  value: ArrayBuffer | undefined,
  contentType: string = "application/octet-stream"
) {
  return await fetch(`${API_ENDPOINT}/blob/${encodeURIComponent(key)}`, {
    method: "POST",
    credentials: "include",
    body: value,
    headers: new Headers({ "content-type": contentType }),
  });
}

export async function updateBlob(
  key: string,
  value: ArrayBuffer | undefined,
  contentType: string = "application/octet-stream"
) {
  return await fetch(`${API_ENDPOINT}/blob/${encodeURIComponent(key)}`, {
    method: "PUT",
    credentials: "include",
    body: value,
    headers: new Headers({ "content-type": contentType }),
  });
}

export async function deleteBlob(key: string) {
  return await fetch(`${API_ENDPOINT}/blob/${encodeURIComponent(key)}`, {
    method: "DELETE",
    credentials: "include",
  });
}
