'use client';

import { useEffect, useState, useRef } from 'react';
import { Github, Zap, Cloud, Rss, ExternalLink } from 'lucide-react';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  feelsLike: number;
}

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
}

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

export default function InfoWidgets() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [rssItems, setRssItems] = useState<RSSItem[]>([]);
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
  const [showRssWidget, setShowRssWidget] = useState(true);
  const [showCodingStats, setShowCodingStats] = useState(true);
  const [showGitHubStats, setShowGitHubStats] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAdjustingRef = useRef(false);

  // Fetch GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/lostmartian');
        if (response.ok) {
          const data = await response.json();
          setGithubStats({
            public_repos: data.public_repos || 0,
            followers: data.followers || 0,
            following: data.following || 0,
          });
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      }
    };

    fetchGitHubStats();
  }, []);

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      setCurrentTime(istTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Weather Data (using Open-Meteo - completely free, no API key required)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Pune, India coordinates: 18.5204, 73.8567
        // Using Open-Meteo API - free, no API key, CORS-enabled
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia/Kolkata`
        );
        
        if (response.ok) {
          const data = await response.json();
          const current = data.current;
          
          // Map weather code to description
          const weatherCodes: { [key: number]: string } = {
            0: 'clear sky', 1: 'mainly clear', 2: 'partly cloudy', 3: 'overcast',
            45: 'foggy', 48: 'depositing rime fog', 51: 'light drizzle', 53: 'moderate drizzle',
            56: 'light freezing drizzle', 57: 'dense freezing drizzle', 61: 'slight rain',
            63: 'moderate rain', 65: 'heavy rain', 66: 'light freezing rain',
            67: 'heavy freezing rain', 71: 'slight snow fall', 73: 'moderate snow fall',
            75: 'heavy snow fall', 77: 'snow grains', 80: 'slight rain showers',
            81: 'moderate rain showers', 82: 'violent rain showers', 85: 'slight snow showers',
            86: 'heavy snow showers', 95: 'thunderstorm', 96: 'thunderstorm with slight hail',
            99: 'thunderstorm with heavy hail'
          };
          
          const weatherCode = current.weather_code || 0;
          const description = weatherCodes[weatherCode] || 'unknown';
          
          // Get weather icon based on code (simplified mapping)
          let icon = '01d'; // default clear day
          if (weatherCode === 0 || weatherCode === 1) icon = '01d';
          else if (weatherCode === 2) icon = '02d';
          else if (weatherCode === 3 || weatherCode === 45 || weatherCode === 48) icon = '50d';
          else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(weatherCode)) icon = '10d';
          else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) icon = '13d';
          else if ([80, 81, 82, 95, 96, 99].includes(weatherCode)) icon = '11d';
          
          setWeather({
            temp: Math.round(current.temperature_2m),
            description: description,
            icon: icon,
            humidity: current.relative_humidity_2m || 0,
            feelsLike: Math.round(current.temperature_2m), // Open-Meteo doesn't provide feels_like in free tier
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  // Fetch RSS Feed
  useEffect(() => {
    const fetchRSS = async () => {
      try {
        // Hacker News RSS feeds - using CORS proxy since hnrss.org doesn't allow CORS
        const rssFeeds = [
          'https://hnrss.org/newest?points=50',
          'https://hnrss.org/frontpage',
        ];

        // Parse RSS feed using CORS proxy
        const parseRSS = async (feedUrl: string): Promise<RSSItem[]> => {
          try {
            // Use AllOrigins CORS proxy (free, no auth required)
            // Format: https://api.allorigins.win/raw?url=ENCODED_URL
            const encodedUrl = encodeURIComponent(feedUrl);
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodedUrl}`;
            
            const response = await fetch(proxyUrl, {
              method: 'GET',
              headers: {
                'Accept': 'application/rss+xml, application/xml, text/xml',
              },
            });
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
              throw new Error('RSS parsing error');
            }
            
            const items = xmlDoc.querySelectorAll('item');
            const parsedItems: RSSItem[] = [];
            
            items.forEach((item, index) => {
              if (index < 5) {
                const title = item.querySelector('title')?.textContent?.trim() || '';
                const link = item.querySelector('link')?.textContent?.trim() || 
                           item.querySelector('guid')?.textContent?.trim() || '';
                const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
                
                if (title && link) {
                  parsedItems.push({ title, link, pubDate });
                }
              }
            });
            
            return parsedItems;
          } catch (error: any) {
            console.error(`Failed to fetch RSS feed ${feedUrl}:`, error);
            return [];
          }
        };

        // Try each feed until one works
        for (const feedUrl of rssFeeds) {
          const items = await parseRSS(feedUrl);
          if (items.length > 0) {
            setRssItems(items.slice(0, 5));
            break;
          }
        }
      } catch (error) {
        console.error('Failed to fetch RSS feed:', error);
      }
    };

    fetchRSS();
    // Refresh every 30 minutes
    const interval = setInterval(fetchRSS, 1800000);
    return () => clearInterval(interval);
  }, []);

  // Fetch LeetCode Stats
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        // Replace 'sahilgangurde' with your actual LeetCode username
        const username = "sahilgangurde";
        const apis = [
          `https://leetcode-stats-api.herokuapp.com/${username}`,
          `https://leetcode-stats.tashif.codes/${username}`,
        ];

        for (const apiUrl of apis) {
          try {
            const response = await fetch(apiUrl);
            if (response.ok) {
              const data = await response.json();

              // Handle different API response formats
              let stats;
              if (data.status === "success" || data.totalSolved !== undefined) {
                stats = {
                  totalSolved: data.totalSolved || 0,
                  totalQuestions: data.totalQuestions || 0,
                  easySolved: data.easySolved || 0,
                  totalEasy: data.totalEasy || 0,
                  mediumSolved: data.mediumSolved || 0,
                  totalMedium: data.totalMedium || 0,
                  hardSolved: data.hardSolved || 0,
                  totalHard: data.totalHard || 0,
                  acceptanceRate: data.acceptanceRate || 0,
                  ranking: data.ranking || 0,
                  contributionPoints: data.contributionPoints || 0,
                  reputation: data.reputation || 0,
                };
              } else if (data.totalSolved !== undefined) {
                // Alternative format
                stats = {
                  totalSolved: data.totalSolved || 0,
                  totalQuestions: data.totalQuestions || 0,
                  easySolved: data.easySolved || 0,
                  totalEasy: data.totalEasy || 0,
                  mediumSolved: data.mediumSolved || 0,
                  totalMedium: data.totalMedium || 0,
                  hardSolved: data.hardSolved || 0,
                  totalHard: data.totalHard || 0,
                  acceptanceRate: data.acceptanceRate || 0,
                  ranking: data.ranking || 0,
                  contributionPoints: data.contributionPoints || 0,
                  reputation: data.reputation || 0,
                };
              }

              if (stats && stats.totalSolved > 0) {
                setLeetcodeStats(stats);
                return; // Success, exit the loop
              }
            }
          } catch (error) {
            // Try next API
            continue;
          }
        }
      } catch (error) {
        console.error('Failed to fetch LeetCode stats:', error);
      }
    };

    fetchLeetCodeStats();
    // Refresh every 6 hours
    const interval = setInterval(fetchLeetCodeStats, 21600000);
    return () => clearInterval(interval);
  }, []);

  // Check for overflow and hide widgets when content loads (only when data changes)
  useEffect(() => {
    if (!containerRef.current || isAdjustingRef.current) return;

    const checkOverflow = () => {
      if (!containerRef.current || isAdjustingRef.current) return;

      const container = containerRef.current;
      const maxHeight = window.innerHeight - 128;
      const currentHeight = container.scrollHeight;
      const hasOverflow = currentHeight > maxHeight + 10; // Small buffer

      if (hasOverflow) {
        isAdjustingRef.current = true;
        // Hide widgets in order of priority (least important first)
        // Check DOM directly to see which widgets are actually visible
        const rssWidget = container.querySelector('[data-widget="rss"]');
        const codingWidget = container.querySelector('[data-widget="coding"]');
        const githubWidget = container.querySelector('[data-widget="github"]');

        if (rssWidget && rssItems.length > 0) {
          setShowRssWidget(false);
        } else if (codingWidget) {
          setShowCodingStats(false);
        } else if (githubWidget && githubStats) {
          setShowGitHubStats(false);
        }
        
        setTimeout(() => {
          isAdjustingRef.current = false;
        }, 200);
      }
    };

    // Only check when data loads, not when visibility changes
    const timeoutId = setTimeout(checkOverflow, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [githubStats, weather, rssItems]); // Only depend on data changes

  // Separate effect for window resize to restore widgets if space becomes available
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    
    const handleResize = () => {
      if (isAdjustingRef.current) return; // Don't restore while adjusting
      
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!containerRef.current || isAdjustingRef.current) return;

        const container = containerRef.current;
        const maxHeight = window.innerHeight - 128;
        const currentHeight = container.scrollHeight;
        const availableSpace = maxHeight - currentHeight;

        // Only restore if there's significant space (prevent flickering)
        // Restore widgets in reverse priority order, but only check one at a time per resize
        if (availableSpace > 250 && !showRssWidget && rssItems.length > 0) {
          isAdjustingRef.current = true;
          setShowRssWidget(true);
          setTimeout(() => { isAdjustingRef.current = false; }, 100);
        } else if (availableSpace > 150 && !showCodingStats) {
          isAdjustingRef.current = true;
          setShowCodingStats(true);
          setTimeout(() => { isAdjustingRef.current = false; }, 100);
        } else if (availableSpace > 150 && !showGitHubStats && githubStats) {
          isAdjustingRef.current = true;
          setShowGitHubStats(true);
          setTimeout(() => { isAdjustingRef.current = false; }, 100);
        }
      }, 500); // Longer debounce to prevent rapid toggling
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [showRssWidget, showCodingStats, showGitHubStats, githubStats, rssItems]);

  return (
    <aside
      className="fixed right-0 -translate-y-1/2 z-30 hidden xl:block"
      style={{ top: "calc(50vh + 48px)" }}
    >
      <div
        ref={containerRef}
        className="widget-container mr-8 w-64 space-y-4 max-h-[calc(100vh-8rem)] pr-2"
        style={{
          background: "transparent",
          overflow: "visible",
          paddingTop: "4px",
          paddingBottom: "4px",
        }}
      >
        {/* GitHub Stats Widget */}
        {showGitHubStats && githubStats && (
          <div data-widget="github" className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  GitHub
                </h3>
              </div>
              <a
                href="https://github.com/lostmartian"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Repos</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {githubStats.public_repos}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Followers
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {githubStats.followers}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Following
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {githubStats.following}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Coding Stats Widget */}
        {showCodingStats && (
          <div data-widget="coding" className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Coding Stats
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  LeetCode
                </span>
                <div className="flex items-center gap-2">
                  {leetcodeStats ? (
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {leetcodeStats.totalSolved}+
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      Loading...
                    </span>
                  )}
                  <a
                    href="https://leetcode.com/u/sahilgangurde/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              {leetcodeStats && (
                <div className="text-xs text-gray-500 dark:text-gray-500 pt-1">
                  {leetcodeStats.easySolved}E / {leetcodeStats.mediumSolved}M /{" "}
                  {leetcodeStats.hardSolved}H
                </div>
              )}
              <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">
                  CodeChef
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    5★
                  </span>
                  <a
                    href="https://www.codechef.com/users/lost_martian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weather & Time Widget (Combined) */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              lostmartian's Location
            </h3>
          </div>

          {/* Time Section */}
          <div className="text-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {currentTime}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              IST · Pune, India
            </div>
          </div>

          {/* Weather Section */}
          {weather ? (
            <>
              <div className="flex items-center justify-center gap-3 mb-3">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.description}
                  className="w-12 h-12"
                />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {weather.temp}°C
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {weather.description}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Feels like {weather.feelsLike}°C</span>
                <span>{weather.humidity}% humidity</span>
              </div>
            </>
          ) : (
            <div className="text-center text-xs text-gray-500 dark:text-gray-500 py-4">
              Loading weather...
            </div>
          )}
        </div>

        {/* RSS Feed Widget */}
        {showRssWidget && rssItems.length > 0 && (
          <div data-widget="rss" className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Rss className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Tech News
              </h3>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {rssItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                    {item.title}
                  </div>
                  {item.pubDate && (
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(item.pubDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

