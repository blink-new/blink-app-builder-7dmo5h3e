import React from 'react';
import { Heart, Users, MessageCircle, Calendar } from 'lucide-react';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/10 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/kora-logo.png" 
            alt="Kora - Community Connection for Mothers" 
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-accent">
            Find Your Tribe
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Connect with mothers who truly understand your journey. Build meaningful relationships through shared experiences, values, and support.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 py-6">
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50">
            <Users className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-accent">Smart Matching</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50">
            <MessageCircle className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-accent">Safe Spaces</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50">
            <Calendar className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-accent">Group Events</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-accent">Mental Health Support</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="w-full bg-accent text-white py-4 px-6 rounded-full font-semibold text-lg hover:bg-accent/90 transition-colors shadow-lg"
        >
          Get Started
        </button>

        {/* Support Text */}
        <p className="text-sm text-muted-foreground">
          Join thousands of mothers finding connection, support, and friendship
        </p>
      </div>
    </div>
  );
}