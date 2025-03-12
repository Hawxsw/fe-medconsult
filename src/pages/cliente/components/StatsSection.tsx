export function StatsSection() {
    const stats = [
        {
            number: "15+",
            label: "Anos de Experiência"
        },
        {
            number: "50k+",
            label: "Pacientes Atendidos"
        },
        {
            number: "30+",
            label: "Especialistas"
        },
        {
            number: "98%",
            label: "Satisfação"
        }
    ]

    return (
        <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div className="text-4xl font-bold mb-2">{stat.number}</div>
                            <div className="text-lg">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 