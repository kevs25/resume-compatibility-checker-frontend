import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileUpload } from "@/components/FileUpload"
import { JobDescriptionInput } from "@/components/JobDescriptionInput"
import { AnalysisTypeToggle } from "@/components/AnalysisTypeToggle"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Home() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [analysisType, setAnalysisType] = useState<"basic" | "ai">("basic")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert("Please upload your resume")
      return
    }
    if (!jobDescription.trim()) {
      alert("Please paste the job description")
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("resume", resumeFile)
      formData.append("job_description", jobDescription)

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
      const endpointPath = analysisType === "ai" ? "/api/analyze-ai" : "/api/analyze"
      const endpoint = apiBaseUrl ? `${apiBaseUrl}${endpointPath}` : endpointPath
      
      if (analysisType === "ai") {
        formData.append("model", "llama-free")
      } else {
        formData.append("analysis_type", "basic")
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Analysis failed")
      }

      const data = await response.json()
      
      // Navigate to results page with data
      navigate("/results", { state: { analysisData: data } })
    } catch (error) {
      console.error("Analysis error:", error)
      alert(error instanceof Error ? error.message : "Failed to analyze resume")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Resume Compatibility Checker
          </h1>
          <p className="text-lg text-gray-600">
            Upload your resume and job description to get instant compatibility analysis
          </p>
        </div>

        <div className="space-y-6">
          <FileUpload
            onFileSelect={setResumeFile}
            selectedFile={resumeFile}
          />

          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
          />

          <AnalysisTypeToggle
            analysisType={analysisType}
            onTypeChange={setAnalysisType}
          />

          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !resumeFile || !jobDescription.trim()}
            className="w-full h-12 text-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

