import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search } from 'lucide-react';
import StaticHighlights from '@/components/events/StaticHighlights';

const categoryColors = {
  flagship: 'bg-indigo-100 text-indigo-700',
  hackathon: 'bg-cyan-100 text-cyan-700',
  workshop: 'bg-purple-100 text-purple-700',
  mentoring: 'bg-blue-100 text-blue-700',
  media: 'bg-pink-100 text-pink-700',
  technical: 'bg-teal-100 text-teal-700',
  outreach: 'bg-amber-100 text-amber-700',
};

const categoryLabels = {
  flagship: 'Flagship Event',
  hackathon: 'Hackathon',
  workshop: 'Workshop',
  mentoring: 'Mentoring',
  media: 'Media',
  technical: 'Technical Event',
  outreach: 'Outreach',
};

function EventCard({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${categoryColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
            {categoryLabels[event.category] || event.category || 'Event'}
          </Badge>
        </div>
        {event.is_featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-indigo-500 text-white">Featured</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {event.date && (
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            {event.date}
          </div>
        )}
        <h3 className="font-bold text-gray-900 text-xl mb-2">{event.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-3">{event.description}</p>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
  });

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('-created_date'),
    initialData: [],
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        !filters.search ||
        event.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory =
        filters.category === 'all' || event.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [events, filters]);

  const categories = ['all', 'flagship', 'hackathon', 'workshop', 'mentoring', 'media', 'technical', 'outreach'];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Events & Highlights
          </h1>
          <p className="text-slate-500 max-w-2xl">
            From hackathons to workshops, discover the events that bring our community together.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 font-mono text-sm bg-white border-gray-200 rounded-xl h-12"
            />
          </div>

          <Select
            value={filters.category}
            onValueChange={(value) => setFilters({ ...filters, category: value })}
          >
            <SelectTrigger className="w-full md:w-48 font-mono text-sm rounded-xl h-12 bg-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="font-mono">
                  {cat === 'all' ? 'All Categories' : categoryLabels[cat] || cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="h-52" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Always show Static Highlights first */}
            <StaticHighlights searchTerm={filters.search} category={filters.category} />
            
            {/* Regular Events */}
            {filteredEvents.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            )}

            {/* No Results Message - only show if no highlights match and no events match
            {filteredEvents.length === 0 && (
              <div className="mt-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📅</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or check back later for upcoming events.
                  </p>
                </motion.div>
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
}