import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResultsCardProps {
  matchScore: number
  strengths: string[]
  gaps: string[]
}

export function ResultsCard({ matchScore, strengths, gaps }: ResultsCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200"
    if (score >= 60) return "bg-yellow-50 border-yellow-200"
    return "bg-red-50 border-red-200"
  }

  return (
    <div className="space-y-6">
      {/* Match Score */}
      <Card className={cn("border-2", getScoreBg(matchScore))}>
        <CardContent className="p-8">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Match Score
            </p>
            <div className="flex items-center justify-center gap-4">
              <h1 className={cn("text-6xl font-bold", getScoreColor(matchScore))}>
                {matchScore}%
              </h1>
              {matchScore >= 80 ? (
                <TrendingUp className="h-12 w-12 text-green-600" />
              ) : matchScore >= 60 ? (
                <Minus className="h-12 w-12 text-yellow-600" />
              ) : (
                <TrendingDown className="h-12 w-12 text-red-600" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Gaps */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Your Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No strengths identified</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-600">Areas to Improve</CardTitle>
          </CardHeader>
          <CardContent>
            {gaps.length > 0 ? (
              <ul className="space-y-2">
                {gaps.map((gap, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">⚠</span>
                    <span className="text-sm">{gap}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No gaps identified</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

