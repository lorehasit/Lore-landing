import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WaitlistForm } from "@/components/waitlist-form";

vi.mock("@/app/actions/waitlist", () => ({
  submitWaitlist: vi.fn(async (_prevState: unknown, formData: FormData) => ({
    status: "success",
    message: `You're on the list — we'll reach out at ${formData.get("email")}.`,
  })),
}));

describe("WaitlistForm", () => {
  it("renders an accessible email field and a honeypot hidden from real users", () => {
    render(<WaitlistForm />);
    expect(screen.getByRole("textbox", { name: "Work email" })).toBeInTheDocument();
    // The honeypot input exists in the DOM (bots fill every field they can
    // find) but is visually hidden and out of the tab order.
    const honeypot = document.querySelector('input[name="company"]');
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest(".honeypot-field")).toBeInTheDocument();
  });

  it("shows the success message after a valid submission", async () => {
    const user = userEvent.setup();
    render(<WaitlistForm />);
    await user.type(screen.getByRole("textbox", { name: "Work email" }), "you@yourteam.com");
    await user.click(screen.getByRole("button", { name: /request access/i }));
    expect(
      await screen.findByText(/you're on the list — we'll reach out at you@yourteam\.com/i),
    ).toBeInTheDocument();
  });
});
