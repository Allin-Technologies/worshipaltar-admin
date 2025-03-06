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
              <h3 className='text-lg font-medium mb-2'>Volunteer Details</h3>
              <div className='grid grid-cols-2 gap-2 text-sm [&_svg]:flex-shrink-0'>
                <div className='flex items-center'>
                  <Briefcase className='mr-2' size={16} />
                  <span>Skills: {volunteer.metadata.skills}</span>
                </div>
                <div className='flex items-center'>
                  <Shirt className='mr-2' size={16} />
                  <span>T Shirt Size: {volunteer.metadata.shirt_size}</span>
                </div>
                <div className='flex items-start'>
                  <Users className='mr-2' size={16} />
                  <span>Teams: {teams?.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-4'>
              <h3 className='text-sm font-semibold mb-2'>
                Additional Information
              </h3>
              <p className='text-sm'>
                <span className='font-medium opacity-90'>Motivation:</span>{" "}
                {volunteer.metadata.motivation}
              </p>
              <p className='text-sm'>
                <span className='font-medium opacity-90'>Expectations:</span>{" "}
                {volunteer.metadata.expectations}
              </p>
              <p className='text-sm'>
                <span className='font-medium opacity-90'>Future Interest:</span>{" "}
                {volunteer.metadata.futureInterest ? "Yes" : "No"}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerDialog;
