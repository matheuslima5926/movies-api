export default {
  genericError: "generic-error",
  alreadyExists: (param: string): string => `${param}-already-exists`,
  required: (param: string): string => `${param}-required`,
  validationError: "validation-error",
  notFound: (param: string): string => `${param}-not-found`,
};
