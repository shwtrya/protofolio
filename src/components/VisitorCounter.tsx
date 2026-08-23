import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CalendarDays, Eye, TrendingUp, Users } from 'lucide-react';
import { supabaseConfigured, getVisitorStats, type VisitorStats } from '../lib/supabase';

interface VisitorCounterProps {
  variant?: 'floating' | 'inline';
  className?: string;
}

interface IconProps {
  size?: number;
  className?: string;
}

const VisitorCounter = ({ variant = 'floating', className = '' }: VisitorCounterProps) => {
  const [stats, setStats] = useState<VisitorStats>({
    total_visitors: 0,
    total_page_views: 0,
    today_visitors: 0,
    today_page_views: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeTracking = async () => {
      try {
        const initialStats = await getVisitorStats();
        setStats(initialStats);
      } catch (error) {
        console.error('Failed to initialize tracking:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTracking();
  }, []);

  const connectionStatus = supabaseConfigured ? 'Terhubung' : 'Belum terhubung';

  if (variant === 'inline') {
    const statCards = [
      {
        label: 'Total Pengunjung',
        value: stats.total_visitors,
        icon: Users,
        accent: 'Total',
        iconClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
        borderClass: 'border-blue-200 dark:border-blue-800/70'
      },
      {
        label: 'Total Tayangan',
        value: stats.total_page_views,
        icon: Eye,
        accent: 'Kunjungan',
        iconClass:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        borderClass: 'border-emerald-200 dark:border-emerald-800/70'
      },
      {
        label: 'Pengunjung Hari Ini',
        value: stats.today_visitors,
        icon: CalendarDays,
        accent: 'Hari ini',
        iconClass:
          'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
        borderClass: 'border-violet-200 dark:border-violet-800/70'
      },
      {
        label: 'Tayangan Hari Ini',
        value: stats.today_page_views,
        icon: Activity,
        accent: 'Tayangan',
        iconClass:
          'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
        borderClass: 'border-orange-200 dark:border-orange-800/70'
      }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={className}
      >
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-orange-500" />

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Statistik
              </p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                Statistik Kunjungan
              </h3>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
              <TrendingUp size={16} className="text-emerald-600 dark:text-emerald-400" />
              {connectionStatus}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={isLoading ? '...' : card.value.toLocaleString()}
                icon={card.icon}
                accent={card.accent}
                iconClass={card.iconClass}
                borderClass={card.borderClass}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-4 right-4 z-40 max-w-[calc(100vw-2rem)]"
    >
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 min-w-[180px] sm:min-w-[200px] max-w-full">
        <div className="flex items-center mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Statistik</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-2">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 dark:text-gray-400">Total Pengunjung</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">Total</span>
              </div>
            </div>
            <motion.span
              key={stats.total_visitors}
              initial={{ scale: 1.2, color: '#3B82F6' }}
              animate={{ scale: 1, color: 'inherit' }}
              className="text-sm font-bold text-gray-900 dark:text-white"
            >
              {isLoading ? '...' : stats.total_visitors.toLocaleString()}
            </motion.span>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-2">
                <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 dark:text-gray-400">Total Tayangan</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">Kunjungan</span>
              </div>
            </div>
            <motion.span
              key={stats.total_page_views}
              initial={{ scale: 1.2, color: '#10B981' }}
              animate={{ scale: 1, color: 'inherit' }}
              className="text-sm font-bold text-gray-900 dark:text-white"
            >
              {isLoading ? '...' : stats.total_page_views.toLocaleString()}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  accent,
  iconClass,
  borderClass
}: {
  label: string;
  value: string;
  icon: React.ComponentType<IconProps>;
  accent: string;
  iconClass: string;
  borderClass: string;
}) => (
  <motion.article
    whileHover={{ y: -3 }}
    className={`rounded-lg border bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-gray-900 ${borderClass}`}
  >
    <div className="mb-5 flex items-start justify-between gap-3">
      <div className={`flex h-11 w-11 items-center justify-center rounded-md ${iconClass}`}>
        <Icon size={22} />
      </div>
      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {accent}
      </span>
    </div>

    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</p>
    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
  </motion.article>
);

export default VisitorCounter;
