import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

interface SkillsListProps {
  matchedSkills: string[]
  missingSkills: string[]
}

export function SkillsList({ matchedSkills, missingSkills }: SkillsListProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            Matched Skills ({matchedSkills.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill, index) => (
                <Badge key={index} variant="success">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No matched skills found</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <XCircle className="h-5 w-5" />
            Missing Skills ({missingSkills.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, index) => (
                <Badge key={index} variant="warning">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">All required skills found!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

