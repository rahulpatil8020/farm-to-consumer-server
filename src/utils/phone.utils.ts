import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Formats a raw phone number into E.164 format
 * @param rawPhone Raw user input (e.g., "9876543210" or "+91 98765-43210")
 * @param defaultCountry Default country code (e.g., "IN" for India)
 * @returns E.164 formatted phone (e.g., "+919876543210")
 * @throws Error if the phone number is invalid
 */

export const formatPhoneToE164 = (
  rawPhone: string,
  defaultCountry: string = "IN"
): string => {
  const phoneNumber = parsePhoneNumberFromString(
    rawPhone,
    defaultCountry as any
  );

  if (!phoneNumber || !phoneNumber.isValid()) {
    throw new Error("Invalid phone number");
  }

  return phoneNumber.number;
};
