import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Users, Eye, Clock, TrendingUp, Activity, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsData {
  totalVisitors: number;
  totalPageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: { path: string; views: number }[];
  visitorTrend: { date: string; visitors: number }[];
}

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 0,
    totalPageViews: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    topPages: [],
    visitorTrend: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState<string>('visitors');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setErrorMessage('Supabase belum dikonfigurasi. Analytics tidak dapat dimuat.');
      setIsLoading(false);
      return;
    }

    fetchAnalytics();

    const channel = supabase
      .channel('analytics-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visitors'
        },
        () => {
          fetchAnalytics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAnalytics = async () => {
    if (!supabase) {
      setErrorMessage('Supabase belum tersedia. Coba lagi nanti.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data: stats, error: statsError } = await supabase.rpc('get_visitor_stats');
      if (statsError) {
        throw new Error(`Gagal memuat statistik pengunjung: ${statsError.message}`);
      }

      const { data: visitors, error: visitorsError } = await supabase
        .from('visitors')
        .select('created_at, first_visit, last_visit, page_views')
        .order('created_at', { ascending: false })
        .limit(100);
      if (visitorsError) {
        throw new Error(`Gagal memuat data pengunjung: ${visitorsError.message}`);
      }

      const { data: pageViews, error: pageViewsError } = await supabase
        .from('page_views')
        .select('page_url, visited_at')
        .order('visited_at', { ascending: false })
        .limit(100);
      if (pageViewsError) {
        throw new Error(`Gagal memuat data page views: ${pageViewsError.message}`);
      }

      const resolvedStats = stats?.[0] ?? {
        total_visitors: 0,
        total_page_views: 0
      };

      const pageCounts: { [key: string]: number } = {};
      pageViews?.forEach(pv => {
        pageCounts[pv.page_url] = (pageCounts[pv.page_url] || 0) + 1;
      });

      const topPages = Object.entries(pageCounts)
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const visitorTrend = last7Days.map(date => {
        const count = visitors?.filter(v => v.created_at.startsWith(date)).length || 0;
        return { date, visitors: count };
      });

      const visitorsData = visitors ?? [];
      const sessionDurations = visitorsData
        .map(visitor => {
          const firstVisit = visitor.first_visit ?? visitor.created_at;
          const lastVisit = visitor.last_visit ?? visitor.created_at;
          if (!firstVisit || !lastVisit) {
            return null;
          }

          const startTime = new Date(firstVisit).getTime();
          const endTime = new Date(lastVisit).getTime();
          if (!Number.isFinite(startTime) || !Number.isFinite(endTime)) {
            return null;
          }

          const durationSeconds = Math.max(0, Math.round((endTime - startTime) / 1000));
          return durationSeconds;
        })
        .filter((duration): duration is number => duration !== null);

      const totalDuration = sessionDurations.reduce((total, duration) => total + duration, 0);
      const avgSessionDuration = sessionDurations.length
        ? Math.round(totalDuration / sessionDurations.length)
        : 0;

      const totalSessions = visitorsData.length;
      const bounceSessions = visitorsData.filter(visitor => Number(visitor.page_views) === 1).length;
      const bounceRate = totalSessions
        ? Math.round((bounceSessions / totalSessions) * 100)
        : 0;

      setAnalytics({
        totalVisitors: Number(resolvedStats.total_visitors) || 0,
        totalPageViews: Number(resolvedStats.total_page_views) || 0,
        avgSessionDuration,
        bounceRate,
        topPages,
        visitorTrend
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Terjadi kesalahan saat memuat analytics.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: analytics.visitorTrend.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Daily Visitors',
        data: analytics.visitorTrend.map(item => item.visitors),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  const metrics = [
    {
      id: 'visitors',
      label: 'Total Visitors',
      value: analytics.totalVisitors,
      icon: Users,
      color: 'blue',
      change: '+12%'
    },
    {
      id: 'pageviews',
      label: 'Page Views',
      value: analytics.totalPageViews,
      icon: Eye,
      color: 'green',
      change: '+8%'
    },
    {
      id: 'duration',
      label: 'Avg. Session',
      value: `${Math.floor(analytics.avgSessionDuration / 60)}m ${analytics.avgSessionDuration % 60}s`,
      icon: Clock,
      color: 'purple',
      change: '+5%'
    },
    {
      id: 'bounce',
      label: 'Bounce Rate',
      value: `${analytics.bounceRate}%`,
      icon: Activity,
      color: 'orange',
      change: '-3%'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
        <p className="font-semibold">Analytics tidak tersedia.</p>
        <p>{errorMessage}</p>
        <button
          type="button"
          onClick={fetchAnalytics}
          className="rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setActiveMetric(metric.id)}
            className={`cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              activeMetric === metric.id
                ? 'border-blue-500'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${metric.color}-100 dark:bg-${metric.color}-900/30`}
              >
                <metric.icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                {metric.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {metric.label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Visitor Trend (Last 7 Days)
          </h3>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Top Pages
          </h3>
          <div className="space-y-3">
            {analytics.topPages.map((page, index) => (
              <motion.div
                key={page.path}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                    {page.path || '/'}
                  </span>
                </div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {page.views}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
