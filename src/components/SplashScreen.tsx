import { useEffect, useState } from 'react'
import { blink } from '../blink/client'

interface SplashScreenProps {
  onAuthComplete: (user: any) => void
}

export default function SplashScreen({ onAuthComplete }: SplashScreenProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      if (!state.isLoading) {
        setLoading(false)
        if (state.user) {
          onAuthComplete(state.user)
        }
      }
    })

    return unsubscribe
  }, [onAuthComplete])

  const handleGetStarted = () => {
    blink.auth.login()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF5F3] to-[#F5E6E0] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-[#E8A87C] rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF5F3] to-[#F5E6E0] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#E8A87C] rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-[#5D2E1A] text-3xl font-bold">K</span>
          </div>
          <h1 className="text-4xl font-bold text-[#5D2E1A] mb-2">Kora</h1>
          <p className="text-[#5D2E1A]/70 text-lg">Community Connection for Mothers</p>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-[#5D2E1A]/80 text-base leading-relaxed mb-6">
            Find your tribe. Connect with mothers who understand your journey. 
            Build meaningful relationships through AI-powered matching.
          </p>
          
          <div className="space-y-3 text-sm text-[#5D2E1A]/70">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#E8A87C] rounded-full"></div>
              <span>Personalized group matching</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#E8A87C] rounded-full"></div>
              <span>Safe, supportive community</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#E8A87C] rounded-full"></div>
              <span>Mental health support</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGetStarted}
          className="w-full bg-[#5D2E1A] text-[#FDF5F3] py-4 px-6 rounded-2xl font-medium text-lg hover:bg-[#4A2415] transition-colors duration-200 shadow-lg"
        >
          Get Started
        </button>

        <p className="text-xs text-[#5D2E1A]/50 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}