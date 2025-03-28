import { Request } from "express";

// We exchange the authorization code for an access and ID token
// by making a post request to Google’s access token endpoint
export const extractCode = (req: Request, state: string) => {
  // Parse the URL to extract necessary parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const q = Object.fromEntries(url.searchParams.entries());
  if (!q.code) throw new Error("no code to extract from the request query");
  try {
    if (q.error) {
      // An error response e.g. error=access_denied
      console.error("Error:" + q.error);
      throw new Error(q.error);
      // Check state value
    } else if (q.state !== state) {
      throw new Error("State mismatch. Possible CSRF attack");
    }
    return q.code;
  } catch (error) {
    throw new Error(
      `failed to extract code from the request query: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
