import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight } from 'lucide-react'

export default function Splash() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy w-full m-0 p-0 absolute inset-0 z-50">
            {/* Background ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" />

            <div className="z-10 flex flex-col items-center justify-center space-y-12">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.5 }}
                    className="relative"
                >
                    {/* Glowing rings behind logo */}
                    <motion.div
                        className="absolute inset-0 border-2 border-gold/30 rounded-full"
                        animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute inset-0 border-2 border-gold/20 rounded-full"
                        animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    />

                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur-md rounded-3xl border border-gold/40 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                        <Activity className="w-16 h-16 md:w-20 md:h-20 text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                    </div>
                </motion.div>

                {/* Name Text */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-sm">
                        Aishwaryam<span className="text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold-dark">X</span> AI
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium tracking-widest uppercase letter-spacing-2">
                        Intelligent Wealth Design
                    </p>
                </motion.div>

                {/* Start Button */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="pt-8"
                >
                    <Link to="/input">
                        <button className="group relative px-10 py-5 bg-gold text-navy font-bold text-xl rounded-full overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3">
                            <span className="relative z-10 flex items-center gap-2">
                                Start Analysis <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                        </button>
                    </Link>
                </motion.div>

            </div>
        </div>
    )
}
