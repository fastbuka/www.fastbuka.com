"use client";  // This is a client-side component

import BreadCrumb from "@/components/BreadCrumb";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";


const faqData = [
  {
    category: "Delivery",
    questions: [
      {
        question: "How long does delivery take?",
        answer: "Delivery typically takes between 30 minutes to 1 hour, depending on your location and the availability of delivery drivers."
      },
      {
        question: "Is there a delivery fee?",
        answer: "Yes, a delivery fee may apply based on your location and the total order value."
      },
      {
        question: "Can I track my order?",
        answer: "Yes, you can track your order in real-time through our app or website once it's been dispatched."
      },
      {
        question: "What if I'm not home when the delivery arrives?",
        answer: "You can leave specific delivery instructions when placing your order. If you're not available, our driver will attempt to contact you before leaving."
      }
    ]
  },
  {
    category: "Food",
    questions: [
      {
        question: "Are the meals fresh and hot on delivery?",
        answer: "Yes, all our meals are prepared fresh and delivered hot to ensure you enjoy them at their best."
      },
      {
        question: "Can I customize my food order?",
        answer: "Absolutely! You can add special instructions or requests when placing your order."
      },
      {
        question: "Do you cater to dietary restrictions?",
        answer: "Many of our partner restaurants offer options for various dietary needs. You can filter menu items based on your preferences."
      },
      {
        question: "What if I receive the wrong order?",
        answer: "If you receive an incorrect order, please contact our customer support immediately. We'll work to resolve the issue as quickly as possible."
      }
    ]
  },
  {
    category: "Multi-Vendor Platform",
    questions: [
      {
        question: "How many restaurants are available on FastBuka?",
        answer: "We partner with hundreds of local restaurants, offering a wide variety of cuisines to choose from."
      },
      {
        question: "Can I order from multiple restaurants in one order?",
        answer: "Currently, each order must be placed with a single restaurant. However, you can place multiple orders from different restaurants."
      },
      {
        question: "How are restaurants vetted for quality?",
        answer: "We have a rigorous vetting process for all partner restaurants, ensuring they meet our standards for food quality, hygiene, and service."
      }
    ]
  },
  {
    category: "Payments",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept various payment methods including credit/debit cards, Paystack, and our in-app token system."
      },
      {
        question: "Can I get a refund if my order is wrong?",
        answer: "If there's an issue with your order, please contact our support team, and we'll investigate. Refunds may be issued based on the situation."
      },
      {
        question: "Is it safe to save my payment information on the app?",
        answer: "Yes, we use industry-standard encryption to protect your payment information. You can choose to save or remove your payment details at any time."
      }
    ]
  },
  {
    category: "App Usage",
    questions: [
      {
        question: "How do I create an account?",
        answer: "You can easily create an account by downloading our app or visiting our website and following the 'Sign Up' process."
      },
      {
        question: "Can I order without creating an account?",
        answer: "While we recommend creating an account for the best experience, we do offer a guest checkout option for quick orders."
      }
    ]
  }
];

export default function FaqPage() {
    return (
      <div>
        {/* Breadcrumb */}
        <BreadCrumb
          items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]}
          title="FAQ"
        />
  
        {/* FAQ Section */}
        <div className="py-16 max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Here are answers to some common questions we receive at FastBuka. If you can&apos;t find what you&apos;re looking for, feel free to contact us.
          </p>
  
          {faqData.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-bold text-green-600 mb-6">{section.category}</h2>
  
              <Accordion type="single" collapsible>
                {section.questions.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${index}-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    );
  }
