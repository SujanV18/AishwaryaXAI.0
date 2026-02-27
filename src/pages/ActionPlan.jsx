import { useStore } from '../store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { motion } from 'framer-motion'
import { Target, TrendingUp, ShieldAlert, Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react'

export default function ActionPlan() {
    const { financialData } = useStore()

    // Fake data if missing
    const data = financialData.income ? financialData : {
        income: 120000,
        fixedExpenses: 50000,
        lifestyleExpenses: 30000,
        savings: 200000,
        emergencyFund: 100000
    }

    const monthSurplus = data.income - data.fixedExpenses - data.lifestyleExpenses
    const savingsRatio = (Math.max(monthSurplus, 0) / data.income) * 100
    const lifestyleRatio = (data.lifestyleExpenses / data.income) * 100
    const fixedRatio = (data.fixedExpenses / data.income) * 100
    const emergencyRatio = data.emergencyFund / Math.max(data.fixedExpenses, 1)

    // Dynamic calculations for the blueprint
    const targetLifestyle = data.income * 0.20 // Aggressively target 20% for lifestyle
    const lifestyleCut = Math.max(data.lifestyleExpenses - targetLifestyle, 0)

    const targetFixed = data.income * 0.40 // Target 40% fixed
    const fixedCut = Math.max(data.fixedExpenses - targetFixed, 0)

    // Total potential new investing capital
    const newCapital = lifestyleCut + fixedCut
    const futureMonthlySavings = Math.max(monthSurplus, 0) + newCapital

    // 10 year compound interest at 10%
    const current10Yr = data.savings * Math.pow(1.10, 10) + (Math.max(monthSurplus, 0) * 12 * ((Math.pow(1.10, 10) - 1) / 0.10))
    const optimized10Yr = data.savings * Math.pow(1.10, 10) + (futureMonthlySavings * 12 * ((Math.pow(1.10, 10) - 1) / 0.10))
    const difference = optimized10Yr - current10Yr

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="py-8 px-6 space-y-10 max-w-5xl mx-auto">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 flex items-center justify-center md:justify-start gap-3">
                    <Target className="text-gold w-10 h-10" /> Your Master Blueprint
                </h1>
                <p className="text-lg text-gray-400 mt-3 max-w-2xl">
                    We've analyzed your cashflow deeply. Here is your definitive, multi-phase action plan to reconstruct your financial architecture and accelerate your journey to financial independence.
                </p>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">

                {/* Phase 1: Urgent Risk Mitigation */}
                <motion.div variants={item}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold">1</div>
                        <h2 className="text-2xl font-bold text-white">Phase 1: Urgent Risk Mitigation</h2>
                    </div>
                    <Card className="border-red-500/20 bg-gradient-to-br from-surface to-red-950/20 shadow-lg">
                        <CardContent className="p-6 md:p-8 space-y-6">
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Before building wealth, we must plug the holes in the ship. Based on your current profile, here are the immediate structural vulnerabilities:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                {emergencyRatio < 6 && (
                                    <div className="p-5 rounded-xl bg-red-900/20 border border-red-500/30">
                                        <h3 className="text-red-400 font-bold flex items-center gap-2 mb-2"><ShieldAlert className="w-5 h-5" /> Fragile Emergency Buffer</h3>
                                        <p className="text-sm text-gray-300">You currently have {emergencyRatio.toFixed(1)} months of absolute fixed expenses saved. A single medical emergency or job loss will derail your finances.</p>
                                        <div className="mt-4 p-3 bg-red-950 rounded border border-red-900 text-sm/relaxed text-red-200">
                                            <strong>Action Step:</strong> Pause aggressive high-risk investments. Divert 80% of your ₹{Math.max(monthSurplus, 0).toLocaleString('en-IN')} surplus specifically to a Liquid Mutual Fund or Sweep-in FD until you hit ₹{(data.fixedExpenses * 6).toLocaleString('en-IN')}.
                                        </div>
                                    </div>
                                )}

                                {fixedRatio > 50 && (
                                    <div className="p-5 rounded-xl bg-orange-900/20 border border-orange-500/30">
                                        <h3 className="text-orange-400 font-bold flex items-center gap-2 mb-2"><ShieldAlert className="w-5 h-5" /> Heavy Structural Debt/Fixed Costs</h3>
                                        <p className="text-sm text-gray-300">Your fixed obligations consume {fixedRatio.toFixed(1)}% of your income. When fixed costs exceed 50%, every minor income fluctuation induces severe stress.</p>
                                        <div className="mt-4 p-3 bg-orange-950 rounded border border-orange-900 text-sm/relaxed text-orange-200">
                                            <strong>Action Step:</strong> You must aggressively refinance high-interest EMI debt or downsize. Aim to trim roughly ₹{fixedCut.toLocaleString('en-IN')} from recurring fixed needs. Review subscriptions and utility usage immediately.
                                        </div>
                                    </div>
                                )}

                                {lifestyleRatio > 30 && (
                                    <div className="p-5 rounded-xl bg-yellow-900/20 border border-yellow-500/30">
                                        <h3 className="text-yellow-400 font-bold flex items-center gap-2 mb-2"><ShieldAlert className="w-5 h-5" /> Lifestyle Inflation Bleed</h3>
                                        <p className="text-sm text-gray-300">You are spending {lifestyleRatio.toFixed(1)}% on wants. While enjoying life is crucial, breaking the 30% barrier means you are sacrificing your future freedom for current luxury.</p>
                                        <div className="mt-4 p-3 bg-yellow-950/50 rounded border border-yellow-900 text-sm/relaxed text-yellow-200">
                                            <strong>Action Step:</strong> Implement the "72-Hour Rule" for non-essential purchases. Downgrade dining frequency. Target a reduction of ₹{lifestyleCut.toLocaleString('en-IN')} starting this month.
                                        </div>
                                    </div>
                                )}

                                {monthSurplus <= 0 && (
                                    <div className="p-5 rounded-xl bg-purple-900/20 border border-purple-500/30">
                                        <h3 className="text-purple-400 font-bold flex items-center gap-2 mb-2"><ShieldAlert className="w-5 h-5" /> Net Negative Cashflow</h3>
                                        <p className="text-sm text-gray-300">You are spending more than you earn. You are actively accumulating stealth debt (likely on credit cards).</p>
                                        <div className="mt-4 p-3 bg-purple-950 rounded border border-purple-900 text-sm/relaxed text-purple-200">
                                            <strong>Action Step:</strong> Enter absolute austerity mode. Freeze all discretionary spending. Focus 100% on increasing baseline income while slashing every non-survival expense.
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* If no major risks */}
                            {emergencyRatio >= 6 && fixedRatio <= 50 && lifestyleRatio <= 30 && monthSurplus > 0 && (
                                <div className="p-5 rounded-xl bg-green-900/20 border border-green-500/30 flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-green-400 font-bold text-lg mb-1">Excellent Structural Defense</h3>
                                        <p className="text-gray-300">Your emergency fund is fully funded, and your fixed/lifestyle ratios are well within optimal bounds. No urgent mitigation needed—you are ready to focus purely on rapid wealth accumulation.</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Phase 2: System Restructuring */}
                <motion.div variants={item}>
                    <div className="flex items-center gap-3 mb-4 mt-8">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">2</div>
                        <h2 className="text-2xl font-bold text-white">Phase 2: Cashflow Optimization System</h2>
                    </div>
                    <Card className="border-blue-500/20 bg-gradient-to-br from-surface to-blue-900/10 shadow-lg">
                        <CardContent className="p-6 md:p-8">
                            <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                Wealth is not built by what you earn, but by what you capture. We have identified exactly where capital is leaking and how to trap it.
                            </p>

                            <div className="space-y-6">
                                {/* Step A */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-surface border border-white/10 flex items-center justify-center font-bold text-gold text-lg">A</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">The "Pay Yourself First" Automation</h3>
                                        <p className="text-gray-400 leading-relaxed">Most people save what is left after spending. We inverse this. Currently, your baseline surplus is ₹{Math.max(monthSurplus, 0).toLocaleString('en-IN')}.</p>
                                        <ul className="mt-3 space-y-2 text-gray-300">
                                            <li className="flex gap-2 items-start"><ArrowRight className="w-5 h-5 text-blue-400 shrink-0" /> Set up a Systematic Investment Plan (SIP) or recurring auto-transfer for the **1st of every month** or exactly identical to your salary date.</li>
                                            <li className="flex gap-2 items-start"><ArrowRight className="w-5 h-5 text-blue-400 shrink-0" /> Set the amount to **₹{Math.round(Math.max(monthSurplus, 0) * 0.9).toLocaleString('en-IN')}**. (We leave 10% buffer).</li>
                                            <li className="flex gap-2 items-start"><ArrowRight className="w-5 h-5 text-blue-400 shrink-0" /> If you don't see the money in your primary account, you simply cannot spend it on lifestyle inflation. The psychology of artificial scarcity is your strongest tool.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Step B */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-surface border border-white/10 flex items-center justify-center font-bold text-gold text-lg">B</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Surgical Capital Extraction</h3>
                                        <p className="text-gray-400 leading-relaxed">Based on your ratios, we can extract an additional **₹{newCapital.toLocaleString('en-IN')}** per month with minor friction.</p>
                                        <ul className="mt-3 space-y-2 text-gray-300">
                                            {lifestyleCut > 0 && (
                                                <li className="flex gap-2 items-start"><Zap className="w-5 h-5 text-gold shrink-0" /> <strong>Lifestyle Trim (₹{Math.round(lifestyleCut).toLocaleString('en-IN')}):</strong> Choose two categories—dining, or shopping. Cut them by half. You will adapt in 14 days, and the financial stress will drop immensely.</li>
                                            )}
                                            {fixedCut > 0 && (
                                                <li className="flex gap-2 items-start"><Zap className="w-5 h-5 text-gold shrink-0" /> <strong>Fixed Trim (₹{Math.round(fixedCut).toLocaleString('en-IN')}):</strong> Fixed costs are rigid but not impossible to change. Audit streaming services, gym memberships, and negotiate insurance premiums/rent.</li>
                                            )}
                                            {newCapital === 0 && (
                                                <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> <strong>Optimal Extraction Achieved:</strong> Your spending is highly efficient. Your lever now is income generation, not expense cutting.</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Phase 3: Motivational Future State */}
                <motion.div variants={item}>
                    <div className="flex items-center gap-3 mb-4 mt-8">
                        <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold"><Sparkles className="w-4 h-4" /></div>
                        <h2 className="text-2xl font-bold text-white">The Motivation: Your 10-Year Horizon</h2>
                    </div>
                    <Card className="border-gold/30 bg-gradient-to-br from-gold/10 to-navy shadow-[0_0_30px_rgba(212,175,55,0.1)] relative overflow-hidden">
                        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[200%] bg-gold/5 blur-[100px] rounded-full pointer-events-none transform rotate-45" />
                        <CardContent className="p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-10">

                            <div className="flex-1 space-y-4">
                                <h3 className="text-3xl font-black text-white">The Price of Discipline</h3>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    Money is simply stored energy. When you optimize your cash flow and rigidly automate your investments, you aren't just gaining numbers on a screen—you are literally buying back decades of your future time.
                                </p>
                                <p className="text-gold font-medium text-lg pt-4 border-t border-gold/20">
                                    If you implement the steps above, you will increase your monthly investing power to <strong>₹{futureMonthlySavings.toLocaleString('en-IN')}</strong>.
                                </p>
                            </div>

                            <div className="w-full md:w-[40%] shrink-0">
                                <div className="p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md relative">
                                    <div className="absolute -top-3 -right-3">
                                        <span className="relative flex h-6 w-6">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-6 w-6 bg-gold items-center justify-center p-1"><TrendingUp className="text-navy" /></span>
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Impact of Action Plan</p>
                                    <p className="text-sm text-gray-300 mb-4">Extra wealth generated in 10 years just by optimizing:</p>
                                    <h4 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
                                        +₹{(difference / 100000).toFixed(1)}L
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-4 leading-normal">
                                        *Assumes difference between baseline saving and optimized saving invested in low-cost index funds compounding at 10% annually over 10 years.
                                    </p>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </motion.div>

            </motion.div>
        </div>
    )
}
