import type React from "react";
import {
  Globe,
  MapPin,
  Users,
  Gift,
  Briefcase,
  CheckCircle,
  Shirt,
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
import type { Volunteer } from "@/schema/entities";

interface VolunteerDialogProps extends React.PropsWithChildren {
  volunteer: Volunteer;
}

const VolunteerDialog: React.FC<VolunteerDialogProps> = ({
  volunteer,
  children,
}) => {
  const teams =
    volunteer.metadata.teams.other && volunteer.metadata.teams.other !== ""
      ? [...volunteer.metadata.teams?.value, volunteer.metadata.teams.other]
      : volunteer.metadata.teams?.value;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>{volunteer.name}</DialogTitle>
          <DialogDescription>{volunteer.email}</DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Details</CardTitle>
            <CardDescription>{volunteer.tel}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='border-t border-gray-200 pt-4'>
              <h3 className='text-lg font-semibold mb-2'>Volunteer Details</h3>
              <div className='grid grid-cols-2 gap-2 text-sm [&_svg]:flex-shrink-0'>
                <div className='flex items-center'>
                  <Briefcase className='mr-2' size={18} />
                  <span>Skills: {volunteer.metadata.skills}</span>
                </div>
                <div className='flex items-center'>
                  <Shirt className='mr-2' size={18} />
                  <span>T Shirt Size: {volunteer.metadata.shirt_size}</span>
                </div>
                <div className='flex items-center'>
                  <Users className='mr-2' size={18} />
                  <span>Teams: {teams}</span>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-4'>
              <h3 className='text-lg font-semibold mb-2'>
                Additional Information
              </h3>
              <p className='text-sm'>
                <strong>Motivation:</strong> {volunteer.metadata.motivation}
              </p>
              <p className='text-sm'>
                <strong>Expectations:</strong> {volunteer.metadata.expectations}
              </p>
              <div className='flex items-center mt-2 text-sm'>
                <Users className='mr-2' size={18} />
                <span>
                  Future Interest:{" "}
                  {volunteer.metadata.futureInterest ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerDialog;
