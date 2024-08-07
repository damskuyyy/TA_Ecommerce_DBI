import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {

  const [value, setValue] = useState('value')

  return (
    <div id="faqs">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-5xl capitalize text-center font-semibold">
          Frequently Asked Questions
        </h1>
        <p className="text-[#455A64] mt-[32px]">
          In this section you can find all the answers you are probably looking
          for. If you still struggle with finding one - don’t hesitate to
          contact us directly.
        </p>
      </div>
      <Accordion
        className="px-16 py-10 rounded-lg border border-[#D4CFCF] mt-[57px]"
        type="single"
        collapsible
        defaultValue="item-1"
      >
        <AccordionItem className={`border-none p-3 ${value === 'item-1' ? 'bg-secondary': ''}`} value="item-1" >
          <AccordionTrigger className="text-xl font-semibold" onClick={() => setValue('item-1')}>
            How can I schedule an appointment?
          </AccordionTrigger>
          <AccordionContent className="text-[16px]">
            Setting up an appointment with us is simple. You can call us, submit
            an online request, enter our online chat facility, or use our
            GoFantastic App, which lets you book your whole service in just 4
            clicks. If you have an account with us, you can even text us to
            secure an appointment.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className={`border-none p-3 ${value === 'item-2' ? 'bg-secondary': ''}`} value="item-2">
          <AccordionTrigger className="text-xl font-semibold" onClick={() => setValue('item-2')}>
            Where can I find a list of prices?
          </AccordionTrigger>
          <AccordionContent className="text-[16px]">
            Setting up an appointment with us is simple. You can call us, submit
            an online request, enter our online chat facility, or use our
            GoFantastic App, which lets you book your whole service in just 4
            clicks. If you have an account with us, you can even text us to
            secure an appointment.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className={`border-none p-3 ${value === 'item-3' ? 'bg-secondary': ''}`} value="item-3">
          <AccordionTrigger className="text-xl font-semibold" onClick={() => setValue('item-3')}>
            How can I pay?
          </AccordionTrigger>
          <AccordionContent className="text-[16px]">
            Setting up an appointment with us is simple. You can call us, submit
            an online request, enter our online chat facility, or use our
            GoFantastic App, which lets you book your whole service in just 4
            clicks. If you have an account with us, you can even text us to
            secure an appointment.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className={`border-none p-3 ${value === 'item-4' ? 'bg-secondary': ''}`} value="item-4">
          <AccordionTrigger className="text-xl font-semibold" onClick={() => setValue('item-4')}>
            Do you take away all the generated waste?
          </AccordionTrigger>
          <AccordionContent className="text-[16px]">
            Setting up an appointment with us is simple. You can call us, submit
            an online request, enter our online chat facility, or use our
            GoFantastic App, which lets you book your whole service in just 4
            clicks. If you have an account with us, you can even text us to
            secure an appointment.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className={`border-none p-3 ${value === 'item-5' ? 'bg-secondary': ''}`} value="item-5">
          <AccordionTrigger className="text-xl font-semibold" onClick={() => setValue('item-5')}>
            Can you maintain my garden after the initial tidy-up?
          </AccordionTrigger>
          <AccordionContent className="text-[16px]">
            Setting up an appointment with us is simple. You can call us, submit
            an online request, enter our online chat facility, or use our
            GoFantastic App, which lets you book your whole service in just 4
            clicks. If you have an account with us, you can even text us to
            secure an appointment.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
