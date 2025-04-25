"use client";

import { downloadCSV, fetchCSVContent } from "@/lib/download-csv";
import { Button } from "./ui/button";

import { useMutation } from "@tanstack/react-query";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DownloadCSV({
  collection,
}: {
  collection: "registration" | "testimony" | "new-convert";
}) {
  const mutation = useMutation({
    mutationFn: () => fetchCSVContent(collection),
    onSuccess: (data: Blob | null) => {
      if (!data) {
        toast.error("An error occurred while downloading the file");
        return;
      }
      // Trigger the CSV download on success
      downloadCSV(data, `${collection}.csv`);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(
        error.message ?? "An error occurred while downloading the file"
      );
      return;
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? (
        <Loader2 className='size-4 animate-spin' />
      ) : (
        <Download className='size-4' />
      )}

      <span>{mutation.isPending ? "Loading..." : "Export csv"}</span>
    </Button>
  );
}
