import { DownloadCSV } from "@/components/download-csv-button";
import { Separator } from "@/components/ui/separator";
import { CollectionTable } from "./data-table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCollectionList } from "@/actions/admin/collection";
import Data from "./data.json";
import { notFound } from "next/navigation";

export default async function Table(props: {
  params: Promise<{ collection: string }>;
}) {
  const collection = await (await props.params).collection;

  const page = Data.find((page) => page?.type === collection);

  if (!page) notFound();

  const defaultData = await getCollectionList({
    collection: page.type === "attendee" ? "registration" : (page.type as any),
    pagination: { pageIndex: 0, pageSize: 10 },
  });

  return (
    <>
      <div className='p-4 pb-0 flex gap-3 items-center'>
        <h1 className='text-[#2b2b2b] text-lg font-semibold leading-7'>
          {(() => {
            switch (collection) {
              case "attendee":
                return "Attendee Registrations";
              case "sponsor":
                return "Sponsors";
              case "volunteer":
                return "Volunteers";
              default:
                return "";
            }
          })()}
        </h1>
      </div>
      <Separator />

      <div className='flex justify-between item-center p-4 pb-0'>
        <div id='table___timeline__' className='text-sm text-gray-60' />
        <div />
        <div className='flex justify-end'>
          <DownloadCSV collection='registration' />
        </div>
      </div>
      <div className='min-h-[100vh] flex flex-col flex-1 rounded-xl md:min-h-min px-4 pt-0 space-y-3'>
        <div className='text-[#2b2b2b] text-sm font-semibold'>
          <p>All</p>
        </div>

        <CollectionTable
          collection={
            page.type === "attendee" ? "registration" : (page.type as any)
          }
          defaultData={defaultData?.data.items ?? []}
          defaultPagination={{ pageIndex: 0, pageSize: 10 }}
        />
      </div>
    </>
  );
}
