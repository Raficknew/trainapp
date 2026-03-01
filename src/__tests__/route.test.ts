import { describe, expect, it } from "vitest";
import { isActiveRoute } from "@/lib/utils";

describe("isActiveRoute", () => {
  describe("exact matches", () => {
    it("should return true for exact route match", () => {
      expect(isActiveRoute("/athlete/dashboard", "/athlete/dashboard")).toBe(
        true,
      );
    });

    it("should return false for different routes", () => {
      expect(isActiveRoute("/athlete/profile", "/athlete/dashboard")).toBe(
        false,
      );
    });
  });

  describe("nested routes", () => {
    it("should return true for nested route (one level deep)", () => {
      expect(
        isActiveRoute("/athlete/dashboard/one", "/athlete/dashboard"),
      ).toBe(true);
    });

    it("should return true for nested route (multiple levels deep)", () => {
      expect(
        isActiveRoute("/athlete/dashboard/one/two/three", "/athlete/dashboard"),
      ).toBe(true);
    });

    it("should return true for nested route with query params", () => {
      expect(
        isActiveRoute(
          "/athlete/dashboard/one?tab=settings",
          "/athlete/dashboard",
        ),
      ).toBe(true);
    });
  });

  describe("false positive prevention", () => {
    it("should not match similar route names without separator", () => {
      expect(
        isActiveRoute("/athlete/dashboardsettings", "/athlete/dashboard"),
      ).toBe(false);
    });

    it("should not match substring matches", () => {
      expect(isActiveRoute("/athlete/profile", "/athlete/dash")).toBe(false);
    });

    it("should not match if route name is contained but not as a segment", () => {
      expect(
        isActiveRoute("/athlete/my-dashboard-view", "/athlete/dashboard"),
      ).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle root route", () => {
      expect(isActiveRoute("/", "/")).toBe(true);
    });

    it("should handle single segment routes", () => {
      expect(isActiveRoute("/dashboard", "/dashboard")).toBe(true);
      expect(isActiveRoute("/dashboard/nested", "/dashboard")).toBe(true);
    });

    it("should handle routes with hyphens", () => {
      expect(isActiveRoute("/athlete/sign-in", "/athlete/sign-in")).toBe(true);
      expect(
        isActiveRoute("/athlete/sign-in/callback", "/athlete/sign-in"),
      ).toBe(true);
    });
  });
});
