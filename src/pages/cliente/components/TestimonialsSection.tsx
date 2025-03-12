import { Marquee } from "@/components/magicui/marquee"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Carlos Silva",
            role: "Paciente",
            image: "https://i.pravatar.cc/150?img=1",
            text: "O atendimento foi excepcional! Me senti muito bem cuidado.",
            initials: "CS"
        },
        {
            name: "Ana Beatriz",
            role: "Paciente",
            image: "https://i.pravatar.cc/150?img=2",
            text: "Profissionais altamente qualificados e atenciosos.",
            initials: "AB"
        },
        {
            name: "Roberto Santos",
            role: "Paciente",
            image: "https://i.pravatar.cc/150?img=3",
            text: "Estrutura moderna e atendimento humanizado.",
            initials: "RS"
        },
        {
            name: "Mariana Costa",
            role: "Paciente",
            image: "https://i.pravatar.cc/150?img=4",
            text: "Sempre que preciso, sou muito bem atendida.",
            initials: "MC"
        },
        {
            name: "Pedro Oliveira",
            role: "Paciente",
            image: "https://i.pravatar.cc/150?img=5",
            text: "Excelente experiência em todas as consultas.",
            initials: "PO"
        }
    ]

    return (
        <section className="py-20 bg-white">

            <Marquee
                pauseOnHover
                className="py-6"
            >
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="mx-4 flex-shrink-0 w-[300px] bg-white p-6 rounded-xl shadow-md"
                    >
                        <div className="flex items-start space-x-4">
                            <Avatar>
                                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{testimonial.name}</h3>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-600 italic">"{testimonial.text}"</p>
                    </div>
                ))}
            </Marquee>
        </section>
    )
} 