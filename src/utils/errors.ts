export default {
  genericError: "generic-error",
  alreadyExists: (param: string): string => `${param}-already-exists`,
  required: (param: string): string => `${param}-required`,
  validationError: "validation-error",
  jwtTokenMissing: "jwt-token-missing",
  invalidToken: "invalid-token",
  invalidCombination: "invalid-combination",
  withoutPermission: "user-without-permission",
  notFound: (param: string): string => `${param}-not-found`,
};
