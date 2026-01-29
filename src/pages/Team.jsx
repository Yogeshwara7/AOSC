import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import TeamMemberList from '@/components/team/TeamMemberList';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Static member data for demonstration
const staticMembers = [
  {
    id: 'arvind-1',
    name: 'Arvind Kumar',
    skills: ['Development', 'Backend', 'DevOps'],
    github_username: 'arvind-dev',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'Senior Developer',
    role: 'member'
  },
  {
    id: 'priya-2',
    name: 'Priya Sharma',
    skills: ['Frontend', 'React', 'UI/UX'],
    github_username: 'priya-frontend',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    title: 'Frontend Specialist',
    role: 'member'
  },
  {
    id: 'rahul-3',
    name: 'Rahul Patel',
    skills: ['Machine Learning', 'Python', 'Data Science'],
    github_username: 'rahul-ml',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    title: 'ML Engineer',
    role: 'member'
  },
  {
    id: 'sneha-4',
    name: 'Sneha Reddy',
    skills: ['Mobile', 'Flutter', 'Android'],
    github_username: 'sneha-mobile',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    title: 'Mobile Developer',
    role: 'member'
  },
  {
    id: 'kiran-5',
    name: 'Kiran Singh',
    skills: ['DevOps', 'Cloud', 'Docker'],
    github_username: 'kiran-devops',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    title: 'DevOps Engineer',
    role: 'member'
  },
  {
    id: 'anita-6',
    name: 'Anita Gupta',
    skills: ['Design', 'Figma', 'Branding'],
    github_username: 'anita-design',
    avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    title: 'UI/UX Designer',
    role: 'member'
  }
];

export default function Team() {
  const { data: members, isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: () => base44.entities.TeamMember.list('order'),
    initialData: [],
  });

  // Combine API data with static data
  const allMembers = [...members, ...staticMembers];
  
  const coordinators = allMembers.filter(m => m.role === 'coordinator');
  const leads = allMembers.filter(m => m.role === 'community_lead');
  const executives = allMembers.filter(m => m.role === 'executive');
  const soswcReps = allMembers.filter(m => m.role === 'soswc_rep');
  const regularMembers = allMembers.filter(m => m.role === 'member');
  const alumni = allMembers.filter(m => m.role === 'alumni');

  const coreTeam = [...coordinators, ...leads, ...executives, ...soswcReps];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          {/* System Log Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4"
          >
            <span className="text-cyan-500">●</span>
            git log --authors
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Team
          </h1>
          <p className="text-slate-500 max-w-2xl font-mono text-sm">
            People behind the commits that power AOSC
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : (
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="mb-8 bg-white border border-slate-100 p-1 rounded-full">
              <TabsTrigger 
                value="current" 
                className="rounded-full px-6 data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
              >
                Current Team
              </TabsTrigger>
              <TabsTrigger 
                value="alumni" 
                className="rounded-full px-6 data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
              >
                Alumni
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-12">
              {/* Core Team */}
              {coreTeam.length > 0 && (
                <TeamMemberList 
                  members={coreTeam} 
                  title="Core Team" 
                />
              )}

              {/* Community Members */}
              {regularMembers.length > 0 && (
                <TeamMemberList 
                  members={regularMembers} 
                  title="Community Members" 
                />
              )}
            </TabsContent>

            <TabsContent value="alumni">
              {alumni.length > 0 ? (
                <TeamMemberList 
                  members={alumni} 
                  title="Alumni" 
                />
              ) : (
                <div className="text-center py-24">
                  <p className="text-slate-400 font-mono">No alumni records yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}