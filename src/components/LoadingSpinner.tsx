import { Loader2 } from "lucide-react"
import { Card, CardContent } from "./ui/card"

export function LoadingSpinner({ message = "Analyzing your resume..." }: { message?: string }) {
  return (
    <Card className="w-full">
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">{message}</p>
          <p className="text-sm text-muted-foreground">
            This may take a few seconds...
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

