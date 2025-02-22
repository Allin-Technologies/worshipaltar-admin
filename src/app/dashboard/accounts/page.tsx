import { getAccounts } from "@/actions/admin/accounts";
import { Separator } from "@/components/ui/separator";
import { PageClient } from "./page.client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Table() {
  const accounts = await getAccounts();

  return (
    <>
      <div className='p-4 pb-0 flex gap-3 items-center'>
        <h1 className='text-[#2b2b2b] text-lg font-semibold leading-7'>
          Accounts
        </h1>
      </div>

      <Separator />

      <div className='flex justify-between item-center p-4 pb-0'>
        <div id='table___timeline__' className='text-sm text-gray-60' />
        <div />
        <div className='flex justify-end'>
          <Button asChild>
            <Link href='/dashboard/accounts/invite'>Invite</Link>
          </Button>
        </div>
      </div>

      <div className='min-h-[100vh] flex flex-col flex-1 rounded-xl md:min-h-min px-4 pt-0 space-y-3'>
        <div className='text-[#2b2b2b] text-sm font-semibold'>
          <p>All</p>
        </div>

        <PageClient data={accounts?.data ?? []} />
      </div>
    </>
  );
}
