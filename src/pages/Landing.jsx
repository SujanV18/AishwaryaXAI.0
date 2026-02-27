import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function Landing() {
    return (
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden w-full">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-navy">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[120px] rounded-full animate-pulse " />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-6 py-20 text-center max-w-4xl z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 p-4 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 inline-flex items-center justify-center shadow-2xl shadow-gold/10"
                >
                    <Activity className="w-12 h-12 text-gold" />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Design Your Prosperity <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">with Intelligence</span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Aishwaryam X AI is your modern, intelligent financial operating system. Uncover blind spots, detect overspending, and optimize your wealth trajectory.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link to="/input" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto rounded-full text-lg px-8 py-6 shadow-xl shadow-gold/20 hover:shadow-gold/40 group">
                            Start Your Analysis
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link to="/dashboard" className="w-full sm:w-auto">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-full text-lg px-8 py-6">
                            View Demo Dashboard
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    {[
                        { icon: TrendingUp, title: "Wealth Simulation", desc: "Project your financial future up to 3 years ahead with real-time variables." },
                        { icon: Zap, title: "Micro-Optimizations", desc: "AI-driven actionable steps to increase your savings without hurting lifestyle." },
                        { icon: ShieldCheck, title: "Smart Spend Advisor", desc: "Know instantly if a purchase is safe, risky, or a wealth hazard." },
                    ].map((feature, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-gold/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-gold" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
