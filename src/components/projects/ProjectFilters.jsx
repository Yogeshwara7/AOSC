import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'community', label: 'Community' },
  { value: 'member', label: 'Member' },
];

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'maintained', label: 'Maintained' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function ProjectFilters({ filters, setFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row gap-4 mb-8"
    >
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="SEARCH PROJECTS..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="pl-10 font-mono text-sm bg-white border-gray-200 rounded-xl h-12"
        />
      </div>

      {/* Category Filter */}
      <Select
        value={filters.category}
        onValueChange={(value) => setFilters({ ...filters, category: value })}
      >
        <SelectTrigger className="w-full md:w-40 font-mono text-sm rounded-xl h-12 bg-white">
          <span className="text-gray-400 text-xs mr-2">CATEGORY</span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value} className="font-mono">
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={filters.status}
        onValueChange={(value) => setFilters({ ...filters, status: value })}
      >
        <SelectTrigger className="w-full md:w-40 font-mono text-sm rounded-xl h-12 bg-white">
          <span className="text-gray-400 text-xs mr-2">STATUS</span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value} className="font-mono">
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}