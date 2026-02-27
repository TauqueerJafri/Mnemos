import { Logo } from "../components/ui/Logo";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <Logo size="lg" />
        </div>
    )
}