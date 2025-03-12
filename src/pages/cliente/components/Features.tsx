import Lottie, { LottieRefCurrentProps } from "lottie-react"
import { useEffect, useRef } from "react"
import clockAnimation from '@/assets/wired-outline-45-clock-time-loop-oscillate.json'
import calendarAnimation from '@/assets/wired-outline-2947-calendar-christmas-eve-hover-flutter.json'
import userAnimation from '@/assets/wired-outline-21-avatar-morph-group.json'

interface Feature {
    icon: any;
    title: string;
    description: string;
    isLottie?: boolean;
    speed?: number;
}

const features: Feature[] = [
    {
        icon: calendarAnimation,
        isLottie: true,
        speed: 1,
        title: "Agendamento Online",
        description: "Agende sua consulta a qualquer momento, 24 horas por dia, 7 dias por semana"
    },
    {
        icon: clockAnimation,
        isLottie: true,
        speed: 1,
        title: "Horários Flexíveis",
        description: "Encontre o melhor horário que se adeque à sua rotina"
    },
    {
        icon: userAnimation,
        isLottie: true,
        speed: 0.3,
        title: "Especialistas Qualificados",
        description: "Consulte-se com os melhores profissionais da área médica"
    }
]

const LottieIcon = ({ animation, speed }: { animation: any, speed?: number }) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef.current && speed) {
            lottieRef.current.setSpeed(speed);
        }
    }, [speed]);

    return (
        <Lottie 
            lottieRef={lottieRef}
            animationData={animation}
            loop={true}
            className="w-10 h-10"
        />
    );
};

export function Features() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Nossos Diferenciais
                </h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="text-center p-8 space-y-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto transform transition-transform duration-300 hover:rotate-12 hover:scale-110">
                                {feature.isLottie ? (
                                    <LottieIcon animation={feature.icon} speed={feature.speed} />
                                ) : (
                                    <feature.icon className="h-8 w-8 text-blue-600" />
                                )}
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 