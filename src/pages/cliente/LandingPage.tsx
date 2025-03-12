import { Header } from "./components/Header"
import { HeroSection } from "./components/HeroSection"
import { Features } from "./components/Features"
import { Footer } from "./components/Footer"
import { Carousel } from "./components/Carousel"
import { ServicesSection } from "./components/ServicesSection"
import { TestimonialsSection } from "./components/TestimonialsSection"
import { StatsSection } from "./components/StatsSection"
import { FAQSection } from "./components/FAQSection"

export function LandingPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <div id="inicio">
                <Carousel />
            </div>
            <div id="servicos">
                <ServicesSection />
            </div>
            <div id="estatisticas">
                <StatsSection />
            </div>
            <div id="sobre">
                <HeroSection />
            </div>
            <div id="recursos">
                <Features />
            </div>
            <div id="depoimentos">
                <TestimonialsSection />
            </div>
            <div id="faq">
                <FAQSection />
            </div>
            <Footer />
        </div>
    )
} 