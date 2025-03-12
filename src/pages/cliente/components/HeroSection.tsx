import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function HeroSection() {
    return (
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Agende sua consulta de forma rápida e fácil
                    </h2>
                    <p className="text-xl text-gray-600">
                        Encontre os melhores médicos e especialistas da sua região
                        e marque sua consulta em poucos cliques.
                    </p>
                    <Button size="lg" className="mt-8">
                        Agendar Consulta
                        <Calendar className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
} 