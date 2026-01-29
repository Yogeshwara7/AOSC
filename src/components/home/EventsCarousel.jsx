import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';

const categoryColors = {
  flagship: 'bg-slate-100 text-slate-700',
  hackathon: 'bg-cyan-100 text-cyan-700',
  workshop: 'bg-slate-200 text-slate-800',
  mentoring: 'bg-cyan-200 text-cyan-800',
  media: 'bg-slate-100 text-slate-700',
  technical: 'bg-cyan-100 text-cyan-700',
  outreach: 'bg-slate-200 text-slate-800',
};

function EventCard({ event }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${categoryColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
            {event.category?.replace('_', ' ') || 'Event'}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        {event.date && (
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-mono">
            <Calendar className="w-3 h-3" />
            {event.date}
          </div>
        )}
        <h3 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{event.description}</p>
      </div>
    </motion.div>
  );
}

export default function EventsCarousel() {
  const scrollRef = useRef(null);
  
  const { data: events, isLoading } = useQuery({
    queryKey: ['events-featured'],
    queryFn: () => base44.entities.Event.filter({ is_featured: true }, '-created_date', 10),
    initialData: [],
  });

  // Duplicate events for infinite scroll effect
  const displayEvents = events.length > 0 ? [...events, ...events, ...events] : [];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        {/* System Log Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4"
        >
          <span className="text-green-500">●</span>
          git pull origin main
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
        >
          Community Highlights
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-500 font-mono text-sm"
        >
          Let's Build Open-Source, one event at a time.
        </motion.p>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative">
        {isLoading ? (
          <div className="flex gap-6 px-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-80">
                <Skeleton className="h-48 rounded-t-2xl" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : displayEvents.length > 0 ? (
          <motion.div
            ref={scrollRef}
            className="flex gap-6 px-6"
            animate={{ x: [-0, -320 * events.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: events.length * 5,
                ease: "linear",
              },
            }}
          >
            {displayEvents.map((event, index) => (
              <EventCard key={`${event.id}-${index}`} event={event} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-gray-400 font-mono">
            No events yet
          </div>
        )}
      </div>
    </section>
  );
}