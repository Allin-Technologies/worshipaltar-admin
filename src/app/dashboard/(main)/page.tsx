import { getCollectionList } from "@/actions/admin/collection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { regColumns } from "./[collection]/columns";
import Link from "next/link";

export default async function Page() {
  const defaultData = await getCollectionList({
    collection: "registration",
    pagination: { pageIndex: 0, pageSize: 10 },
  });

  return (
    <>
      <div className='p-4 pb-0 flex gap-3 items-center'>
        <h1 className='text-[#2b2b2b] text-lg font-semibold leading-7'>
          Dashboard
        </h1>
      </div>

      <div className='p-4'>
        <div className='flex-col justify-start items-start gap-6 inline-flex'>
          <h1 className='text-neutral-900 text-4xl font-semibold'>Metrics</h1>

          <div className='self-stretch justify-between items-center inline-flex'>
            <div className='flex-col justify-start items-start gap-3 inline-flex'>
              <p className='text-[#757575] text-sm leading-none'>
                Total Number of{" "}
              </p>
            </div>
          </div>
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
