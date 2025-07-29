export type CharpErrorCode =
  | "CHARP-1001"
  | "CHARP-1002"
  | "CHARP-1101"
  | "CHARP-1102"
  | "CHARP-1103"
  | "CHARP-1104"
  | "CHARP-1105"
  | "CHARP-1201"
  | "CHARP-1202"
  | "CHARP-1203"
  | "CHARP-1401"
  | "CHARP-1301"
  | "CHARP-1501"
  | "CHARP-1502"
  | "CHARP-1503";

export interface CharpErrorDetail {
  code: CharpErrorCode;
  status: number;
  message: string;
}

export const CHARP_ERROR_CODES: Record<CharpErrorCode, CharpErrorDetail> = {
  "CHARP-1001": { code: "CHARP-1001", status: 404, message: "Resource not found" },
  "CHARP-1002": { code: "CHARP-1002", status: 409, message: "Resource already exists" },
  "CHARP-1101": { code: "CHARP-1101", status: 401, message: "Bad credentials" },
  "CHARP-1102": { code: "CHARP-1102", status: 401, message: "Token expired" },
  "CHARP-1103": { code: "CHARP-1103", status: 401, message: "Access denied" },
  "CHARP-1104": { code: "CHARP-1104", status: 401, message: "Password mismatch" },
  "CHARP-1105": { code: "CHARP-1105", status: 401, message: "User inactive" },
  "CHARP-1201": { code: "CHARP-1201", status: 422, message: "Blacklisted user" },
  "CHARP-1202": { code: "CHARP-1202", status: 422, message: "Insufficient balance" },
  "CHARP-1203": { code: "CHARP-1203", status: 422, message: "Business exception" },
  "CHARP-1401": { code: "CHARP-1401", status: 400, message: "Bad request" },
  "CHARP-1301": { code: "CHARP-1301", status: 503, message: "Feign service unavailable" },
  "CHARP-1501": { code: "CHARP-1501", status: 500, message: "Database error" },
  "CHARP-1502": { code: "CHARP-1502", status: 500, message: "System error" },
  "CHARP-1503": { code: "CHARP-1503", status: 500, message: "Internal auth error" },
};
