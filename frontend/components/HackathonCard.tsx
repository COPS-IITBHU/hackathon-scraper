import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface HackathonCardProps {
  title: string
  description: string
  dates: string[]
  about: string[]
}

export default function HackathonCard({ title, description, dates, about }: HackathonCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        <div>
          <h3 className="font-semibold mb-2">Dates:</h3>
          <div className="flex flex-wrap gap-2">
            {dates.map((date, index) => (
              <Badge key={index} variant="secondary">
                {date}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">About:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
            {about.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

