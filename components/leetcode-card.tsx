"use client"

import { useState, useEffect } from "react"
import { Flame, RefreshCw, AlertCircle, Loader2, ExternalLink } from "lucide-react"

interface LeetCodeStats {
  status: string
  message: string
  username: string
  realName: string | null
  avatar: string | null
  country: string | null
  totalSolved: number
  totalQuestions: number
  easySolved: number
  totalEasy: number
  mediumSolved: number
  totalMedium: number
  hardSolved: number
  totalHard: number
  acceptanceRate: number
  ranking: number
  contributionPoints: number
  reputation: number
  submissionCalendar: any
  calendar: {
    streak: number
    totalActiveDays: number
    activeYears: number[]
  }
}

export default function LeetCodeCard() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchLeetCodeStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/leetcode/sam0x?format=json")
      const data = await response.json()

      if (data.status === "success") {
        setStats(data)
        setLastUpdated(new Date())
      } else {
        setError(data.message || "Failed to fetch LeetCode data")
      }
    } catch (err) {
      setError("Network error - please try again")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeetCodeStats()
  }, [])

  const handleRefresh = () => {
    fetchLeetCodeStats()
  }

  if (loading) {
    return (
      <div className="bg-black/80 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl card-hover hover:border-emerald-500/50 hover:glow-emerald">
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400 font-space-grotesk">Loading LeetCode stats...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="bg-black/80 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl card-hover hover:border-red-500/50">
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-4 font-space-grotesk">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-gray-900/50 hover:bg-gray-800/50 px-6 py-3 rounded-xl text-sm font-space-grotesk font-medium transition-all duration-200 hover:scale-105 border border-gray-700/50 hover:border-gray-600/50 flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const progressPercentage = stats.totalQuestions > 0 ? (stats.totalSolved / stats.totalQuestions) * 100 : 0

  // Responsive circle dimensions
  const circleSize = {
    mobile: { radius: 60, strokeWidth: 8, size: 130 },
    desktop: { radius: 70, strokeWidth: 10, size: 150 },
  }

  const strokeDasharray = 2 * Math.PI * circleSize.desktop.radius
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progressPercentage) / 100

  return (
    <div className="bg-black/80 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-6 sm:p-6 shadow-2xl card-hover hover:border-emerald-500/50 hover:glow-emerald flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center space-x-2">
          {/* LeetCode Logo */}
          <div className="w-6 h-6">
            <svg
              width="95"
              height="111"
              viewBox="0 0 95 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-auto max-w-none"
            >
              <path
                d="M68.0063 83.0664C70.5 80.5764 74.5366 80.5829 77.0223 83.0809C79.508 85.579 79.5015 89.6226 77.0078 92.1127L65.9346 103.17C55.7187 113.371 39.06 113.519 28.6718 103.513C28.6117 103.456 23.9861 98.9201 8.72653 83.957C-1.42528 74.0029 -2.43665 58.0749 7.11648 47.8464L24.9282 28.7745C34.4095 18.6219 51.887 17.5122 62.7275 26.2789L78.9048 39.362C81.6444 41.5776 82.0723 45.5985 79.8606 48.3429C77.6488 51.0873 73.635 51.5159 70.8954 49.3003L54.7182 36.2173C49.0488 31.6325 39.1314 32.2622 34.2394 37.5006L16.4274 56.5727C11.7767 61.5522 12.2861 69.574 17.6456 74.8292C28.851 85.8169 37.4869 94.2846 37.4969 94.2942C42.8977 99.496 51.6304 99.4184 56.9331 94.1234L68.0063 83.0664Z"
                fill="#FFA116"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.1067 72.0014C37.5858 72.0014 34.7314 69.1421 34.7314 65.615C34.7314 62.0879 37.5858 59.2286 41.1067 59.2286H88.1245C91.6454 59.2286 94.4997 62.0879 94.4997 65.615C94.4997 69.1421 91.6454 72.0014 88.1245 72.0014H41.1067Z"
                fill="#B3B3B3"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49.9118 2.02335C52.3173 -0.55232 56.3517 -0.686894 58.9228 1.72277C61.494 4.13244 61.6284 8.17385 59.2229 10.7495L16.4276 56.5729C11.7768 61.552 12.2861 69.5738 17.6453 74.8292L37.4088 94.2091C39.9249 96.6764 39.968 100.72 37.505 103.24C35.042 105.761 31.0056 105.804 28.4895 103.337L8.72593 83.9567C-1.42529 74.0021 -2.43665 58.0741 7.1169 47.8463L49.9118 2.02335Z"
                fill="white"
              />
            </svg>

          </div>
          {/* Title */}

          <h3 className="text-xl font-space-grotesk font-bold text-white sketchy-underline">LeetCode Stats</h3>

        </div>
        <button
          onClick={handleRefresh}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
          title="Refresh stats"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <p className="text-xs text-gray-500 mb-8 font-jetbrains">Last updated: {lastUpdated.toLocaleTimeString()}</p>
      )}

      {/* Main Stats Section */}
      <div className="flex flex-col [@media(min-width:500px)]:flex-row items-center justify-between mb-8 gap-8">
        {/* Circular Progress - Responsive */}
        <div className="relative flex-shrink-0">
          {/* Mobile Circle */}
          <div className="block sm:hidden">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={circleSize.mobile.radius}
                stroke="#1f2937"
                strokeWidth={circleSize.mobile.strokeWidth}
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r={circleSize.mobile.radius}
                stroke="url(#gradient)"
                strokeWidth={circleSize.mobile.strokeWidth}
                fill="none"
                strokeDasharray={2 * Math.PI * circleSize.mobile.radius}
                strokeDashoffset={
                  2 * Math.PI * circleSize.mobile.radius -
                  (2 * Math.PI * circleSize.mobile.radius * progressPercentage) / 100
                }
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-space-grotesk font-bold text-white">{stats.totalSolved}</div>
              <div className="text-sm text-gray-400 font-inter">/{stats.totalQuestions}</div>
              <div className="text-xs text-emerald-400 font-space-grotesk font-medium">Solved</div>
            </div>
          </div>

          {/* Desktop Circle */}
          <div className="hidden sm:block">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={circleSize.desktop.radius}
                stroke="#1f2937"
                strokeWidth={circleSize.desktop.strokeWidth}
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={circleSize.desktop.radius}
                stroke="url(#gradient-desktop)"
                strokeWidth={circleSize.desktop.strokeWidth}
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient-desktop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-space-grotesk font-bold text-white">{stats.totalSolved}</div>
              <div className="text-base text-gray-400 font-inter">/{stats.totalQuestions}</div>
              <div className="text-sm text-emerald-400 font-space-grotesk font-medium">Solved</div>
            </div>
          </div>
        </div>

        {/* Difficulty Stats - Fixed overflow */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <div className="flex justify-between items-center bg-gray-900/50 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-colors border border-gray-800/30">
            <span className="text-emerald-400 text-sm font-space-grotesk font-medium">Easy</span>
            <span className="text-white font-space-grotesk font-bold text-sm">
              {stats.easySolved}/{stats.totalEasy}
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-900/50 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-colors border border-gray-800/30">
            <span className="text-yellow-400 text-sm font-space-grotesk font-medium">Medium</span>
            <span className="text-white font-space-grotesk font-bold text-sm">
              {stats.mediumSolved}/{stats.totalMedium}
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-900/50 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-colors border border-gray-800/30">
            <span className="text-red-400 text-sm font-space-grotesk font-medium">Hard</span>
            <span className="text-white font-space-grotesk font-bold text-sm">
              {stats.hardSolved}/{stats.totalHard}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-xl text-sm font-space-grotesk font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-200 hover:scale-105 shadow-lg">
          <Flame className="w-5 h-5" />
          <span>{stats.calendar.streak} Day Streak</span>
        </button>
        <button
          onClick={() => window.open("https://leetcode.com/u/sam0x", "_blank")}
          className="w-full sm:w-auto bg-gray-900/50 hover:bg-gray-800/50 px-6 py-3 rounded-xl text-sm font-space-grotesk font-medium transition-all duration-200 hover:scale-105 border border-gray-700/50 hover:border-gray-600/50 flex items-center justify-center space-x-2"
        >
          <span>View Profile</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
