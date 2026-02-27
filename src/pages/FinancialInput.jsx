import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'

const steps = [
    { id: 'income', title: 'Monthly Income', desc: 'Your average take-home pay after taxes.' },
    { id: 'fixed', title: 'Fixed Expenses', desc: 'Rent, EMIs, utilities, groceries, etc.' },
    { id: 'lifestyle', title: 'Lifestyle Spend', desc: 'Dining out, entertainment, shopping.' },
    { id: 'savings', title: 'Current Savings', desc: 'Total amount currently in your savings/investments.' },
    { id: 'emergency', title: 'Emergency Fund', desc: 'Current cash reserve for emergencies.' },
]

export default function FinancialInput() {
    const navigate = useNavigate()
    const { financialData, setFinancialData } = useStore()
    const [currentStep, setCurrentStep] = useState(0)

    // Local state for the form so we don't spam the global store until next/save
    const [formData, setFormData] = useState({
        income: financialData.income || '',
        fixedExpenses: financialData.fixedExpenses || '',
        lifestyleExpenses: financialData.lifestyleExpenses || '',
        savings: financialData.savings || '',
        emergencyFund: financialData.emergencyFund || '',
    })

    const stepKeys = ['income', 'fixedExpenses', 'lifestyleExpenses', 'savings', 'emergencyFund']

    const handleNext = () => {
        // Save current step to store
        setFinancialData({ [stepKeys[currentStep]]: Number(formData[stepKeys[currentStep]]) })

        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            navigate('/dashboard')
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    // Calculate real-time left over
    const currentIncome = Number(formData.income) || 0
    const currentFixed = Number(formData.fixedExpenses) || 0
    const currentLife = Number(formData.lifestyleExpenses) || 0
    const leftOver = currentIncome - currentFixed - currentLife

    return (
        <div className="flex flex-col md:flex-row h-full min-h-[85vh] gap-8 py-8 container mx-auto px-6">

            {/* Left side: Guide / Preview */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-white">Your Financial Profile</h2>
                <div className="flex flex-col gap-4">
                    {steps.map((step, idx) => (
                        <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${idx === currentStep ? 'bg-surface border-gold/50 shadow-lg shadow-gold/5' : idx < currentStep ? 'bg-surface/50 border-white/5 opacity-70' : 'bg-transparent border-transparent opacity-40'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${idx < currentStep ? 'bg-gold text-navy' : idx === currentStep ? 'bg-gold/20 text-gold border border-gold/50' : 'bg-white/10 text-gray-400'}`}>
                                {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                            </div>
                            <div>
                                <h4 className={`font-semibold ${idx === currentStep ? 'text-white' : 'text-gray-300'}`}>{step.title}</h4>
                                {idx === currentStep && <p className="text-sm text-gray-400 mt-1">{step.desc}</p>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Real-time Preview */}
                {currentStep >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-auto p-6 bg-blue-900/20 rounded-2xl border border-blue-500/20"
                    >
                        <h4 className="text-sm font-medium text-blue-300 mb-2">Monthly Cash Flow Preview</h4>
                        <div className="flex justify-between items-end">
                            <span className="text-gray-400">Remaining:</span>
                            <span className={`text-2xl font-bold ${leftOver >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ₹{leftOver.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Right side: Active Form Step */}
            <div className="w-full md:w-2/3 max-w-2xl bg-surface border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[500px]">
                {/* Progress indicator at top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <h2 className="text-4xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
                        <p className="text-gray-400 mb-8">{steps[currentStep].desc}</p>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-medium">₹</span>
                            <Input
                                autoFocus
                                type="number"
                                className="text-2xl pl-10 h-16 font-medium"
                                placeholder="0"
                                value={formData[stepKeys[currentStep]]}
                                onChange={(e) => setFormData(prev => ({ ...prev, [stepKeys[currentStep]]: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                            />
                        </div>

                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-12 pt-6 border-t border-white/5">
                    <Button
                        variant="ghost"
                        onClick={handlePrev}
                        className={currentStep === 0 ? 'invisible' : ''}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button size="lg" onClick={handleNext} className="rounded-full px-8">
                        {currentStep === steps.length - 1 ? 'Go to Dashboard' : 'Continue'}
                        {currentStep !== steps.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            </div>

        </div>
    )
}
