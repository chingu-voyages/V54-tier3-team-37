import { isProduction } from "./isProduction.js";

const getReactAddress = (isProd: boolean) => {
  try {
    const urls = process.env.HOME_REACT_ADDRESS?.split(",");
    if (!urls) throw new Error("React urls are not available.");

    const [PROD_URL, DEV_URL]: string[] = urls;
    return isProd ? PROD_URL : DEV_URL;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to define HOME_REACT_ADDRESS"
    );
  }
};

export const HOME_REACT_ADDRESS = getReactAddress(isProduction);
export const LOGGED_IN_REACT_ADDRESS = `${HOME_REACT_ADDRESS}/auth`;
