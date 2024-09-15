"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "1", desktop: 186, mobile: 80 },
  { month: "2", desktop: 305, mobile: 200 },
  { month: "3", desktop: 237, mobile: 120 },
  { month: "4", desktop: 73, mobile: 190 },
  { month: "5", desktop: 209, mobile: 130 },
  { month: "6", desktop: 214, mobile: 140 },
  { month: "7", desktop: 305, mobile: 200 },
  { month: "8", desktop: 237, mobile: 120 },
  { month: "9", desktop: 73, mobile: 190 },
  { month: "10", desktop: 209, mobile: 130 },
]

const chartConfig = {
  desktop: {
    label: "Your  Score",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Avg Score",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <div className="flex justify-center items-center w-1/2 h-96">
    <Card className="h-full ">
      <CardHeader>
        <CardTitle className="text-4xl">Your Score Comparition</CardTitle>
        <CardDescription>Performance analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
     
    </Card>
    </div>
  )
}
