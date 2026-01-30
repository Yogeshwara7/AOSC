import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';

const statusColors = {
  'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
  'maintained': 'bg-blue-100 text-blue-700 border-blue-200',
  'active': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'completed': 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 group cursor-hover"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <Badge className={`${statusColors[project.status] || statusColors.active} border`}>
            {project.status?.replace('-', ' ') || 'active'}
          </Badge>
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
          <div className="flex gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors cursor-hover"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors cursor-hover"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Contributors */}
        {project.contributors && project.contributors.length > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex -space-x-2">
              {project.contributors.slice(0, 3).map((contributor, idx) => (
                <img
                  key={idx}
                  src={contributor.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.name}`}
                  alt={contributor.name}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
            </div>
            {project.contributors.length > 3 && (
              <span className="text-xs text-slate-400 ml-1">
                +{project.contributors.length - 3}
              </span>
            )}
          </div>
        )}

        <h3 className="font-bold text-slate-900 text-lg mb-2">{project.title}</h3>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((tech, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs text-slate-500 border-slate-200"
              >
                {tech}
              </Badge>
            ))}
            {project.tech_stack.length > 4 && (
              <Badge variant="outline" className="text-xs text-slate-400 border-slate-200">
                +{project.tech_stack.length - 4}
              </Badge>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}