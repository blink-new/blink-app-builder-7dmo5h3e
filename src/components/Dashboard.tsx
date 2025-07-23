import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { blink } from '../blink/client'
import { 
  Home, 
  Users, 
  MessageCircle, 
  Calendar, 
  Heart, 
  Settings,
  Plus,
  Search
} from 'lucide-react'

interface DashboardProps {
  user: any
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home')
  const [userProfile, setUserProfile] = useState<any>(null)
  const [suggestedGroups] = useState([
    {
      id: 1,
      name: 'Mums and bubs Surry Hills',
      description: 'Local mothers with babies and toddlers in Surry Hills area',
      members: 8,
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop',
      tags: ['Local', 'Babies', 'Toddlers'],
      nextEvent: 'Parks and picnics - Tomorrow 10:30 AM'
    },
    {
      id: 2,
      name: 'Pilates and kiddo\'s',
      description: 'Fitness-focused mums who love pilates and active lifestyle',
      members: 12,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      tags: ['Fitness', 'Wellness', 'Active'],
      nextEvent: 'Coffee and Catchup - Friday 9:00 AM'
    },
    {
      id: 3,
      name: 'Easter show adventure',
      description: 'Planning fun family outings and adventures together',
      members: 6,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
      tags: ['Adventures', 'Family', 'Events'],
      nextEvent: 'Easter Show - Next Week'
    }
  ])

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profiles = await blink.db.userProfiles.list({
          where: { userId: user.id },
          limit: 1
        })
        if (profiles.length > 0) {
          setUserProfile(profiles[0])
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }

    if (user?.id) {
      loadUserProfile()
    }
  }, [user?.id])

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-[#5D2E1A] mb-2">
          Welcome back, {userProfile?.firstName || 'there'}! 👋
        </h1>
        <p className="text-[#5D2E1A]/70">
          Here are some groups we think you'd love
        </p>
      </div>

      {/* Suggested Groups */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#5D2E1A]">Suggested for you</h2>
          <Button variant="ghost" size="sm" className="text-[#5D2E1A]">
            See all
          </Button>
        </div>
        
        {suggestedGroups.map((group) => (
          <Card key={group.id} className="p-4 kora-card kora-shadow">
            <div className="flex space-x-4">
              <img 
                src={group.image} 
                alt={group.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#5D2E1A] mb-1">{group.name}</h3>
                <p className="text-sm text-[#5D2E1A]/70 mb-2 line-clamp-2">{group.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {group.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-[#E8A87C]/20 text-[#5D2E1A]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5D2E1A]/60">{group.members} members</span>
                  <Button size="sm" className="bg-[#5D2E1A] hover:bg-[#4A2415] text-white text-xs">
                    Join Group
                  </Button>
                </div>
                {group.nextEvent && (
                  <div className="mt-2 p-2 bg-[#E8A87C]/10 rounded-lg">
                    <p className="text-xs text-[#5D2E1A]/80">📅 {group.nextEvent}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Card className="p-4 text-center kora-card">
          <div className="w-12 h-12 bg-[#E8A87C]/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6 text-[#5D2E1A]" />
          </div>
          <h3 className="font-semibold text-[#5D2E1A] mb-1">Find Groups</h3>
          <p className="text-xs text-[#5D2E1A]/70">Discover communities near you</p>
        </Card>
        
        <Card className="p-4 text-center kora-card">
          <div className="w-12 h-12 bg-[#E8A87C]/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-[#5D2E1A]" />
          </div>
          <h3 className="font-semibold text-[#5D2E1A] mb-1">Create Event</h3>
          <p className="text-xs text-[#5D2E1A]/70">Plan something fun</p>
        </Card>
      </div>
    </div>
  )

  const renderCommunitiesTab = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-[#5D2E1A] mb-2">Communities</h1>
        <p className="text-[#5D2E1A]/70">Your groups and connections</p>
      </div>
      
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#E8A87C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-[#5D2E1A]" />
        </div>
        <h3 className="font-semibold text-[#5D2E1A] mb-2">No communities yet</h3>
        <p className="text-sm text-[#5D2E1A]/70 mb-4">Join your first group to get started</p>
        <Button className="bg-[#5D2E1A] hover:bg-[#4A2415] text-white">
          Browse Groups
        </Button>
      </div>
    </div>
  )

  const renderChatTab = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-[#5D2E1A] mb-2">Messages</h1>
        <p className="text-[#5D2E1A]/70">Your conversations</p>
      </div>
      
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#E8A87C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-[#5D2E1A]" />
        </div>
        <h3 className="font-semibold text-[#5D2E1A] mb-2">No messages yet</h3>
        <p className="text-sm text-[#5D2E1A]/70 mb-4">Start connecting with other mothers</p>
        <Button className="bg-[#5D2E1A] hover:bg-[#4A2415] text-white">
          Find Connections
        </Button>
      </div>
    </div>
  )

  const renderEventsTab = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-[#5D2E1A] mb-2">Events</h1>
        <p className="text-[#5D2E1A]/70">Upcoming activities</p>
      </div>
      
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#E8A87C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-[#5D2E1A]" />
        </div>
        <h3 className="font-semibold text-[#5D2E1A] mb-2">No events yet</h3>
        <p className="text-sm text-[#5D2E1A]/70 mb-4">Join groups to see upcoming events</p>
        <Button className="bg-[#5D2E1A] hover:bg-[#4A2415] text-white">
          Explore Events
        </Button>
      </div>
    </div>
  )

  const renderSupportTab = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-[#5D2E1A] mb-2">Support</h1>
        <p className="text-[#5D2E1A]/70">Mental health and wellness</p>
      </div>
      
      <Card className="p-6 kora-card kora-shadow">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#E8A87C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-[#5D2E1A]" />
          </div>
          <h3 className="font-semibold text-[#5D2E1A] mb-2">Mental Health Support</h3>
          <p className="text-sm text-[#5D2E1A]/70 mb-4">
            Connect with our hosted support chat for personalized help and referrals
          </p>
          <Button className="bg-[#5D2E1A] hover:bg-[#4A2415] text-white">
            Join Support Chat
          </Button>
        </div>
      </Card>
      
      <div className="space-y-3">
        <h3 className="font-semibold text-[#5D2E1A]">Specialized Support Groups</h3>
        {[
          'Migrant Mothers',
          'Foster & Adoption Support',
          'Medical Support Network',
          'Neurodivergent Community',
          'Single Mother Support'
        ].map((group) => (
          <Card key={group} className="p-4 kora-card">
            <div className="flex items-center justify-between">
              <span className="text-[#5D2E1A]">{group}</span>
              <Button variant="outline" size="sm" className="border-[#E8A87C] text-[#5D2E1A]">
                Join
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeTab()
      case 'communities':
        return renderCommunitiesTab()
      case 'chat':
        return renderChatTab()
      case 'events':
        return renderEventsTab()
      case 'support':
        return renderSupportTab()
      default:
        return renderHomeTab()
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-br from-[#FDF5F3] to-[#F5E6E0] z-10 px-6 py-4 border-b border-[#E8A87C]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#E8A87C] rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-[#5D2E1A]">K</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#5D2E1A]">Kora</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-[#5D2E1A]">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8A87C]/20 px-6 py-3">
        <div className="flex items-center justify-around">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'communities', icon: Users, label: 'Communities' },
            { id: 'chat', icon: MessageCircle, label: 'Chat' },
            { id: 'events', icon: Calendar, label: 'Events' },
            { id: 'support', icon: Heart, label: 'Support' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-[#E8A87C]'
                  : 'text-[#5D2E1A]/60 hover:text-[#5D2E1A]'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}