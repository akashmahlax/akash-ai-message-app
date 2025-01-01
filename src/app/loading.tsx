import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import "@/app/global.css"

export default function Loading() {
  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-blue-500 text-white">
          <CardTitle className="text-2xl font-bold">khalsa Ai</CardTitle>
        </CardHeader>
        <CardContent className="bg-gray-100">
          <div className="space-y-4 mb-4 h-[500px] overflow-y-auto p-4 rounded-lg bg-white shadow-inner">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1 rounded-lg bg-green-500" />
            <Skeleton className="h-10 w-10 rounded-full bg-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
