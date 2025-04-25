"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsData } from "@/schema/analytics";

interface AnalyticsAreaChartProps {
  days: AnalyticsData;
  month: AnalyticsData;
}

const daysChartConfig = {
  visitors: {
    label: "Visitors",
  },
  registrations: {
    label: "Registrations",
    color: "hsl(var(--chart-1))",
  },
  testimonies: {
    label: "Testimonies",
    color: "hsl(var(--chart-2))",
  },
  new_convert: {
    label: "NewConverts",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const monthChartConfig = {
  registrations: {
    label: "Registrations",
    color: "hsl(var(--chart-1))",
  },
  testimonies: {
    label: "Testimonies",
    color: "hsl(var(--chart-2))",
  },
  new_convert: {
    label: "NewConverts",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function AnalyticsAreaChart({ days, month }: AnalyticsAreaChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  // Convert analytics data into a format suitable for the chart
  const daysChartData = Object.entries(days).map(([date, values]) => ({
    date,
    ...values,
  }));
  // Convert analytics data into a format suitable for the chart
  const monthChartData = Object.entries(month).map(([month, values]) => ({
    month,
    ...values,
  }));

  const filteredData = daysChartData.filter((item) => {
    const date = new Date(item.date);
    date.setHours(0, 0, 0, 0); // Normalize the date to midnight

    const referenceDate = new Date();
    referenceDate.setHours(0, 0, 0, 0); // Normalize reference date to midnight

    const startDate = new Date(referenceDate);

    if (timeRange === "90d") {
      startDate.setMonth(referenceDate.getMonth() - 3); // Go back 3 months safely
    } else if (timeRange === "30d") {
      startDate.setDate(referenceDate.getDate() - 30);
    } else if (timeRange === "7d") {
      startDate.setDate(referenceDate.getDate() - 7);
    }

    return date >= startDate && date <= referenceDate;
  });

  return (
    // <div>
    //   <div className='grid grid-cols-5'>
    //     <div className='col-span-2'>
    //       <ChartContainer config={monthChartConfig}>
    //         <BarChart accessibilityLayer data={monthChartData}>
    //           <CartesianGrid vertical={false} />
    //           <XAxis
    //             dataKey='month'
    //             tickLine={false}
    //             tickMargin={10}
    //             axisLine={false}
    //             tickFormatter={(value) => value.slice(0, 3)}
    //           />
    //           <ChartTooltip
    //             cursor={false}
    //             content={<ChartTooltipContent indicator='dashed' />}
    //           />
    //           <Bar
    //             dataKey='registrations'
    //             fill='var(--color-registrations)'
    //             radius={4}
    //           />
    //           <Bar dataKey='testimonies' fill='var(--color-testimonies)' radius={4} />
    //           <Bar
    //             dataKey='new-convert'
    //             fill='var(--color-new-convert)'
    //             radius={4}
    //           />
    //         </BarChart>
    //       </ChartContainer>
    //     </div>
    <div className='w-full'>
      <div className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1 text-center sm:text-left'>
          <p>
            Showing total results for the last{" "}
            {timeRange === "90d"
              ? "3 months"
              : timeRange === "30d"
              ? "30days"
              : "7 days"}
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className='w-[160px] rounded-lg sm:ml-auto'
            aria-label='Select a value'
          >
            <SelectValue placeholder='Last 3 months' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='90d' className='rounded-lg'>
              Last 3 months
            </SelectItem>
            <SelectItem value='30d' className='rounded-lg'>
              Last 30 days
            </SelectItem>
            <SelectItem value='7d' className='rounded-lg'>
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={daysChartConfig}
          className='aspect-auto h-[300px] w-full'
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient
                id='fillRegistrations'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset='5%'
                  stopColor='var(--color-registrations)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-dregistrationsesktop)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillTestimonies' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-testimonies)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-testimonies)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillNewConverts' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-new-convert)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-new-convert)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              dataKey='registrations'
              type='natural'
              fill='url(#fillRegistrations)'
              stroke='var(--color-registrations)'
              stackId='a'
            />
            <Area
              dataKey='testimonies'
              type='natural'
              fill='url(#fillTestimonies)'
              stroke='var(--color-testimonies)'
              stackId='a'
            />
            <Area
              dataKey='new-convert'
              type='natural'
              fill='url(#fillNewConverts)'
              stroke='var(--color-new-convert)'
              stackId='a'
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
    //   {/* </div>
    // </div> */}
  );
}
