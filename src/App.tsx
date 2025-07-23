import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Toaster } from './components/ui/toaster'
import SplashScreen from './components/SplashScreen'
import OnboardingFlow from './components/OnboardingFlow'
import Dashboard from './components/Dashboard'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'onboarding' | 'dashboard'>('splash')

  const checkOnboardingStatus = async (user: any) => {
    try {
      // Check if user profile exists in database
      const profiles = await blink.db.userProfiles.list({
        where: { userId: user.id },
        limit: 1
      })
      
      if (profiles.length > 0 && Number(profiles[0].onboardingCompleted) > 0) {
        setCurrentScreen('dashboard')
      } else {
        setCurrentScreen('onboarding')
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error)
      setCurrentScreen('onboarding')
    }
  }

  const handleAuthComplete = (user: any) => {
    setUser(user)
    checkOnboardingStatus(user)
  }

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard')
  }

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      
      if (!state.isLoading && state.user) {
        checkOnboardingStatus(state.user)
      } else if (!state.isLoading && !state.user) {
        setCurrentScreen('splash')
      }
    })

    return unsubscribe
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-[#FDF5F3] to-[#F5E6E0]">
      {currentScreen === 'splash' && <SplashScreen onAuthComplete={handleAuthComplete} />}
      {currentScreen === 'onboarding' && user && (
        <OnboardingFlow user={user} onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === 'dashboard' && user && <Dashboard user={user} />}
      <Toaster />
    </div>
  )
}

export default App