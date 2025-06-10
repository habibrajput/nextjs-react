export interface ApiErrorDetail {
  property: string;
  message: string;
}

// Internal store (you could enhance with Zustand, Redux, etc.)
let formErrors: Record<string, string> = {};

/**
 * Stores form errors from API-style responses.
 * @param errors Array of error objects with property and message.
 */
export function setFormErrors(errors: ApiErrorDetail[]) {
  formErrors = {}; // reset previous errors

  for (const error of errors) {
    if (error.property) {
      formErrors[error.property] = error.message;
    }
  }
}

/**
 * Gets the error message for a specific form field.
 * @param property Field name (e.g. 'email', 'name')
 * @returns The error message or undefined
 */
export function getFormError(property: string): string | undefined {
  return formErrors[property];
}

/**
 * Optional: Clears all form errors
 */
export function clearFormErrors() {
  console.log('clearFormErrors');
  formErrors = {};
}
