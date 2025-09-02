const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetcher(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch from ${url}`);
    }
    // Handle cases where the response might be empty (e.g., DELETE)
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return res.json();
    }
    return {};
  } catch (error) {
    console.error('Network or API Error:', error);
    return null;
  }
}
// Public API calls
export const getPosts = () => fetcher('/posts');
export const getPostById = (id: string) => fetcher(`/posts/${id}`);

// Admin API calls
export const createPost = (postData: any) => fetcher('/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(postData),
});

export const updatePost = (id: string, postData: any) => fetcher(`/posts/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(postData),
});

export const deletePost = (id: string) => fetcher(`/posts/${id}`, {
  method: 'DELETE',
});