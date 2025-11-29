import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalysisTypeToggleProps {
  analysisType: "basic" | "ai"
  onTypeChange: (type: "basic" | "ai") => void
}

export function AnalysisTypeToggle({
  analysisType,
  onTypeChange,
}: AnalysisTypeToggleProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analysis Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div
              className={cn(
                "p-3 rounded-lg",
                analysisType === "basic"
                  ? "bg-primary/10"
                  : "bg-muted"
              )}
            >
              <Zap className={cn(
                "h-5 w-5",
                analysisType === "basic" ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <Label className="text-base font-medium cursor-pointer">
                Basic Analysis
              </Label>
              <p className="text-sm text-muted-foreground">
                Fast keyword matching
              </p>
            </div>
          </div>
          <Switch
            checked={analysisType === "ai"}
            onCheckedChange={(checked) => onTypeChange(checked ? "ai" : "basic")}
          />
          <div className="flex items-center gap-3 flex-1 justify-end">
            <div>
              <Label className="text-base font-medium cursor-pointer">
                AI Analysis
              </Label>
              <p className="text-sm text-muted-foreground">
                Advanced AI-powered insights
              </p>
            </div>
            <div
              className={cn(
                "p-3 rounded-lg",
                analysisType === "ai"
                  ? "bg-primary/10"
                  : "bg-muted"
              )}
            >
              <Sparkles className={cn(
                "h-5 w-5",
                analysisType === "ai" ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

