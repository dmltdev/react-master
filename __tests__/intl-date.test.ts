import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import intlDate from "../lib/utils/intl-date";

describe("IntlDate", () => {
  describe("getInstance", () => {
    it("should return the same instance on multiple calls", () => {
      const instance1 = intlDate;
      const instance2 = intlDate;
      expect(instance1).toBe(instance2);
    });
  });

  describe("isTimezoneSupported", () => {
    it("should return true for valid timezones", () => {
      expect(intlDate.isTimezoneSupported("Europe/London")).toBe(true);
      expect(intlDate.isTimezoneSupported("Etc/GMT+2")).toBe(true);
      expect(intlDate.isTimezoneSupported("Asia/Kolkata")).toBe(true);
    });

    it("should return false for invalid timezones", () => {
      expect(intlDate.isTimezoneSupported("Invalid/Timezone")).toBe(false);
      expect(intlDate.isTimezoneSupported("Random/Place")).toBe(false);
      expect(intlDate.isTimezoneSupported("GMT+123")).toBe(false);
    });
  });

  describe("formatInTimezone", () => {
    const testDate = new Date("2023-05-15T00:00:00Z");

    it("should format date in different timezones", () => {
      const formatInNewYork = intlDate.formatInTimezone(testDate, "Etc/GMT+5");
      const formatInTokyo = intlDate.formatInTimezone(testDate, "Etc/GMT-9");

      expect(formatInNewYork).not.toEqual(formatInTokyo);
    });

    it("should respect formatting options", () => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      const formattedDate = intlDate.formatInTimezone(
        testDate,
        "Etc/GMT",
        options
      );

      expect(formattedDate).toContain("2023");
      expect(
        [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].some((month) => formattedDate.includes(month))
      ).toBe(true);
    });

    it("should format date with only date options", () => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };

      const formattedDate = intlDate.formatInTimezone(
        testDate,
        "Etc/GMT",
        options
      );

      expect(formattedDate).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it("should format date with only time options", () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };

      const formattedDate = intlDate.formatInTimezone(
        testDate,
        "Etc/GMT",
        options
      );

      expect(formattedDate).toMatch(/\d{1,2}:\d{2} [AP]M/);
    });
  });

  describe("getCurrentTimezone", () => {
    let originalDateTimeFormat;

    beforeEach(() => {
      originalDateTimeFormat = Intl.DateTimeFormat;
    });

    afterEach(() => {
      Intl.DateTimeFormat = originalDateTimeFormat;
    });

    it("should return the current timezone from the browser", () => {
      expect(typeof intlDate.getCurrentTimezone()).toBe("string");
    });

    it("should return the mocked timezone when Intl is mocked", () => {
      const mockTimezone = "Europe/Berlin";

      Intl.DateTimeFormat = vi.fn(() => ({
        resolvedOptions: () => ({
          timeZone: mockTimezone,
        }),
      })) as any;

      expect(intlDate.getCurrentTimezone()).toBe(mockTimezone);
    });
  });

  describe("specific timezone tests", () => {
    const testDate = new Date("2023-01-01T00:00:00Z");

    it('should format date in "Etc/GMT+12" timezone', () => {
      const formatted = intlDate.formatInTimezone(testDate, "Etc/GMT+12");
      expect(formatted).toBeDefined();
    });

    it('should format date in "Asia/Kathmandu" timezone', () => {
      const formatted = intlDate.formatInTimezone(testDate, "Asia/Kathmandu");
      expect(formatted).toBeDefined();
    });

    it('should format date in "Asia/Rangoon" timezone', () => {
      const formatted = intlDate.formatInTimezone(testDate, "Asia/Rangoon");
      expect(formatted).toBeDefined();
    });

    it('should format date in "Asia/Kolkata" timezone', () => {
      const formatted = intlDate.formatInTimezone(testDate, "Asia/Kolkata");
      expect(formatted).toBeDefined();
    });
  });
});
