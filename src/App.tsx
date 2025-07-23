import { useState, useEffect, useCallback } from 'react'
import { blink } from './blink/client'
import SplashScreen from './components/SplashScreen'
import OnboardingFlow from './components/OnboardingFlow'
import Dashboard from './components/Dashboard'

type AppState = 'splash' | 'onboarding' | 'dashboard'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [appState, setAppState] = useState<AppState>('splash')

  const checkOnboardingStatus = useCallback(async (userId: string) => {
    try {
      const profiles = await blink.db.user_profiles.list({
        where: { user_id: userId },
        limit: 1
      })
      
      if (profiles.length > 0 && profiles[0].onboarding_completed) {
        setAppState('dashboard')
      } else {
        setAppState('onboarding')
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error)
      setAppState('onboarding')
    }
  }, [])

  const handleSplashComplete = useCallback(() => {
    if (user) {
      checkOnboardingStatus(user.id)
    } else {
      setAppState('onboarding')
    }
  }, [user, checkOnboardingStatus])

  const handleOnboardingComplete = () => {
    setAppState('dashboard')
  }

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      
      if (!state.isLoading && state.user) {
        // Check if user has completed onboarding
        checkOnboardingStatus(state.user.id)
      }
    })
    return unsubscribe
  }, [checkOnboardingStatus])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="kora-card p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-accent mb-4">Welcome to Kora</h1>
          <p className="text-muted-foreground mb-6">
            Connect with mothers who understand your journey
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="kora-button-primary w-full py-3 px-6"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  switch (appState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />
    case 'onboarding':
      return <OnboardingFlow onComplete={handleOnboardingComplete} />
    case 'dashboard':
      return <Dashboard />
    default:
      return <SplashScreen onComplete={handleSplashComplete} />
  }
}

export default App