import type React from "react";
import {
  Globe,
  MapPin,
  Users,
  Gift,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Sponsor } from "@/schema/entities";
import Link from "next/link";

interface SponsorDialogProps extends React.PropsWithChildren {
  sponsor: Sponsor;
}

const SponsorDialog: React.FC<SponsorDialogProps> = ({ sponsor, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>{sponsor.name}</DialogTitle>
          <DialogDescription>{sponsor.email}</DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Sponsor Details</CardTitle>
            <CardDescription>{sponsor.tel}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center text-sm'>
              <Globe className='mr-2' size={16} />
              <Link
                href={sponsor.metadata.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                {sponsor.metadata.website}
              </Link>
            </div>

            <div className='flex items-center text-sm'>
              <MapPin className='mr-2' size={16} />
              <span>{sponsor.metadata.location}</span>
            </div>

            <div className='border-t border-gray-200 pt-4'>
              <h3 className='font-medium mb-2'>Sponsorship Details</h3>
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <div className='flex items-center'>
                  <Users className='mr-2' size={16} />
                  <span>Category: {sponsor.metadata.sponsorhip.category}</span>
                </div>
                <div className='flex items-center'>
                  <Gift className='mr-2' size={16} />
                  <span>Type: {sponsor.metadata.sponsorhip.type}</span>
                </div>
              </div>
              {sponsor.metadata.sponsorhip.custom && (
                <p className='mt-2 text-sm'>
                  Custom: {sponsor.metadata.sponsorhip.custom}
                </p>
              )}
              {sponsor.metadata.sponsorhip.other && (
                <p className='mt-2 text-sm'>
                  Other: {sponsor.metadata.sponsorhip.other}
                </p>
              )}
            </div>

            <div className='border-t border-gray-200 pt-4'>
              <h3 className='text-lg font-semibold mb-2'>
                Additional Information
              </h3>
              <p className='text-sm'>
                <span className='font-medium opacity-90'>Motivation:</span>{" "}
                {sponsor.metadata.sponsorhip.motivation}
              </p>
              <p className='text-sm'>
                <span className='font-medium opacity-90'>Requests:</span>{" "}
                {sponsor.metadata.sponsorhip.requests}
              </p>
              <div className='flex items-center mt-2 text-sm'>
                <Briefcase className='mr-2' size={16} />
                <span>
                  Branding Booth:{" "}
                  {sponsor.metadata.brandingBooth ? "Yes" : "No"}
                </span>
              </div>
              <div className='flex items-center mt-2 text-sm'>
                <CheckCircle className='mr-2' size={16} />
                <span>
                  Branding Booth Assets:{" "}
                  {sponsor.metadata.brandingBoothAssets ? "Yes" : "No"}
                </span>
              </div>
              <div className='flex items-center mt-2 text-sm'>
                <Users className='mr-2' size={16} />
                <span>
                  Future Interest:{" "}
                  {sponsor.metadata.sponsorhip.future ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorDialog;
