import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Skeleton } from '@/components/ui/skeleton';
import { Check } from 'lucide-react';

function CommunityCard({ community, index }) {
  const bgColors = ['bg-indigo-50', 'bg-cyan-50', 'bg-purple-50', 'bg-blue-50'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`${bgColors[index % bgColors.length]} rounded-3xl p-8 hover:shadow-lg transition-shadow`}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center p-2 flex-shrink-0">
          {community.logo_url ? (
            <img
              src={community.logo_url}
              alt={community.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-2xl font-bold text-gray-400">
              {community.short_name || community.name?.charAt(0)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {community.short_name || community.name}
          </h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {community.description}
          </p>

          {/* Features */}
          {community.features && community.features.length > 0 && (
            <div className="space-y-4">
              {community.features.map((feature, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CommunitiesSection() {
  const { data: communities, isLoading } = useQuery({
    queryKey: ['communities'],
    queryFn: () => base44.entities.Community.list(),
    initialData: [],
  });

//   return (
//     <section className="py-24 px-6 bg-white">
//       <div className="max-w-6xl mx-auto">
//         {/* System Log Header */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4"
//         >
//           <span className="text-cyan-500">●</span>
//           SYSTEM_COMMUNITIES_LOG
//         </motion.div>

//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
//         >
//           Communities Participating
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="flex flex-wrap gap-3 text-sm font-mono text-slate-500 mb-12"
//         >
//           <span>Explore</span>
//           <span className="text-cyan-500">•</span>
//           <span>Collaborate</span>
//           <span className="text-cyan-500">•</span>
//           <span>Learn</span>
//         </motion.div>

//         <p className="text-slate-500 mb-12 max-w-2xl">
//           The communities driving innovation and open-source at Alva's.
//         </p>

//         {/* Communities Grid */}
//         {isLoading ? (
//           <div className="grid md:grid-cols-2 gap-8">
//             {[1, 2].map((i) => (
//               <Skeleton key={i} className="h-64 rounded-3xl" />
//             ))}
//           </div>
//         ) : communities.length > 0 ? (
//           <div className="grid lg:grid-cols-2 gap-8">
//             {communities.map((community, index) => (
//               <CommunityCard key={community.id} community={community} index={index} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 text-slate-400 font-mono">
//             No communities yet
//           </div>
//         )}
//       </div>
//     </section>
//   );
}