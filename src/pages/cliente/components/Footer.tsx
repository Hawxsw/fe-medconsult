import Lottie, { LottieRefCurrentProps } from "lottie-react"
import { useEffect, useRef } from "react"
import githubAnimation from '@/assets/wired-outline-2572-logo-github-in-reveal.json'
import instagramAnimation from '@/assets/wired-outline-2626-logo-circle-instagram-morph-alone.json'
import linkedinAnimation from '@/assets/wired-outline-2677-logo-square-linkedin-hover-draw.json'
import { Logo } from "@/components/Logo"

const LottieIcon = ({ animation, size = "w-8 h-8" }: { animation: any, size?: string }) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.setSpeed(0.5);
        }
    }, []);

    return (
        <Lottie 
            lottieRef={lottieRef}
            animationData={animation}
            loop={true}
            className={size}
        />
    );
};

export function Footer() {
    return (
        <footer className="bg-white border-t py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-3">
                        <Logo className="h-16 w-auto mb-6" />
                        <p className="text-gray-600 mb-6">
                            Facilitando o acesso à saúde de qualidade através da tecnologia.
                        </p>
                        <p className="text-gray-600 font-semibold">
                            Sua saúde em primeiro lugar.
                        </p>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <h3 className="text-lg font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-600 hover:text-blue-600">Home</a></li>
                            <li><a href="/sobre" className="text-gray-600 hover:text-blue-600">Sobre</a></li>
                            <li><a href="/servicos" className="text-gray-600 hover:text-blue-600">Serviços</a></li>
                            <li><a href="/carreiras" className="text-gray-600 hover:text-blue-600">Carreiras</a></li>
                        </ul>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <h3 className="text-lg font-semibold mb-4">Visite</h3>
                        <address className="text-gray-600 not-italic">
                            MedConsulta Brasil<br />
                            São Paulo, SP<br />
                            Brasil
                        </address>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Novo Negócio</h3>
                            <a href="mailto:contato@medconsulta.com" className="text-gray-600 hover:text-blue-600 block">
                                contato@medconsulta.com
                            </a>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-3">
                        <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
                        <div className="flex gap-6">
                            <a href="https://github.com/Hawxsw" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                                <LottieIcon animation={githubAnimation} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">
                                <LottieIcon animation={instagramAnimation} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">
                                <LottieIcon animation={linkedinAnimation} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm">
                            &copy; 2024 MedConsulta. Todos os direitos reservados.
                        </p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="/termos" className="text-gray-600 hover:text-blue-600 text-sm">Termos</a>
                            <a href="/privacidade" className="text-gray-600 hover:text-blue-600 text-sm">Privacidade</a>
                            <a href="https://github.com/Hawxsw" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 text-sm">
                                Desenvolvido por Hawxssw
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
} 