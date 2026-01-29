import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HighlightModal = ({ isOpen, onClose, item, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold">
                  {type === 'community' ? '🎙️' : '🎯'}
                </span>
              </div>
              <h2 className="text-3xl font-bold">{item.name || item.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <span className="text-sm font-semibold text-green-500 uppercase tracking-wider">
              {type === 'community' ? 'MEDIA' : 'EVENT'}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            {item.title}
          </h3>

          <p className="text-slate-600 leading-relaxed mb-8">
            {item.description}
          </p>

          {/* Features */}
          {item.features && item.features.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Key Features:</h4>
              {item.features.map((feature, idx) => (
                <div key={idx} className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-medium text-slate-900">{feature.title}</h5>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {item.date && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Event Date:</span>
                <span>{item.date}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const CommunityCard = ({ community, onReadEntry, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group"
  >
    {/* Header */}
    <div className="relative h-52 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-4xl font-bold mb-1">{community.name}</div>
        <div className="flex items-center justify-end absolute bottom-3 right-3">
          <div className="w-8 h-8 border-2 border-white/30 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border border-white/50 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border border-white/70 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <Badge className="bg-pink-100 text-pink-700">Media</Badge>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="font-bold text-gray-900 text-xl mb-2">
        {community.title}
      </h3>

      <p className="text-gray-500 text-sm line-clamp-3 mb-4">
        {community.description}
      </p>

      <button
        onClick={onReadEntry}
        className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-700 transition-colors group text-sm"
      >
        READ ENTRY
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

const EventHighlightCard = ({ event, onReadEntry, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group"
  >
    <div className="relative h-52 overflow-hidden">
      <img
        src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'}
        alt={event.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4">
        <Badge className="bg-cyan-100 text-cyan-700">
          {event.category?.replace('_', ' ') || 'Event'}
        </Badge>
      </div>
      <div className="absolute top-4 right-4">
        <Badge className="bg-indigo-500 text-white">Featured</Badge>
      </div>
    </div>
    <div className="p-6">
      {event.date && (
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-mono">
          <Calendar className="w-3.5 h-3.5" />
          {event.date}
        </div>
      )}
      <h3 className="font-bold text-gray-900 text-xl mb-2">{event.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-3 mb-4">{event.description}</p>
      
      <button
        onClick={onReadEntry}
        className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-700 transition-colors group text-sm"
      >
        READ ENTRY
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

export default function StaticHighlights({ searchTerm = '', category = 'all' }) {
  const [modalState, setModalState] = useState({ isOpen: false, item: null, type: null });

  // Static highlight data
  const highlights = [
    // {
    //   id: 'sosc-podcast',
    //   type: 'community',
    //   name: "SOSC",
    //   title: "SOSC PODCAST",
    //   description: "Dive into the stories behind SOSC's journey, challenges, and discussions with industry experts",
    //   category: 'media',
    //   features: [
    //     {
    //       title: "Industry Insights",
    //       description: "Deep conversations with tech leaders and innovators"
    //     },
    //     {
    //       title: "Community Stories",
    //       description: "Behind-the-scenes look at SOSC's growth and impact"
    //     },
    //     {
    //       title: "Technical Discussions",
    //       description: "Exploring cutting-edge technologies and trends"
    //     }
    //   ]
    // },
    {
      id: 'UI-Path',
      type: 'workshop',
      title: "UI-Path Workshop",
      description: "Join us for an exciting 48-hour hackathon where innovation meets collaboration. Build amazing projects with fellow developers.",
      date: "March 15-17, 2024",
      category: "hackathon",
      image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
      is_featured: true
    },
     {
      id: 'sosc-hackathon',
      type: 'workshop',
      title: "SOSC HACKATHON 2024",
      description: "Join us for an exciting 48-hour hackathon where innovation meets collaboration. Build amazing projects with fellow developers.",
      date: "March 15-17, 2024",
      category: "hackathon",
      image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
      is_featured: true
    }
    
  ];

  // Filter highlights based on search and category
  const filteredHighlights = highlights.filter((item) => {
    const matchesSearch = !searchTerm || 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category === 'all' || item.category === category;

    return matchesSearch && matchesCategory;
  });

  const openModal = (item, type) => {
    setModalState({ isOpen: true, item, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, item: null, type: null });
  };

  if (filteredHighlights.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHighlights.map((item, index) => {
          return item.type === 'community' ? (
            <CommunityCard
              key={item.id}
              community={item}
              onReadEntry={() => openModal(item, 'community')}
              index={index}
            />
          ) : (
            <EventHighlightCard
              key={item.id}
              event={item}
              onReadEntry={() => openModal(item, 'event')}
              index={index}
            />
          );
        })}
      </div>

      <HighlightModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        item={modalState.item}
        type={modalState.type}
      />
    </>
  );
}