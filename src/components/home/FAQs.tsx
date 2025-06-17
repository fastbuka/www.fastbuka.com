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
      <h2 className="text-[#111111] text-center @max-3xl:mb-9 mb-[46px] 2xl:mb-[60px] font-semibold text-[28px] 2xl:text-[32px]">
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
    question: "How do payments work?",
    answer:
      "Pay via bank transfer, USSD, or crypto. Funds are secured on Stellar blockchain until delivery confirmation.",
  },
  {
    value: "item-2",
    question: "How do payments work?",
    answer:
      "Pay via bank transfer, USSD, or crypto. Funds are secured on Stellar blockchain until delivery confirmation.",
  },
];
