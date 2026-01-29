import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

// Static preview members (2 people as requested)
const previewMembers = [
  {
    id: 'Swanjith-preview',
    name: 'Swanjith AK',
    skills: ['Systems', 'LINUX', 'AI'],
    github_username: 'Swanjith',
    avatar_url: 'https://media.licdn.com/dms/image/v2/D5603AQHeH5OI1HgXzg/profile-displayphoto-crop_800_800/B56ZvwAN.6HAAI-/0/1769258149443?e=1771459200&v=beta&t=XPiI9fsbW0fmi3KZsv25uSW5ED5ZC502L2NmhgiKXNc',
    // title: 'Senior Developer',
    role: 'member'
  },
  {
    id: 'yogi-preview',
    name: 'Yogeshwara B',
    skills: ['Blockchain', 'Web3', 'React'],
    github_username: 'Yogeshwara7',
    avatar_url: 'https://media.licdn.com/dms/image/v2/D5635AQHIAPWuqzW77w/profile-framedphoto-shrink_800_800/B56Zv0vUFPIoAg-/0/1769337602608?e=1770264000&v=beta&t=iPW7G89BvxPFnZFdQRlW2glkw2imlJOzh6v5Mx-jOBA',
    // title: 'Frontend Specialist',
    role: 'member'
  }
];

const MemberPreviewRow = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white border border-slate-100 rounded-xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {/* Left: Skills */}
        <div className="flex flex-wrap gap-2 md:min-w-[200px]">
          {member.skills && member.skills.length > 0 ? (
            member.skills.slice(0, 3).map((skill, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs uppercase font-medium border-cyan-200 text-green-700 bg-slate-50 hover:bg-cyan-100 transition-colors"
              >
                {skill}
              </Badge>
            ))
          ) : (
            <Badge
              variant="outline"
              className="text-xs uppercase font-medium border-slate-200 text-slate-500 bg-slate-50"
            >
              Developer
            </Badge>
          )}
        </div>

        {/* Center: Name */}
        <div className="flex-1 md:text-center">
          <motion.h3
            className="text-xl md:text-2xl font-bold text-slate-900 group-hover:translate-x-1 transition-transform duration-200"
            whileHover={{ x: 4 }}
          >
            {member.name}
          </motion.h3>
          {member.title && (
            <p className="text-sm text-slate-500 mt-1">{member.title}</p>
          )}
        </div>

        {/* Right: GitHub + Photo */}
        <div className="flex items-center gap-4 md:min-w-[200px] md:justify-end">
          {/* GitHub Link */}
          {member.github_username && (
            <a
              href={`https://github.com/${member.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors group/link"
            >
              <Github className="w-4 h-4" />
              <span className="group-hover/link:underline font-mono">
                {member.github_username}
              </span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          )}

          {/* Profile Photo */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-slate-100 ring-2 ring-slate-200 flex-shrink-0">
            <img
              src={member.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
              alt={`${member.name} profile`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Hover background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/0 via-cyan-50/20 to-cyan-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
    </motion.div>
  );
};

export default function TeamPreview() {
  const { data: apiMembers, isLoading } = useQuery({
    queryKey: ['team-preview'],
    queryFn: () => base44.entities.TeamMember.filter(
      { role: 'member' }, 
      'order', 
      2
    ),
    initialData: [],
  });

  // Use API members if available, otherwise use static preview members
  const displayMembers = apiMembers.length > 0 ? apiMembers.slice(0, 2) : previewMembers;

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* System Log Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4"
        >
          <span className="text-green-500">●</span>
          git log --authors
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900"
            >
              Community Members
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-500 font-mono text-sm mt-2"
            >
              People behind the commits that power AOSC
            </motion.div>
          </div>
          
          <Link to={createPageUrl('Team')}>
            <Button variant="outline" className="rounded-full group cursor-hover">
              View All Team
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Members Preview List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {displayMembers.map((member, index) => (
              <MemberPreviewRow key={member.id} member={member} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}