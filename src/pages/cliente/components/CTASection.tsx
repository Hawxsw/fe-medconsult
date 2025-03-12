import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Pronto para agendar sua consulta?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Não perca tempo! Agende agora mesmo sua consulta com nossos especialistas.
                    </p>
                    <Button size="lg" className="mt-4">
                        Ver Médicos Disponíveis
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
} 