import { QueryResponseType } from "./use-query.types";

export const getQueryUrl = (url: string | URL) => {
  if (url instanceof URL) {
    return url.toString();
  }

  return url;
};

// @todo this can be smarter by getting the response type from the Response headers
export const getQueryResponseData = async (
  data: Response,
  responseType?: QueryResponseType
) => {
  let result;

  switch (responseType || "json") {
    case "text":
      result = await data.text();
      break;
    case "blob":
      result = await data.blob();
      break;
    case "arrayBuffer":
      result = await data.arrayBuffer();
      break;
    case "json":
    default:
      result = await data.json();
      break;
  }

  return result;
};
