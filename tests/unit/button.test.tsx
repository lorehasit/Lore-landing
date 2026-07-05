import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, LinkButton } from "@/components/ui/button";

describe("Button", () => {
  it("renders children and applies variant/size classes", () => {
    render(
      <Button variant="orange" size="lg">
        Request access
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Request access" });
    expect(button).toHaveClass("btn", "btn-orange", "btn-lg");
  });

  it("defaults to type=button so it never accidentally submits a form", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("respects an explicit disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("LinkButton", () => {
  it("renders a same-page anchor for hash hrefs", () => {
    render(<LinkButton href="#cta">Request access</LinkButton>);
    const link = screen.getByRole("link", { name: "Request access" });
    expect(link).toHaveAttribute("href", "#cta");
  });

  it("renders a Next.js Link for internal routes", () => {
    render(<LinkButton href="/docs">Docs</LinkButton>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
  });
});
