import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Activity className="w-5 h-5 text-gold" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Aishwaryam<span className="text-gold">X</span></span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/input" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Analysis
                    </Link>
                    <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <Link to="/advisor" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        AI Advisor
                    </Link>
                    <Link to="/action-plan" className="text-sm font-bold text-gold hover:text-gold-light transition-colors group flex items-center gap-1">
                        Action Plan
                    </Link>
                </div>
            </div>
        </nav>
    )
}
