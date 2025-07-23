import { useEffect, useState } from 'react'
import { Heart, Users, MessageCircle, Calendar, Shield } from 'lucide-react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Find Your Tribe",
      description: "Connect with mothers who truly understand your journey"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Meaningful Groups",
      description: "Join small, compatible groups based on your values and needs"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: "Safe Support",
      description: "Access mental health support and specialized communities"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Real Connections",
      description: "Plan activities and build lasting friendships"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Your Privacy",
      description: "Safe, moderated spaces designed for authentic connection"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 2000)

    const splashTimer = setTimeout(() => {
      onComplete()
    }, 8000)

    return () => {
      clearInterval(timer)
      clearTimeout(splashTimer)
    }
  }, [onComplete, features.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Logo */}
        <div className="mb-8 fade-in">
          <div className="w-20 h-20 mx-auto mb-4 kora-gradient rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-accent mb-2">Kora</h1>
          <p className="text-lg text-muted-foreground">
            Community Connection for Mothers
          </p>
        </div>

        {/* Feature showcase */}
        <div className="kora-card p-6 mb-8 slide-up">
          <div className="flex flex-col items-center text-center min-h-[120px] justify-center">
            <div className="mb-3 transition-all duration-500 ease-in-out">
              {features[currentFeature].icon}
            </div>
            <h3 className="text-lg font-semibold text-accent mb-2 transition-all duration-500 ease-in-out">
              {features[currentFeature].title}
            </h3>
            <p className="text-muted-foreground text-sm transition-all duration-500 ease-in-out">
              {features[currentFeature].description}
            </p>
          </div>
          
          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {features.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentFeature 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm"
        >
          Skip intro
        </button>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-8000 ease-linear"
            style={{ width: '100%', animation: 'loadingBar 8s linear forwards' }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}