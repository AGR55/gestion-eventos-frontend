import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { memo } from "react";

type FAQ = {
  question: string;
  answer: string;
};

type FaqTabProps = {
  faqs: FAQ[];
};

const FaqTab = memo(({ faqs }: FaqTabProps) => {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">
          No hay preguntas frecuentes disponibles para este evento.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6">
        Preguntas frecuentes
      </h3>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-gray-800"
          >
            <AccordionTrigger className="text-white hover:text-cyan-400 text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 p-6 bg-[#0D1621] rounded-lg border border-gray-800">
        <h4 className="text-lg font-medium text-white mb-4">
          ¿Tienes más preguntas?
        </h4>
        <p className="text-gray-400 mb-4">
          Si no encuentras la respuesta que buscas, puedes contactar
          directamente con el organizador del evento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 py-2 px-4 rounded-md">
            Contactar con el organizador
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md">
            Ver política de cancelación
          </button>
        </div>
      </div>
    </div>
  );
});

FaqTab.displayName = "FaqTab";

export default FaqTab;
