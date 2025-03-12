import * as React from "react"
import {
    CarouselApi,
    Carousel as CarouselComponent,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { DotButton, useDotButton } from "./carousel-dot-button";

const slides = [
    {
        title: "Confiança e experiência",
        subtitle: "é a nossa marca!",
        image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=2071&auto=format&fit=crop"
    },
    {
        title: "Atendimento humanizado",
        subtitle: "focado em você",
        image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2067&auto=format&fit=crop"
    },
    {
        title: "Tecnologia avançada",
        subtitle: "para seu bem-estar",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
    }
]

export function Carousel() {
    const [api, setApi] = React.useState<CarouselApi>();
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    )

    return (
        <CarouselComponent
            setApi={setApi}
            opts={{
                loop: true,
            }}
            plugins={[plugin.current]}
            className="relative w-full"
        >
            <CarouselContent>
                {slides.map((slide, index) => (
                    <CarouselItem key={index}>
                        <div className="relative min-h-[500px]">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gray-900/70" />
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
                                <div className="flex items-center justify-center p-10">
                                </div>
                                <div className="flex items-center justify-center p-10">
                                    <div className="space-y-4">
                                        <h2 className="text-5xl font-bold text-white leading-tight">
                                            {slide.title}
                                        </h2>
                                        <p className="text-3xl text-gray-300 italic">
                                            {slide.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
                <div className="flex space-x-4">
                    {scrollSnaps.map((_, dotIndex) => (
                        <DotButton
                            key={dotIndex}
                            onClick={() => onDotButtonClick(dotIndex)}
                            className={`${dotIndex === selectedIndex ? 'bg-white' : 'bg-black'} w-4 h-4 rounded-full`}
                            aria-label={`Ir para o slide ${dotIndex + 1}`}
                        />
                    ))}
                </div>
            </div>
        </CarouselComponent>
    )
} 