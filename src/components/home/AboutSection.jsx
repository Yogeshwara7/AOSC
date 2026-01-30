import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Code2, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutSection() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* System Log Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4"
        >
          
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4"
        >
          From Fork to Future.
        </motion.h2>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 text-sm sm:text-base font-mono text-slate-500 mb-12"
        >
          <span>Open-Source</span>
          <span className="text-cyan-500">•</span>
          <span>Community</span>
          <span className="text-cyan-500">•</span>
          <span>Mangalore</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              A student-driven collective building real-world solutions.
            </p>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
             Alva’s Open Source Community is a student-led collective where members learn together, collaborate openly, and build real-world open-source solutions.
            </p>
            
            <Link to={createPageUrl('Projects')}>
              <Button 
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 sm:px-6 py-3 h-11 rounded-full group mt-4 cursor-hover"
              >
                 Our Work
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Features */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-50 to-cyan-50/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-hover"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Real Work. Real Code.</h3>
              <p className="text-slate-500 text-sm sm:text-base">
              Open-source projects built by students, for real-world use.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-50 to-cyan-50/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-hover"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-cyan-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Built Together</h3>
              <p className="text-slate-500 text-sm sm:text-base">
                Learning through collaboration, contribution, and shared curiosity.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}