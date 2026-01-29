import React, { useState, useRef } from 'react';
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

          {/* Features or Event Details */}
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

const CommunityCard = ({ community, onReadEntry }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
  >
    {/* Header */}
    <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
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
    </div>

    {/* Content */}
    <div className="p-5">
      <div className="mb-3">
        <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">
          MEDIA
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {community.title}
      </h3>

      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
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

const EventCard = ({ event, onReadEntry }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
  >
    <div className="relative h-40 overflow-hidden">
      <img
        src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'}
        alt={event.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 left-3">
        <Badge className="bg-green-100 text-green-700">
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
      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>
      
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

export default function CommunityHighlight() {
  const [modalState, setModalState] = useState({ isOpen: false, item: null, type: null });
  const scrollRef = useRef(null);

  // Sample data
  const highlightedCommunity = {
    name: "SOSC",
    title: "SOSC PODCAST",
    description: "Dive into the stories behind SOSC's journey, challenges, and discussions with industry experts",
    features: [
      {
        title: "Industry Insights",
        description: "Deep conversations with tech leaders and innovators"
      },
      {
        title: "Community Stories",
        description: "Behind-the-scenes look at SOSC's growth and impact"
      },
      {
        title: "Technical Discussions",
        description: "Exploring cutting-edge technologies and trends"
      }
    ]
  };

  const highlightedEvent = {
    title: "Webdev-101",
    description: "A 2-day practical session introducing core web technologies and real-world frontend–backend connectivity, including CORS, Axios, and deployment basics.",
    date: "October 17-18, 2025",
    category: "Workshop",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400"
  };

  // Create continuous array for infinite scroll
  const highlights = [highlightedCommunity, highlightedEvent, highlightedCommunity, highlightedEvent, highlightedCommunity, highlightedEvent];

  const openModal = (item, type) => {
    setModalState({ isOpen: true, item, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, item: null, type: null });
  };

  return (
    <>
      <section className="py-16 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-8">
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
            Let's Build Open-Source, one story at a time.
          </motion.p>
        </div>

        {/* Continuous Scrolling Carousel */}
        <div className="relative">
          <motion.div
            ref={scrollRef}
            className="flex gap-6 px-6"
            animate={{ x: [-0, -320 * 2] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
          >
            {highlights.map((item, index) => {
              const isCommunity = item.name === "SOSC" && item.features;
              return isCommunity ? (
                <CommunityCard
                  key={`community-${index}`}
                  community={item}
                  onReadEntry={() => openModal(item, 'community')}
                />
              ) : (
                <EventCard
                  key={`event-${index}`}
                  event={item}
                  onReadEntry={() => openModal(item, 'event')}
                />
              );
            })}
          </motion.div>
        </div>
      </section>

      <HighlightModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        item={modalState.item}
        type={modalState.type}
      />
    </>
  );
}