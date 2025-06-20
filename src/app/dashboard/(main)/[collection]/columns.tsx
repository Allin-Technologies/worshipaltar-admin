"use client";

import { Registration, NewConvert, Testimony } from "@/schema/entities";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const regColumns: ColumnDef<Registration>[] = [
  {
    accessorKey: "name",
    header: "Full name",
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
  // {
  //   accessorKey: "checked_in",
  //   header: "Checked in",
  //   cell({ row }) {
  //     const value = row.original.checked_in;

  //     if (value === false)
  //       return (
  //         <div className='h-6 px-2 py-1 bg-[#fbeae9] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
  //           <div className='justify-center items-center inline-flex'>
  //             <div className='px-1 justify-center items-center flex'>
  //               <span className='text-center text-[#d3251f] text-xs font-medium'>
  //                 No
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     else if (value == true)
  //       return (
  //         <div className='h-6 px-2 py-1 bg-[#e7f6ec] rounded-xl flex-col justify-center items-center gap-2 inline-flex'>
  //           <div className='justify-center items-center inline-flex'>
  //             <div className='px-1 justify-center items-center flex'>
  //               <span className='text-center text-[#036b26] text-xs font-medium'>
  //                 Yes
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     else return <span>-</span>;
  //   },
  // },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell({ row }) {
      const isoDate = row.original.timestamp;

      return <span>{dayjs(isoDate).format("MMMM D, YYYY h:mm A")}</span>;
    },
  },
];

export const new_convertColumns: ColumnDef<NewConvert>[] = [
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
    accessorKey: "metadata.address",
    header: "Address",
    cell({ row }) {
      const address = row.original.metadata.address;

      return <span className=''>{address?.line_1}</span>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell({ row }) {
      const isoDate = row.original.timestamp;

      return <span>{dayjs(isoDate).format("MMMM D, YYYY h:mm A")}</span>;
    },
  },
];

export const testimonyColumns: ColumnDef<Testimony>[] = [
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
    accessorKey: "metadata.title",
    header: "Testimony Title",
  },
  {
    accessorKey: "metadata.body",
    header: "Testimony Body",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell({ row }) {
      const isoDate = row.original.timestamp;

      return <span>{dayjs(isoDate).format("MMMM D, YYYY h:mm A")}</span>;
    },
  },
];
