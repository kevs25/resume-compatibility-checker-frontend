import { useLocation, useNavigate } from "react-router-dom"
import { ResultsCard } from "@/components/ResultsCard"
import { SkillsList } from "@/components/SkillsList"
import { RecommendationsList } from "@/components/RecommendationsList"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalysisData {
  success: boolean
  filename: string
  analysis_type: string
  result: {
    // For AI analysis - nested structure
    analysis?: {
      match_score?: number
      strengths?: string[]
      gaps?: string[]
      matched_requirements?: string[]
      missing_requirements?: string[]
      recommendations?: string[]
      overall_assessment?: string
      application_recommendation?: string
      experience_match?: string
      skills_match?: string
    }
    // For basic/advanced analysis - flat structure
    match_percentage?: number
    final_score?: number
    match_score?: number
    matched_skills?: string[]
    missing_skills?: string[]
    strengths?: string[]
    gaps?: string[]
    recommendations?: string[]
    suggestions?: string[]
    overall_assessment?: string
    insights?: string[]
    recommendation?: string
  }
}

export function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const analysisData = location.state?.analysisData as AnalysisData | undefined

  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-lg mb-4">No analysis data found</p>
            <Button onClick={() => navigate("/")}>Go Back Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const result = analysisData.result || {}
  
  // Check if this is AI analysis with nested structure
  const isAIAnalysis = result.analysis !== undefined
  const analysis = isAIAnalysis ? result.analysis : null
  
  // Extract data with fallbacks for different API response formats
  const matchScore = Math.round(
    analysis?.match_score || 
    result.match_score || 
    result.final_score || 
    result.match_percentage || 
    0
  )
  
  // Extract skills - handle both nested and flat structures
  const matchedSkills = 
    (isAIAnalysis && analysis?.matched_requirements ? analysis.matched_requirements : result.matched_skills) || []
  const missingSkills = 
    (isAIAnalysis && analysis?.missing_requirements ? analysis.missing_requirements : result.missing_skills) || []
  
  // Extract strengths and gaps - handle different response formats
  let strengths: string[] = (analysis?.strengths || result.strengths || []) as string[]
  let gaps: string[] = (analysis?.gaps || result.gaps || []) as string[]
  
  // If insights exist, try to extract strengths/gaps from them
  if (result.insights && Array.isArray(result.insights)) {
    const insights = result.insights as string[]
    if (strengths.length === 0) {
      strengths = insights.filter(insight => 
        insight.toLowerCase().includes('strength') || 
        insight.toLowerCase().includes('strong') ||
        insight.toLowerCase().includes('good')
      )
    }
    if (gaps.length === 0) {
      gaps = insights.filter(insight => 
        insight.toLowerCase().includes('gap') || 
        insight.toLowerCase().includes('missing') ||
        insight.toLowerCase().includes('improve') ||
        insight.toLowerCase().includes('lack')
      )
    }
  }
  
  // Extract recommendations from various possible fields
  let recommendations: string[] = []
  if (analysis?.recommendations && Array.isArray(analysis.recommendations)) {
    recommendations = analysis.recommendations
  } else if (result.recommendations && Array.isArray(result.recommendations)) {
    recommendations = result.recommendations
  } else if (result.suggestions && Array.isArray(result.suggestions)) {
    recommendations = result.suggestions
  } else if (result.recommendation && typeof result.recommendation === 'string') {
    recommendations = [result.recommendation]
  } else if (result.insights && Array.isArray(result.insights)) {
    // Use insights as recommendations if no specific recommendations field
    recommendations = (result.insights as string[]).slice(0, 5)
  }
  
  // Extract overall assessment
  const overallAssessment = analysis?.overall_assessment || result.overall_assessment
  const applicationRecommendation = isAIAnalysis && analysis ? analysis.application_recommendation : undefined
  const experienceMatch = isAIAnalysis && analysis ? analysis.experience_match : undefined
  const skillsMatch = isAIAnalysis && analysis ? analysis.skills_match : undefined

  const handleDownloadReport = () => {
    const report = {
      filename: analysisData.filename,
      analysisType: analysisData.analysis_type,
      matchScore,
      strengths,
      gaps,
      matchedSkills,
      missingSkills,
      recommendations,
      overallAssessment: overallAssessment || "",
      generatedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `resume-analysis-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <Button
            onClick={handleDownloadReport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <strong>File:</strong> {analysisData.filename}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Analysis Type:</strong> {analysisData.analysis_type}
              </p>
            </CardContent>
          </Card>
        </div>

        <ResultsCard
          matchScore={matchScore}
          strengths={strengths}
          gaps={gaps}
        />

        {overallAssessment && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{overallAssessment}</p>
              {experienceMatch && (
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Experience:</strong> {experienceMatch}
                </p>
              )}
              {skillsMatch && (
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Skills:</strong> {skillsMatch}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {applicationRecommendation && (
          <Card className="mt-6 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Application Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {applicationRecommendation === "APPLY" && (
                  <>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <p className="text-lg font-semibold text-green-600">APPLY - Strong Match!</p>
                  </>
                )}
                {applicationRecommendation === "CONSIDER" && (
                  <>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <p className="text-lg font-semibold text-yellow-600">CONSIDER - Review Carefully</p>
                  </>
                )}
                {applicationRecommendation === "NOT_RECOMMENDED" && (
                  <>
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <p className="text-lg font-semibold text-red-600">NOT RECOMMENDED - Significant Gaps</p>
                  </>
                )}
                {!["APPLY", "CONSIDER", "NOT_RECOMMENDED"].includes(applicationRecommendation) && (
                  <p className="text-lg font-semibold">{applicationRecommendation}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6">
          <SkillsList
            matchedSkills={matchedSkills}
            missingSkills={missingSkills}
          />
        </div>

        {recommendations.length > 0 && (
          <div className="mt-6">
            <RecommendationsList recommendations={recommendations} />
          </div>
        )}
      </div>
    </div>
  )
}

