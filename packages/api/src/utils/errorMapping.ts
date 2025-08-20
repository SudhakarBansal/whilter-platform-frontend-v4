import { toast } from "sonner";
import { CHARP_ERROR_CODES, CharpErrorDetail, CharpErrorCode } from "@whilter/shared-types";

export function errorMapping(err: any, fallbackMessage = "Something went wrong") {
  const code: CharpErrorCode | undefined = err?.code || err?.errorCode;
  const message: string | undefined = err?.message;

  if (code && code in CHARP_ERROR_CODES) {
    const mapped = CHARP_ERROR_CODES[code];
    toast.error(mapped.message);
    return mapped;
  }

  toast.error(message || fallbackMessage);
  return {
    ...(err as CharpErrorDetail),
    code: code as CharpErrorCode | undefined,
  };
}
