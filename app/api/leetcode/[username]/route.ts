import { type NextRequest, NextResponse } from "next/server"

// Default fallback data
const getDefaultStats = (username: string) => ({
  status: "error",
  message: "Failed to retrieve data",
  username: username,
  realName: null,
  avatar: null,
  country: null,
  totalSolved: 0,
  totalQuestions: 0,
  easySolved: 0,
  totalEasy: 0,
  mediumSolved: 0,
  totalMedium: 0,
  hardSolved: 0,
  totalHard: 0,
  acceptanceRate: 0,
  ranking: 0,
  contributionPoints: 0,
  reputation: 0,
  submissionCalendar: {},
  calendar: {
    streak: 0,
    totalActiveDays: 0,
    activeYears: [],
  },
})

export async function GET(request: NextRequest, context: { params: { username: string } }) {
  const url = new URL(request.url)
  const format = url.searchParams.get("format") || "json"

  try {
    const username = context.params.username


    if (!username) {
      const errorData = {
        // status: "error",
        // message: "Username is required",
        ...getDefaultStats("unknown"),
      }

      if (format === "html") {
        return new NextResponse(generateHTML(errorData), {
          headers: { "Content-Type": "text/html" },
        })
      }

      return NextResponse.json(errorData, {
        headers: { "Content-Type": "application/json" },
      })
    }

    const query = `
      query userProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          username
          profile {
            realName
            userAvatar
            ranking
            countryName
            reputation
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          userCalendar {
            activeYears
            streak
            totalActiveDays
            submissionCalendar
          }
          contributions {
            points
          }
        }
      }
    `

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
    })

    if (!response.ok) {
      const errorData = {
        ...getDefaultStats(username),
        message: `GraphQL request failed with status ${response.status}`,
      }

      if (format === "html") {
        return new NextResponse(generateHTML(errorData), {
          headers: { "Content-Type": "text/html" },
        })
      }

      return NextResponse.json(errorData, {
        headers: { "Content-Type": "application/json" },
      })
    }

    const result = await response.json()

    if (!result.data || !result.data.matchedUser) {
      const errorData = {
        ...getDefaultStats(username),
        message: "User not found",
      }

      if (format === "html") {
        return new NextResponse(generateHTML(errorData), {
          headers: { "Content-Type": "text/html" },
        })
      }

      return NextResponse.json(errorData, {
        headers: { "Content-Type": "application/json" },
      })
    }

    const user = result.data.matchedUser
    const allQuestions = result.data.allQuestionsCount || []

    // Process data safely
    const questionCounts = allQuestions.reduce((acc: any, item: any) => {
      if (item && item.difficulty && typeof item.count === "number") {
        acc[item.difficulty.toLowerCase()] = item.count
      }
      return acc
    }, {})

    const solvedStats: any = {}
    if (user.submitStatsGlobal?.acSubmissionNum) {
      user.submitStatsGlobal.acSubmissionNum.forEach((item: any) => {
        if (item && item.difficulty) {
          solvedStats[item.difficulty.toLowerCase()] = {
            solved: item.count || 0,
            submissions: item.submissions || 0,
          }
        }
      })
    }

    const easySolved = solvedStats["easy"]?.solved || 0
    const mediumSolved = solvedStats["medium"]?.solved || 0
    const hardSolved = solvedStats["hard"]?.solved || 0
    const totalSolved = easySolved + mediumSolved + hardSolved

    const totalEasy = questionCounts.easy || 0
    const totalMedium = questionCounts.medium || 0
    const totalHard = questionCounts.hard || 0
    const totalQuestions = totalEasy + totalMedium + totalHard

    const totalSubmissions =
      (solvedStats["easy"]?.submissions || 0) +
      (solvedStats["medium"]?.submissions || 0) +
      (solvedStats["hard"]?.submissions || 0)

    const acceptanceRate =
      totalSubmissions > 0 ? Number.parseFloat(((totalSolved / totalSubmissions) * 100).toFixed(2)) : 0

    const responseData = {
      status: "success",
      message: "retrieved",
      username: user.username || username,
      realName: user.profile?.realName || null,
      avatar: user.profile?.userAvatar || null,
      country: user.profile?.countryName || null,
      totalSolved,
      totalQuestions,
      easySolved,
      totalEasy,
      mediumSolved,
      totalMedium,
      hardSolved,
      totalHard,
      acceptanceRate,
      ranking: user.profile?.ranking || 0,
      contributionPoints: user.contributions?.points || 0,
      reputation: user.profile?.reputation || 0,
      submissionCalendar: user.userCalendar?.submissionCalendar || {},
      calendar: {
        streak: user.userCalendar?.streak || 0,
        totalActiveDays: user.userCalendar?.totalActiveDays || 0,
        activeYears: user.userCalendar?.activeYears || [],
      },
    }

    // Return HTML by default for browser viewing
    if (format !== "json") {
      return new NextResponse(generateHTML(responseData), {
        headers: { "Content-Type": "text/html" },
      })
    }

    return NextResponse.json(responseData, {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    const errorData = {
      ...getDefaultStats("error"),
      message: "Failed to fetch LeetCode data - server error",
      error: error instanceof Error ? error.message : "Unknown error",
    }

    if (format === "html") {
      return new NextResponse(generateHTML(errorData), {
        headers: { "Content-Type": "text/html" },
      })
    }

    return NextResponse.json(errorData, {
      headers: { "Content-Type": "application/json" },
    })
  }
}

