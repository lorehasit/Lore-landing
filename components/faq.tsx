import { getFaqItems } from "@/sanity/lib/queries";
import { FaqAccordionItem } from "@/components/faq-accordion-item";

export async function Faq() {
  const items = await getFaqItems();

  return (
    <section className="sec sec-tint" id="faq">
      <div className="wrap faq-wrap">
        <div className="faq-left">
          <span className="eyebrow" data-fade="">
            FAQ
          </span>
          <h2 className="h2 split-lines">
            Fair <em>questions.</em>
          </h2>
          <p className="lede" data-fade="">
            Everything an eng lead asks us on the first call.
          </p>
        </div>
        <div className="faq-list">
          {items.map((item, i) => (
            <FaqAccordionItem
              key={item._id}
              question={item.question}
              html={item.html}
              portableText={item.portableText}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
