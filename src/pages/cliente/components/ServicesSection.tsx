import { Stethoscope, Brain, Microscope, Clock } from "lucide-react"

export function ServicesSection() {
    const services = [
        {
            icon: <Stethoscope className="w-12 h-12 text-primary" />,
            title: "Consultas Especializadas",
            description: "Atendimento personalizado com profissionais altamente qualificados"
        },
        {
            icon: <Brain className="w-12 h-12 text-primary" />,
            title: "Diagnóstico Preciso",
            description: "Utilizamos tecnologia de ponta para diagnósticos precisos e eficientes"
        },
        {
            icon: <Microscope className="w-12 h-12 text-primary" />,
            title: "Exames Laboratoriais",
            description: "Resultados rápidos e confiáveis para seus exames"
        },
        {
            icon: <Clock className="w-12 h-12 text-primary" />,
            title: "Atendimento 24h",
            description: "Suporte médico disponível 24 horas por dia, 7 dias por semana"
        }
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Nossos Serviços</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex flex-col items-center text-center">
                                {service.icon}
                                <h3 className="text-xl font-semibold mt-4 mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 