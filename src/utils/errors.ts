import { ApiError } from "./apiError";

export class ValidationError extends ApiError {
  constructor(details?: Record<string, any>) {
    super(400, "Validation Error", "Validation Failed", details);
  }
}

export class AuthError extends ApiError {
  constructor(message = "Authentication Failed") {
    super(401, "Auth Error", message);
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: "Resource" | "User") {
    super(404, "Not Found Error", `No ${resource} found`);
  }
}

export class ServerError extends ApiError {
  constructor(message = "Internal Server Error") {
    super(500, "Server Error", message);
  }
}
