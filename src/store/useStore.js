import { create } from 'zustand'

export const useStore = create((set) => ({
    financialData: {
        income: 0,
        fixedExpenses: 0,
        lifestyleExpenses: 0,
        savings: 0,
        emergencyFund: 0,
        goal: 0,
    },
    setFinancialData: (data) => set((state) => ({ financialData: { ...state.financialData, ...data } })),
}))
