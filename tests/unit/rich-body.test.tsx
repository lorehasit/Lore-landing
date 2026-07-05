import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { RichBody } from "@/components/rich-body";

describe("RichBody", () => {
  it("renders trusted HTML when no portable text is given", () => {
    const { container } = render(
      <RichBody html="<p>Wikis demand discipline no team sustains.</p>" portableText={null} />,
    );
    expect(container.querySelector("p")?.textContent).toBe(
      "Wikis demand discipline no team sustains.",
    );
  });

  it("renders portable text blocks when given, ignoring html", () => {
    const block = {
      _type: "block",
      _key: "a",
      style: "normal",
      children: [{ _type: "span", _key: "b", text: "From Sanity", marks: [] }],
      markDefs: [],
    };
    const { container } = render(
      <RichBody html="<p>Should not render</p>" portableText={[block] as never} />,
    );
    expect(container.textContent).toContain("From Sanity");
    expect(container.textContent).not.toContain("Should not render");
  });

  it("renders nothing when given neither source", () => {
    const { container } = render(<RichBody html={null} portableText={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
