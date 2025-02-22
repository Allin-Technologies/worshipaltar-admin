import { getCollectionList } from "@/actions/admin/collection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { regColumns } from "./[collection]/columns";
import Link from "next/link";
import { getAnalyticsData } from "@/actions/admin/analytics";
import { AnalyticsAreaChart } from "./charts/area.chart";

export default async function Page() {
  const defaultData = await getCollectionList({
    collection: "registration",
    pagination: { pageIndex: 0, pageSize: 24 },
  });

  const daysAnalyticsData = await getAnalyticsData({ timeline: "days" });
  const monthAnalyticsData = await getAnalyticsData({ timeline: "year" });

  return (
    <>
      <div className='p-4 pb-0 flex gap-3 items-center'>
        <h1 className='text-[#2b2b2b] text-lg font-semibold leading-7'>
          Dashboard
        </h1>
      </div>

      <div className='p-4 w-full'>
        <div className='flex-col justify-start items-start gap-6 flex'>
          <h1 className='text-neutral-900 text-4xl font-semibold'>Metrics</h1>

          <AnalyticsAreaChart
            days={daysAnalyticsData.data ?? {}}
            month={monthAnalyticsData.data ?? {}}
          />
        </div>
      </div>

      <Separator />

      <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min px-4 pt-0 space-y-3'>
        <div className='text-[#2b2b2b] text-sm font-semibold flex justify-between items-center'>
          <p>Recent Registrations</p>

          <Button asChild>
            <Link href={`/dashboard/attendee`}>View All</Link>
          </Button>
        </div>

        <DataTable
          columns={regColumns as any}
          data={defaultData?.data?.items ?? []}
        />
      </div>
    </>
  );
}