function generateHTML(data: any): string {
  const isSuccess = data.status === "success"

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LeetCode Stats - ${data.username}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 20px;
        }
        .username {
            font-size: 2.5em;
            font-weight: bold;
            color: ${isSuccess ? "#2563eb" : "#dc2626"};
            margin: 0;
        }
        .status {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
            background: ${isSuccess ? "#dcfce7" : "#fee2e2"};
            color: ${isSuccess ? "#166534" : "#991b1b"};
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .stat-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            text-align: center;
        }
        .stat-value {
            font-size: 2em;
            font-weight: bold;
            color: #1e40af;
            margin: 0;
        }
        .stat-label {
            color: #64748b;
            margin-top: 5px;
            font-size: 0.9em;
        }
        .difficulty-section {
            margin: 30px 0;
        }
        .difficulty-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        .difficulty-card {
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .easy { background: #dcfce7; border-left: 4px solid #16a34a; }
        .medium { background: #fef3c7; border-left: 4px solid #d97706; }
        .hard { background: #fee2e2; border-left: 4px solid #dc2626; }
        .json-section {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
        }
        .json-container {
            background: #1e293b;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9em;
            line-height: 1.5;
        }
        .api-links {
            margin: 20px 0;
            text-align: center;
        }
        .api-link {
            display: inline-block;
            margin: 5px 10px;
            padding: 8px 16px;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 0.9em;
        }
        .api-link:hover {
            background: #2563eb;
        }
        .error-message {
            background: #fee2e2;
            color: #991b1b;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="username">@${data.username}</h1>
            <span class="status">${data.status.toUpperCase()}</span>
            ${data.realName ? `<p style="color: #64748b; margin: 10px 0;">${data.realName}</p>` : ""}
            ${data.country ? `<p style="color: #64748b; margin: 5px 0;">📍 ${data.country}</p>` : ""}
        </div>

        ${!isSuccess ? `<div class="error-message">${data.message}</div>` : ""}

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${data.totalSolved}</div>
                <div class="stat-label">Problems Solved</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.totalQuestions}</div>
                <div class="stat-label">Total Problems</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.acceptanceRate}%</div>
                <div class="stat-label">Acceptance Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.ranking > 0 ? "#" + data.ranking.toLocaleString() : "N/A"}</div>
                <div class="stat-label">Global Ranking</div>
            </div>
        </div>

        <div class="difficulty-section">
            <h3>Difficulty Breakdown</h3>
            <div class="difficulty-grid">
                <div class="difficulty-card easy">
                    <div class="stat-value">${data.easySolved}/${data.totalEasy}</div>
                    <div class="stat-label">Easy</div>
                </div>
                <div class="difficulty-card medium">
                    <div class="stat-value">${data.mediumSolved}/${data.totalMedium}</div>
                    <div class="stat-label">Medium</div>
                </div>
                <div class="difficulty-card hard">
                    <div class="stat-value">${data.hardSolved}/${data.totalHard}</div>
                    <div class="stat-label">Hard</div>
                </div>
            </div>
        </div>

        <div class="api-links">
            <a href="?format=json" class="api-link">📄 View JSON</a>
            <a href="/api" class="api-link">📚 API Docs</a>
            <a href="/" class="api-link">🏠 Home</a>
        </div>

        <div class="json-section">
            <h3>JSON Response</h3>
            <div class="json-container">
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    </div>
</body>
</html>
  `
}
