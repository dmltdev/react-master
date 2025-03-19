export type TZDBBaseIdentifier =
  | "Etc/GMT+12"
  | "Etc/GMT+11"
  | "Etc/GMT+10"
  | "Etc/GMT+9"
  | "Etc/GMT+8"
  | "Etc/GMT+7"
  | "Etc/GMT+6"
  | "Etc/GMT+5"
  | "Etc/GMT+4"
  | "Etc/GMT+3"
  | "Etc/GMT+2"
  | "Etc/GMT+1"
  | "Etc/GMT"
  | "Etc/GMT-1"
  | "Etc/GMT-2"
  | "Etc/GMT-3"
  | "Etc/GMT-4"
  | "Etc/GMT-5"
  | "Etc/GMT-6"
  | "Etc/GMT-7"
  | "Etc/GMT-8"
  | "Etc/GMT-9"
  | "Etc/GMT-10"
  | "Etc/GMT-11"
  | "Etc/GMT-12"
  | "Etc/GMT-13"
  | "Asia/Kathmandu"
  | "Asia/Rangoon"
  | "Asia/Kolkata";

interface IntlDateFormatter {
  isTimezoneSupported(timeZone: string): boolean;
  formatInTimezone(
    date: Date,
    timeZone: TZDBBaseIdentifier,
    options?: Intl.DateTimeFormatOptions
  ): string;
  getCurrentTimezone(): string;
}

class IntlDate implements IntlDateFormatter {
  private static instance: IntlDateFormatter;

  private constructor() {
    if (IntlDate.instance) {
      throw new Error("Please use getInstance method");
    }
  }

  static getInstance(): IntlDateFormatter {
    if (!IntlDate.instance) {
      IntlDate.instance = new IntlDate();
    }
    return IntlDate.instance;
  }

  public isTimezoneSupported(timeZone: string) {
    try {
      Intl.DateTimeFormat(undefined, { timeZone });
      return true;
    } catch (e) {
      return false;
    }
  }

  public formatInTimezone(
    date: Date,
    timeZone: TZDBBaseIdentifier,
    options?: Intl.DateTimeFormatOptions
  ): string {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      ...options,
    }).format(date);
  }

  public getCurrentTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}

/**
 * @description Utility singleton for internationalized date formatting with timezone support
 * @warning WARNING: THIS IS A WORK IN PROGRESS. DO NOT USE IN PRODUCTION.
 */
const intlDate = IntlDate.getInstance();

export default intlDate;
