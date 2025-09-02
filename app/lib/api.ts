const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, ""); 
// ensures no trailing slash

async function fetcher<T = any>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      cache: "no-store",
    });

    if (!res.ok) {
      // Try to parse error body if possible
      let errorMessage = `${res.status} ${res.statusText}`;
      try {
        const errorBody = await res.text();
        if (errorBody) errorMessage += ` - ${errorBody}`;
      } catch (_) {}
      throw new Error(`API Error: ${errorMessage}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return res.json();
    } else if (contentType?.includes("text/")) {
      return (await res.text()) as unknown as T;
    }

    return {} as T; // fallback for empty/no content
  } catch (error) {
    console.error("Network or API Error:", error);
    throw error; // rethrow so UI knows about it
  }
}

// ----------------------
// Public API calls
// ----------------------
export const getPosts = () => fetcher(""); 
export const getPostById = (id: string) => fetcher(`/${id}`);

// ----------------------
// Admin API calls
// ----------------------
export const createPost = (postData: any) =>
  fetcher("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

export const updatePost = (id: string, postData: any) =>
  fetcher(`/${id}`, {
    method: "PUT", // or PATCH if your API expects it
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

export const deletePost = (id: string) =>
  fetcher(`/${id}`, {
    method: "DELETE",
  });
