import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQs() {
  return (
    <div className="w-full flex flex-col items-center @max-3xl:pt-5 pt-8 2xl:pt-[42px] pb-[55px] 2xl:pb-[75px]">
      <h2 className="text-(--primary-black) text-center @max-3xl:mb-9 mb-[46px] 2xl:mb-[60px] font-semibold text-[28px] 2xl:text-[32px]">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-[717px] border-t border-[#EAEAEA]"
        defaultValue="item-1"
      >
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={faq.value}>
            <AccordionTrigger className="hover:no-underline text-black text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-4 text-balance text-sm text-[#171717] font-normal">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

const faqs = [
  {
    value: "item-1",
    question: "1. What is FastBuka?",
    answer:
      "FastBuka is a food and grocery delivery app that lets you order from local vendors and pay using crypto or local currency — all in one tap.",
  },
  {
    value: "item-2",
    question: "2. How do I pay for my order?",
    answer:
      "You can pay with your local currency or with crypto like USDC, XLM, or NGNC directly through your FastBuka wallet.",
  },
  {
    value: "item-3",
    question: "3. Is FastBuka available in my city?",
    answer:
      "We’re expanding fast! Check the app or website to see if we currently deliver in your area.",
  },
  {
    value: "item-4",
    question: "4. How secure is my payment?",
    answer:
      "Very secure. FastBuka uses Stellar blockchain to process payments instantly and safely.",
  },
  {
    value: "item-5",
    question: "5. What if my order is wrong or delayed?",
    answer:
      "You can easily report issues in-app. Our support team will resolve it quickly or issue a refund if needed.",
  },
  {
    value: "item-6",
    question: "6. Can I swap currencies inside the app?",
    answer:
      "Yes! Use the FastBuka wallet to convert supported digital currencies to the vendor’s accepted currency before checkout",
  },
  {
    value: "item-7",
    question: "7. How do I become a vendor or rider?",
    answer:
      "Simply register via the app and submit your verification details. We’ll review and onboard you shortly.",
  },
];
