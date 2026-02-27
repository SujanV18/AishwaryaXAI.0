import { useStore } from '../store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { CircularProgress } from '../components/ui/CircularProgress'
import { Button } from '../components/ui/Button'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Brain, Sparkles, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const { financialData } = useStore()

    // Fake data if not filled
    const data = financialData.income ? financialData : {
        income: 100000,
        fixedExpenses: 40000,
        lifestyleExpenses: 30000,
        savings: 150000,
        emergencyFund: 100000
    }

    const { income, fixedExpenses, lifestyleExpenses, savings, emergencyFund } = data
    const monthlySavings = income - fixedExpenses - lifestyleExpenses

    // Calculate Score (0-100)
    let score = 0
    const savingsRatio = (monthlySavings / income) * 100
    const fixedRatio = (fixedExpenses / income) * 100
    const lifestyleRatio = (lifestyleExpenses / income) * 100
    const emergencyRatio = emergencyFund / fixedExpenses // months of emergency

    if (savingsRatio >= 20) score += 30
    else if (savingsRatio > 0) score += (savingsRatio / 20) * 30

    if (fixedRatio <= 50) score += 30
    else if (fixedRatio < 80) score += ((80 - fixedRatio) / 30) * 30

    if (lifestyleRatio <= 30) score += 20
    else if (lifestyleRatio < 50) score += ((50 - lifestyleRatio) / 20) * 20

    if (emergencyRatio >= 6) score += 20
    else score += (emergencyRatio / 6) * 20

    const finalScore = Math.min(Math.round(score), 100)

    let riskBadge = { text: 'Excellent', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' }
    if (finalScore < 50) riskBadge = { text: 'High Risk', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' }
    else if (finalScore < 75) riskBadge = { text: 'Needs Tuning', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' }

    const chartData = [
        { name: 'Fixed Needs', value: fixedExpenses, color: '#3b82f6' }, // Blue
        { name: 'Lifestyle', value: lifestyleExpenses, color: '#8b5cf6' }, // Purple
        { name: 'Savings', value: Math.max(monthlySavings, 0), color: '#10b981' }, // Green
    ]

    return (
        <div className="py-8 px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Financial Intelligence</h1>
                    <p className="text-gray-400 mt-1">Here is your AI-analyzed wealth trajectory.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary"><TrendingUp className="w-4 h-4 mr-2" /> Simulate Future</Button>
                    <Button className="bg-gradient-to-r from-gold to-gold-light text-navy border-none"><Brain className="w-4 h-4 mr-2" /> AI Advisor</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Health Score Card */}
                <Card className="md:col-span-1 bg-gradient-to-br from-surface to-background flex justify-center items-center p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
                    <div className="flex flex-col items-center">
                        <CircularProgress
                            value={finalScore}
                            size={180}
                            strokeWidth={14}
                            indicatorClassName={finalScore > 75 ? 'text-green-500' : finalScore > 50 ? 'text-yellow-500' : 'text-red-500'}
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-5xl font-black text-white">{finalScore}</span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Score</span>
                            </div>
                        </CircularProgress>

                        <div className={`mt-6 px-4 py-1.5 rounded-full border text-sm font-semibold flex items-center gap-2 ${riskBadge.bg} ${riskBadge.color}`}>
                            {finalScore < 50 && <ShieldAlert className="w-4 h-4" />}
                            {riskBadge.text}
                        </div>
                    </div>
                </Card>

                {/* Chart Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Monthly Cash Flow Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                                    contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Savings Ratio" value={`${savingsRatio.toFixed(1)}%`} target="> 20%" isGood={savingsRatio >= 20} />
                <MetricCard title="Fixed Needs" value={`${fixedRatio.toFixed(1)}%`} target="< 50%" isGood={fixedRatio <= 50} />
                <MetricCard title="Emergency Fund" value={`${emergencyRatio.toFixed(1)} mo`} target="> 6 mo" isGood={emergencyRatio >= 6} />
            </div>

            {/* Smart Spend Advisor Callout */}
            <Card className="bg-blue-900/20 border-blue-500/20 p-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                            <Sparkles className="w-5 h-5" /> Smart Spend Advisor
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Planning a big purchase?</h3>
                        <p className="text-blue-200/70">Analyze the true impact of buying that new phone or taking that vacation before you spend.</p>
                    </div>
                    <Link to="/advisor">
                        <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">Analyze a Purchase <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </Link>
                </div>
            </Card>

        </div>
    )
}

function MetricCard({ title, value, target, isGood }) {
    return (
        <Card>
            <CardContent className="p-6">
                <h4 className="text-sm font-medium text-gray-400 mb-1">{title}</h4>
                <div className="flex items-end gap-3 mb-2">
                    <span className="text-3xl font-bold text-white">{value}</span>
                </div>
                <div className={`text-sm ${isGood ? 'text-green-400' : 'text-yellow-400'}`}>
                    Target: {target} {isGood ? '✓' : '•'}
                </div>
            </CardContent>
        </Card>
    )
}
