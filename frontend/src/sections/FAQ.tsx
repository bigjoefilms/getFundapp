"use client"
import React, { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
    {
      question: "What is this platform about?",
      answer: "This platform is a crowdfunding platform that helps users raise funds for their projects.",
    },
    {
      question: "How can I create a campaign?",
      answer: "To create a campaign, click on the 'Create Campaign' button, fill out the required details, and publish it.",
    },
    {
      question: "Is there a fee to start a campaign?",
      answer: "Yes, we charge a small platform fee to help maintain and improve our services.",
    },
    {
      question: "How do I donate to a campaign?",
      answer: "Simply browse the campaigns, select one that interests you, and follow the instructions to make a donation.",
    },
    {
      question: "Can I withdraw funds from a campaign?",
      answer: "Campaign creators can withdraw funds once the campaign has reached its goal or is completed.",
    },
    {
      question: "Is my donation secure?",
      answer: "Yes, we use secure payment gateways to ensure that your donations are processed safely.",
    },
    {
      question: "Can I edit my campaign after publishing?",
      answer: "Yes, you can make edits to your campaign details from the dashboard as long as it is still active.",
    },
    
  ];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border border-black rounded-lg mt-28">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4 text-[15px]">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border  border-black rounded-lg  shadow-sm"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-800 font-medium focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <svg
                className={`h-5 w-5 text-gray-500 transform ${
                  activeIndex === index ? "rotate-180" : ""
                } transition-transform`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="px-4 py-3 text-gray-600 text-[13px]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
