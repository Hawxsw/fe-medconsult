import logoSvg from '@/assets/logo-medconsulta.svg'

interface LogoProps {
    className?: string;
}

export function Logo({ className = "h-12 w-auto" }: LogoProps) {
    return (
        <img 
            src={logoSvg}
            alt="MedConsulta Logo" 
            className={className}
        />
    );
} 