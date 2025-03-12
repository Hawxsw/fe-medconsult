import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
    const faqs = [
        {
            question: "Como posso agendar uma consulta?",
            answer: "Você pode agendar uma consulta através do nosso site, aplicativo ou ligando para nossa central de atendimento."
        },
        {
            question: "Quais convênios são aceitos?",
            answer: "Trabalhamos com os principais convênios do mercado. Entre em contato para verificar se o seu está na lista."
        },
        {
            question: "Qual o horário de funcionamento?",
            answer: "Nosso atendimento é 24 horas para emergências. Para consultas regulares, atendemos de segunda a sábado, das 7h às 20h."
        }
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Perguntas Frequentes</h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible>
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
} 