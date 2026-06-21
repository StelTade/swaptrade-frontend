import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import SocialProofSection from "@/components/SocialProofSection";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, priority: _priority, ...props }) => {
    const React = require("react");
    return React.createElement("img", { alt, ...props });
  },
}));

describe("SocialProofSection", () => {
  it("renders testimonials, case studies, media logos, and trust badges", () => {
    render(<SocialProofSection />);

    expect(
      screen.getByRole("heading", {
        name: /real beta feedback from traders testing swaptrade analysis/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Maya Chen")).toBeInTheDocument();
    expect(screen.getByText("+18.4%")).toBeInTheDocument();
    expect(screen.getByText("MarketWatch")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /owasp aligned/i })).toHaveAttribute(
      "href",
      "https://owasp.org/www-project-top-ten/"
    );
  });

  it("supports manual carousel navigation", () => {
    render(<SocialProofSection />);

    fireEvent.click(screen.getByRole("button", { name: /show next testimonial/i }));

    expect(screen.getByText("Jon Bell")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show testimonial from elena novak/i }));

    expect(screen.getByText("Elena Novak")).toBeInTheDocument();
  });

  it("opens and closes the inline video modal", () => {
    render(<SocialProofSection />);

    fireEvent.click(screen.getByRole("button", { name: /open video testimonial modal/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /how beta users review a swaptrade signal/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SocialProofSection />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
