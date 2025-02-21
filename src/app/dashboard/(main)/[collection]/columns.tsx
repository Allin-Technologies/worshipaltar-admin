"use client";

import { Registration, Sponsor, Volunteer } from "@/schema/entities";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const regColumns: ColumnDef<Registration>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tel",
    header: "Phone Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "metadata.financial_goals",
    header: "Financial Goals",
    cell({ row }) {
      const value: string = row.getValue("metadata.financial_goals");

      return <span className=''>{!value ? " - " : value}</span>;
    },
  },
];

export const volunteerColumns: ColumnDef<Registration>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tel",
    header: "Phone Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "metadata.shirt_size",
    header: "T Shirt Size",
    cell({ row }) {
      const value: string = row.getValue("metadata.shirt_size");

      return <span className=''>{!value ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.skills",
    header: "Skills",
    cell({ row }) {
      const value: string = row.getValue("metadata.skills");

      return <span className=''>{!value ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.motivation",
    header: "Motivation",
    cell({ row }) {
      const value: string = row.getValue("metadata.motivation");

      return <span className=''>{!value ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.expectations",
    header: "Expectations",
    cell({ row }) {
      const value: string = row.getValue("metadata.expectations");

      return <span className=''>{!value ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.availability",
    header: "Availability",
    cell({ row }) {
      const value: boolean = row.getValue("metadata.availability");

      if (value === false)
        return (
          <div className='h-6 px-2 py-1 bg-[#fbeae9] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#d3251f] text-xs font-medium'>
                  No
                </span>
              </div>
            </div>
          </div>
        );
      else if (value == true)
        return (
          <div className='h-6 px-2 py-1 bg-[#e7f6ec] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#036b26] text-xs font-medium'>
                  Yes
                </span>
              </div>
            </div>
          </div>
        );
      else return <span>-</span>;
    },
  },
  {
    accessorKey: "metadata.teams",
    header: "Teams",
    cell({ row }) {
      const value: { value: string[]; other: "" } =
        row.getValue("metadata.teams");

      return (
        <span className=''>{[...value?.value, value.other]?.join(",")}</span>
      );
    },
  },
  {
    accessorKey: "metadata.futureInterest",
    header: "Future Interest",
    cell({ row }) {
      const value: boolean = row.getValue("metadata.futureInterest");

      if (value === false)
        return (
          <div className='h-6 px-2 py-1 bg-[#fbeae9] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#d3251f] text-xs font-medium'>
                  No
                </span>
              </div>
            </div>
          </div>
        );
      else if (value == true)
        return (
          <div className='h-6 px-2 py-1 bg-[#e7f6ec] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#036b26] text-xs font-medium'>
                  Yes
                </span>
              </div>
            </div>
          </div>
        );
      else return <span>-</span>;
    },
  },
];

export const sponsorColumns: ColumnDef<Registration>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tel",
    header: "Phone Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "metadata.contactPerson",
    header: "Contact Person",
    cell({ row }) {
      const value: string = row.getValue("metadata.contactPerson");

      return <span className=''>{!value || value === "" ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.website",
    header: "Website / Social",
    cell({ row }) {
      const value: string = row.getValue("metadata.website");

      return <Link href={value || "#"}>visit</Link>;
    },
  },
  {
    accessorKey: "metadata.sponsorhip.category",
    header: "Sponsorhip category",
    cell({ row }) {
      const value: string = row.getValue("metadata.sponsorhip.category");

      return <span className=''>{!value ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.sponsorhip.custom",
    header: "Custome Sponsor category",
    cell({ row }) {
      const value: string = row.getValue("metadata.sponsorhip.custom");

      return <span>{!value || value === "" ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.sponsorhip.type",
    header: "Sponsorhip type",
    cell({ row }) {
      const value: string = row.getValue("metadata.sponsorhip.type");

      return <span className=''>{!value ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.sponsorhip.other",
    header: "Website / Social",
    cell({ row }) {
      const value: string = row.getValue("metadata.sponsorhip.other");

      return <span>{!value || value === "" ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.sponsorhip.motivation",
    header: "Motivation",
    cell({ row }) {
      const value: string = row.getValue("metadata.sponsorhip.motivation");

      return <span className=''>{!value || value === "" ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.sponsorhip.requests",
    header: "Requests",
    cell({ row }) {
      const value: string = row.getValue("metadata.sponsorhip.requests");

      return <span className=''>{!value || value === "" ? " - " : value}</span>;
    },
  },
  {
    accessorKey: "metadata.brandingBooth",
    header: "Booth Branding",
    cell({ row }) {
      const value: boolean = row.getValue("metadata.brandingBooth");

      if (value === false)
        return (
          <div className='h-6 px-2 py-1 bg-[#fbeae9] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#d3251f] text-xs font-medium'>
                  No
                </span>
              </div>
            </div>
          </div>
        );
      else if (value == true)
        return (
          <div className='h-6 px-2 py-1 bg-[#e7f6ec] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#036b26] text-xs font-medium'>
                  Yes
                </span>
              </div>
            </div>
          </div>
        );
      else return <span>-</span>;
    },
  },
  {
    accessorKey: "metadata.brandingBoothAssets",
    header: "Booth Branding Assets",
    cell({ row }) {
      const value: boolean = row.getValue("metadata.brandingBoothAssets");

      if (value === false)
        return (
          <div className='h-6 px-2 py-1 bg-[#fbeae9] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#d3251f] text-xs font-medium'>
                  No
                </span>
              </div>
            </div>
          </div>
        );
      else if (value == true)
        return (
          <div className='h-6 px-2 py-1 bg-[#e7f6ec] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#036b26] text-xs font-medium'>
                  Yes
                </span>
              </div>
            </div>
          </div>
        );
      else return <span>-</span>;
    },
  },
  {
    accessorKey: "metadata.sponsorhip.future",
    header: "Future Interest",
    cell({ row }) {
      const value: boolean = row.getValue("metadata.future");

      if (value === false)
        return (
          <div className='h-6 px-2 py-1 bg-[#fbeae9] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#d3251f] text-xs font-medium'>
                  No
                </span>
              </div>
            </div>
          </div>
        );
      else if (value == true)
        return (
          <div className='h-6 px-2 py-1 bg-[#e7f6ec] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
            <div className='justify-center items-center inline-flex'>
              <div className='px-1 justify-center items-center flex'>
                <span className='text-center text-[#036b26] text-xs font-medium'>
                  Yes
                </span>
              </div>
            </div>
          </div>
        );
      else return <span>-</span>;
    },
  },
];
