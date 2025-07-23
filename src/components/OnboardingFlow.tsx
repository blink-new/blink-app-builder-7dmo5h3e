import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Checkbox } from './ui/checkbox'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { blink } from '../blink/client'
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react'

interface OnboardingFlowProps {
  user: any
  onComplete: () => void
}

export default function OnboardingFlow({ user, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
    connectionType: 'groups', // 'groups' or 'oneOnOne'
    interests: [] as string[],
    values: [] as string[],
    parentingStyle: '',
    circumstances: [] as string[],
    kidsInfo: [] as { age: string; school: string }[],
    location: '',
    availability: [] as string[],
    depthPreference: '',
    goals: ''
  })

  const steps = [
    'Profile Setup',
    'Connection Preferences', 
    'Interests & Values',
    'Parenting Style',
    'Kids Information',
    'Location & Availability',
    'Depth Matching',
    'Final Setup'
  ]

  const interestCategories = [
    { category: 'Wellness', items: ['Yoga', 'Meditation', 'Fitness', 'Mental Health', 'Nutrition'] },
    { category: 'Activities', items: ['Hiking', 'Reading', 'Cooking', 'Crafts', 'Photography'] },
    { category: 'Parenting', items: ['Gentle Parenting', 'Montessori', 'Homeschooling', 'Sleep Training', 'Baby Wearing'] },
    { category: 'Lifestyle', items: ['Minimalism', 'Sustainability', 'Travel', 'Career', 'Entrepreneurship'] }
  ]

  const values = [
    'Authenticity', 'Compassion', 'Growth', 'Balance', 'Community',
    'Creativity', 'Adventure', 'Mindfulness', 'Tradition', 'Innovation'
  ]

  const circumstances = [
    'Migrant Mother', 'Remote/Work from Home', 'Foster Mother', 'Adoption Mother',
    'Medical Issues', 'Child with Medical Issues', 'Neurodivergent Mother', 
    'Child with Special Needs', 'Single Mother', 'Military Family'
  ]

  const handleComplete = async () => {
    try {
      // Save user profile to database
      await blink.db.userProfiles.create({
        userId: user.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        profilePicture: formData.profilePicture,
        connectionType: formData.connectionType,
        interests: formData.interests,
        values: formData.values,
        parentingStyle: formData.parentingStyle,
        circumstances: formData.circumstances,
        kidsInfo: formData.kidsInfo,
        location: formData.location,
        availability: formData.availability,
        depthPreference: formData.depthPreference,
        goals: formData.goals,
        onboardingCompleted: true,
        createdAt: new Date().toISOString()
      })
      
      onComplete()
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const toggleValue = (value: string) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.includes(value)
        ? prev.values.filter(v => v !== value)
        : [...prev.values, value]
    }))
  }

  const toggleCircumstance = (circumstance: string) => {
    setFormData(prev => ({
      ...prev,
      circumstances: prev.circumstances.includes(circumstance)
        ? prev.circumstances.filter(c => c !== circumstance)
        : [...prev.circumstances, circumstance]
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Profile Setup
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#5D2E1A] mb-2">Let's get to know you</h2>
              <p className="text-[#5D2E1A]/70">Tell us a bit about yourself</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Profile Picture</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#E8A87C]/20 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#5D2E1A]" />
                  </div>
                  <Button variant="outline" className="text-[#5D2E1A] border-[#E8A87C]">
                    Upload Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 1: // Connection Preferences
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#5D2E1A] mb-2">How do you prefer to connect?</h2>
              <p className="text-[#5D2E1A]/70">Choose your preferred connection style</p>
            </div>
            
            <RadioGroup 
              value={formData.connectionType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, connectionType: value }))}
              className="space-y-4"
            >
              <Card className="p-4 border-2 border-transparent data-[state=checked]:border-[#E8A87C]">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="groups" id="groups" />
                  <Label htmlFor="groups" className="flex-1 cursor-pointer">
                    <div>
                      <h3 className="font-semibold text-[#5D2E1A]">Small Groups (3-6 members)</h3>
                      <p className="text-sm text-[#5D2E1A]/70">Join intimate communities with shared interests</p>
                    </div>
                  </Label>
                </div>
              </Card>
              
              <Card className="p-4 border-2 border-transparent data-[state=checked]:border-[#E8A87C]">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="oneOnOne" id="oneOnOne" />
                  <Label htmlFor="oneOnOne" className="flex-1 cursor-pointer">
                    <div>
                      <h3 className="font-semibold text-[#5D2E1A]">One-on-One Connections</h3>
                      <p className="text-sm text-[#5D2E1A]/70">Build deep friendships through personal connections</p>
                    </div>
                  </Label>
                </div>
              </Card>
            </RadioGroup>
          </div>
        )

      case 2: // Interests & Values
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#5D2E1A] mb-2">What interests you?</h2>
              <p className="text-[#5D2E1A]/70">Select topics you'd love to discuss and explore</p>
            </div>
            
            <div className="space-y-6">
              {interestCategories.map((category) => (
                <div key={category.category}>
                  <h3 className="font-semibold text-[#5D2E1A] mb-3">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((interest) => (
                      <Badge
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          formData.interests.includes(interest)
                            ? 'bg-[#E8A87C] text-[#5D2E1A] hover:bg-[#D4956A]'
                            : 'border-[#E8A87C] text-[#5D2E1A] hover:bg-[#E8A87C]/10'
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              
              <div>
                <h3 className="font-semibold text-[#5D2E1A] mb-3">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => (
                    <Badge
                      key={value}
                      variant={formData.values.includes(value) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        formData.values.includes(value)
                          ? 'bg-[#E8A87C] text-[#5D2E1A] hover:bg-[#D4956A]'
                          : 'border-[#E8A87C] text-[#5D2E1A] hover:bg-[#E8A87C]/10'
                      }`}
                      onClick={() => toggleValue(value)}
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3: // Parenting Style
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#5D2E1A] mb-2">Your parenting approach</h2>
              <p className="text-[#5D2E1A]/70">Help us match you with like-minded parents</p>
            </div>
            
            <RadioGroup 
              value={formData.parentingStyle} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, parentingStyle: value }))}
              className="space-y-3"
            >
              {['Gentle/Attachment', 'Structured/Traditional', 'Balanced/Flexible', 'Child-Led/Natural', 'Still Figuring It Out'].map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <RadioGroupItem value={style} id={style} />
                  <Label htmlFor={style} className="text-[#5D2E1A]">{style}</Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="mt-8">
              <h3 className="font-semibold text-[#5D2E1A] mb-3">Special Circumstances (Optional)</h3>
              <p className="text-sm text-[#5D2E1A]/70 mb-4">Select any that apply to help us connect you with relevant support</p>
              <div className="space-y-2">
                {circumstances.map((circumstance) => (
                  <div key={circumstance} className="flex items-center space-x-2">
                    <Checkbox
                      id={circumstance}
                      checked={formData.circumstances.includes(circumstance)}
                      onCheckedChange={() => toggleCircumstance(circumstance)}
                    />
                    <Label htmlFor={circumstance} className="text-sm text-[#5D2E1A]">{circumstance}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 4: // Kids Information
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#5D2E1A] mb-2">Tell us about your kids</h2>
              <p className="text-[#5D2E1A]/70">This helps us match you with parents in similar stages</p>
            </div>
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full border-[#E8A87C] text-[#5D2E1A]"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  kidsInfo: [...prev.kidsInfo, { age: '', school: '' }] 
                }))}
              >
                Add Child
              </Button>
              
              {formData.kidsInfo.map((kid, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div>
                      <Label>Age/Age Range</Label>
                      <Input
                        value={kid.age}
                        onChange={(e) => {
                          const newKids = [...formData.kidsInfo]
                          newKids[index].age = e.target.value
                          setFormData(prev => ({ ...prev, kidsInfo: newKids }))
                        }}
                        placeholder="e.g., 3 years old, 5-7 years"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>School/Daycare (Optional)</Label>
                      <Input
                        value={kid.school}
                        onChange={(e) => {
                          const newKids = [...formData.kidsInfo]
                          newKids[index].school = e.target.value
                          setFormData(prev => ({ ...prev, kidsInfo: newKids }))
                        }}
                        placeholder="School name or 'At home'"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 5: // Location & Availability
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#5D2E1A] mb-2">Where and when?</h2>
              <p className="text-[#5D2E1A]/70">Help us find local connections and plan meetups</p>
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State or General Area"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>When are you typically available?</Label>
              <div className="mt-3 space-y-2">
                {['Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings', 'Weekend Mornings', 'Weekend Afternoons', 'Weekend Evenings'].map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox
                      id={time}
                      checked={formData.availability.includes(time)}
                      onCheckedChange={() => {
                        setFormData(prev => ({
                          ...prev,
                          availability: prev.availability.includes(time)
                            ? prev.availability.filter(t => t !== time)
                            : [...prev.availability, time]
                        }))
                      }}
                    />
                    <Label htmlFor={time} className="text-[#5D2E1A]">{time}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 6: // Depth Matching
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#5D2E1A] mb-2">Connection depth</h2>
              <p className="text-[#5D2E1A]/70">What kind of relationships are you looking for?</p>
            </div>
            
            <RadioGroup 
              value={formData.depthPreference} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, depthPreference: value }))}
              className="space-y-4"
            >
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="casual" id="casual" />
                  <Label htmlFor="casual" className="flex-1 cursor-pointer">
                    <div>
                      <h3 className="font-semibold text-[#5D2E1A]">Casual Connections</h3>
                      <p className="text-sm text-[#5D2E1A]/70">Light conversations, activity partners, occasional meetups</p>
                    </div>
                  </Label>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="meaningful" id="meaningful" />
                  <Label htmlFor="meaningful" className="flex-1 cursor-pointer">
                    <div>
                      <h3 className="font-semibold text-[#5D2E1A]">Meaningful Friendships</h3>
                      <p className="text-sm text-[#5D2E1A]/70">Deeper conversations, regular check-ins, mutual support</p>
                    </div>
                  </Label>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="deep" id="deep" />
                  <Label htmlFor="deep" className="flex-1 cursor-pointer">
                    <div>
                      <h3 className="font-semibold text-[#5D2E1A]">Deep Bonds</h3>
                      <p className="text-sm text-[#5D2E1A]/70">Close friendships, vulnerable sharing, strong support system</p>
                    </div>
                  </Label>
                </div>
              </Card>
            </RadioGroup>
          </div>
        )

      case 7: // Final Setup
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#5D2E1A] mb-2">Almost there!</h2>
              <p className="text-[#5D2E1A]/70">Any final thoughts or goals?</p>
            </div>
            
            <div>
              <Label htmlFor="goals">What are you hoping to get from Kora? (Optional)</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                placeholder="Share your hopes, goals, or what you're looking for in this community..."
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <Card className="p-4 bg-[#E8A87C]/10 border-[#E8A87C]/30">
              <h3 className="font-semibold text-[#5D2E1A] mb-2">You're all set!</h3>
              <p className="text-sm text-[#5D2E1A]/70">
                We'll use your preferences to suggest compatible groups and connections. 
                You can always update your profile later in settings.
              </p>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Progress Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#5D2E1A]/70">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-[#5D2E1A]/70">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-[#E8A87C]/20 rounded-full h-2">
          <div 
            className="bg-[#E8A87C] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto">
        {renderStep()}
        
        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="border-[#E8A87C] text-[#5D2E1A]"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            className="bg-[#5D2E1A] hover:bg-[#4A2415] text-white"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  )
}