/**
 * Converts any unknown error value to an Error object.
 *
 * @param unknownError - The unknown error value to convert
 * @returns {Error} - An Error object containing appropriate error message
 *
 * @example
 * try {
 *   // Some code that might throw
 *   JSON.parse(invalidJson);
 * } catch (error) {
 *   const normalizedError = getErrorFromUnknown(error);
 *   console.error(normalizedError.message);
 * }
 */
function getErrorFromUnknown(unknownError: unknown): Error {
  if (unknownError instanceof Error) return unknownError;

  if (unknownError === null) {
    return new Error(`Error: null value was returned as an error`);
  }

  if (unknownError === undefined) {
    return new Error(`Error: undefined value was returned as an error`);
  }

  if (unknownError === "") {
    return new Error("Error: empty string was returned as an error");
  }

  if (typeof unknownError === "string") {
    return new Error(unknownError);
  }

  return new Error(String(unknownError));
}

export { getErrorFromUnknown };
