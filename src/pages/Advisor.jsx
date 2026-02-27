import { useState } from 'react'
import { useStore } from '../store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Lightbulb, Navigation2, Zap, AlertTriangle, CheckCircle, BrainCircuit, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Advisor() {
    const { financialData } = useStore()

    // Fake data if missing
    const data = financialData.income ? financialData : {
        income: 120000,
        fixedExpenses: 50000,
        lifestyleExpenses: 30000,
        savings: 200000,
    }

    const [spendAmount, setSpendAmount] = useState('')
    const [spendItem, setSpendItem] = useState('')
    const [analysis, setAnalysis] = useState(null)

    const monthSurplus = data.income - data.fixedExpenses - data.lifestyleExpenses
    const safeSpendLimit = monthSurplus * 0.4 // 40% of surplus is "safe"

    const analyzePurchase = () => {
        if (!spendAmount) return
        const amount = Number(spendAmount)

        if (amount <= safeSpendLimit) {
            setAnalysis({
                status: 'safe',
                icon: CheckCircle,
                color: 'text-green-400',
                bg: 'bg-green-500/10 border-green-500/20',
                message: "You're good to go!",
                details: `This purchase uses ${(amount / monthSurplus * 100).toFixed(1)}% of your monthly surplus. It won't hurt your primary savings goals.`
            })
        } else if (amount <= monthSurplus) {
            setAnalysis({
                status: 'caution',
                icon: AlertTriangle,
                color: 'text-yellow-400',
                bg: 'bg-yellow-500/10 border-yellow-500/20',
                message: "Proceed with caution.",
                details: `This consumes ${(amount / monthSurplus * 100).toFixed(1)}% of your surplus. You will have very little left for unexpected expenses this month.`
            })
        } else {
            const monthsDelay = Math.ceil((amount - monthSurplus) / Math.max(monthSurplus, 1))
            setAnalysis({
                status: 'danger',
                icon: AlertTriangle,
                color: 'text-red-400',
                bg: 'bg-red-500/10 border-red-500/20',
                message: "Wealth Hazard Detected.",
                details: `This exceeds your monthly surplus! Buying this now will delay your financial goals by approximately ${monthsDelay} month(s). Consider saving up for it instead.`
            })
        }
    }

    // Analysis and Strategies
    const lifestyleOptimization = Math.round(data.lifestyleExpenses * 0.15);
    const fixedOptimization = Math.round(data.fixedExpenses * 0.05);
    const totalOptimization = lifestyleOptimization + fixedOptimization;
    const monthlySaving = Math.max(monthSurplus, 0);
    const optimizedSaving = monthlySaving + totalOptimization;

    const identifiedRisks = [];
    if (monthSurplus < data.income * 0.1) {
        identifiedRisks.push({ title: 'Low Monthly Surplus', desc: 'Your cash buffer is dangerously thin, leaving little room for unexpected expenses.' })
    }
    if (data.lifestyleExpenses > data.income * 0.3) {
        identifiedRisks.push({ title: 'High Lifestyle Allocation', desc: 'Over 30% of income is going to lifestyle, which slows down wealth accumulation.' })
    }
    if (data.fixedExpenses > data.income * 0.5) {
        identifiedRisks.push({ title: 'Heavy Fixed Obligations', desc: 'High fixed costs limit your financial flexibility.' })
    }
    if (identifiedRisks.length === 0) {
        identifiedRisks.push({ title: 'Optimal Cashflow', desc: 'Your basic ratios look good. Keep focusing on aggressive investing.' })
    }

    const quickImprovements = [
        { title: 'Trim lifestyle spend by 15%', impact: `+₹${lifestyleOptimization.toLocaleString('en-IN')}/mo`, desc: 'A minor trim that yields significant long-term capital.' },
        { title: 'Audit fixed subscriptions', impact: `+₹${fixedOptimization.toLocaleString('en-IN')}/mo`, desc: 'Cancel dormant services or negotiate better utility rates.' },
        { title: 'Automate SIP on salary day', impact: 'High Probability', desc: 'Moving money out before you see it prevents lifestyle inflation.' },
    ];

    // Generate 12 months future projection data
    const generateSimData = () => {
        let currentWealth = data.savings || 0;
        let currentOptWealth = data.savings || 0;

        const chartData = []
        for (let i = 0; i <= 12; i++) {
            chartData.push({
                month: `M${i}`,
                Current: Math.round(currentWealth),
                Optimized: Math.round(currentOptWealth)
            })
            // Assume 8% annual return -> 0.66% monthly return
            currentWealth = (currentWealth + monthlySaving) * 1.0066
            currentOptWealth = (currentOptWealth + optimizedSaving) * 1.0066
        }
        return chartData
    }

    return (
        <div className="py-8 px-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <BrainCircuit className="text-gold w-8 h-8" /> Intelligence Hub
                    </h1>
                    <p className="text-gray-400 mt-1">Smart insights, future projections, and spending analysis.</p>
                </div>
                <Link to="/action-plan">
                    <Button className="bg-gradient-to-r from-gold to-gold-light text-navy border-none shadow-lg shadow-gold/20 hover:shadow-gold/40">
                        View Master Action Plan <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Smart Spend Advisor */}
                <Card className="flex flex-col h-full lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Navigation2 className="text-gold w-5 h-5" /> Smart Spend Advisor
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-1 flex flex-col">
                        <p className="text-sm text-gray-400">Thinking of a big purchase? Let AI calculate its true impact on your wealth trajectory.</p>
                        <div className="space-y-4">
                            <Input
                                placeholder="What do you want to buy? (e.g. iPhone 16)"
                                value={spendItem} onChange={e => setSpendItem(e.target.value)}
                            />
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    className="pl-8"
                                    value={spendAmount} onChange={e => setSpendAmount(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && analyzePurchase()}
                                />
                            </div>
                            <Button onClick={analyzePurchase} className="w-full">Analyze Purchase</Button>
                        </div>

                        <AnimatePresence>
                            {analysis && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className={`mt-6 p-4 rounded-xl border ${analysis.bg} flex gap-4`}
                                >
                                    <analysis.icon className={`w-6 h-6 shrink-0 mt-0.5 ${analysis.color}`} />
                                    <div>
                                        <h4 className={`font-bold ${analysis.color}`}>{analysis.message}</h4>
                                        <p className="text-sm text-gray-300 mt-1 leading-relaxed">{analysis.details}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>

                {/* Micro-Optimizations AI */}
                <Card className="flex flex-col h-full border-gold/20 bg-gradient-to-br from-surface to-gold/5 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="text-gold w-5 h-5 fill-gold/20" /> AI Micro-Optimizations Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-1 flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                            {/* Left Column: Risks & Quick Improvements */}
                            <div className="space-y-6 flex flex-col">
                                <div>
                                    <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Identified Risks</h3>
                                    <div className="space-y-3">
                                        {identifiedRisks.map((risk, i) => (
                                            <div key={i} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 shadow-sm">
                                                <h4 className="font-semibold text-white text-sm">{risk.title}</h4>
                                                <p className="text-xs text-red-200/70 mt-1 leading-relaxed">{risk.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Quick Improvements</h3>
                                    <div className="space-y-3">
                                        {quickImprovements.map((opt, i) => (
                                            <div key={i} className="p-3 rounded-lg bg-surface border border-white/5 shadow-sm">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-semibold text-white text-sm">{opt.title}</h4>
                                                    <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">{opt.impact}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{opt.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Re-allocation Strategy */}
                            <div className="space-y-6 flex flex-col h-full">
                                <div>
                                    <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2"><Navigation2 className="w-4 h-4" /> Monthly Re-allocation Strategy</h3>
                                    <div className="p-5 rounded-xl bg-blue-900/10 border border-blue-500/20 space-y-4 shadow-sm">
                                        <div className="flex justify-between items-center pb-4 border-b border-blue-500/10">
                                            <span className="text-sm text-gray-400">Current Monthly Savings</span>
                                            <span className="text-lg font-bold text-white">₹{monthlySaving.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-blue-500/10">
                                            <span className="text-sm text-gray-400">Identified Capital Release</span>
                                            <span className="text-lg font-bold text-gold">+ ₹{totalOptimization.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-sm text-blue-300 font-medium">Optimized Monthly Savings</span>
                                            <span className="text-2xl font-black text-blue-400">₹{optimizedSaving.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-navy/50 border border-gold/10 flex items-start gap-3 mt-auto shadow-sm">
                                    <Lightbulb className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        <span className="text-gold font-semibold">Compounding magic:</span> Re-allocating this ₹{totalOptimization.toLocaleString('en-IN')} into a low-cost index fund (assumed 8% CAGR) could add <strong>₹{Math.round(totalOptimization * 73.47).toLocaleString('en-IN')}</strong> to your net worth over the next 5 years.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Future Wealth Simulator */}
            <Card>
                <CardHeader>
                    <CardTitle>12-Month Wealth Simulator</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-400 mb-6">Compare your current wealth trajectory versus the AI-optimized trajectory.</p>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={generateSimData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorCur" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <Tooltip
                                    formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                                    contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="Optimized" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorOpt)" />
                                <Area type="monotone" dataKey="Current" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCur)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
