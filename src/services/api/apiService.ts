import { API_CONFIG } from "./config";
import type { ApiErrorResponse } from "./types";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const headers = {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData: ApiErrorResponse = await response.json();
        errorMessage =
          errorData.errors?.[0]?.message || errorData.status || errorMessage;
      } catch (e) {
        console.error(`Failed to parse error response for ${url}`, e);
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error(`API request to ${url} failed:`, {
      error: errorMessage,
      endpoint,
      options,
    });
    throw new Error(`API request failed: ${errorMessage}`);
  }
}
