import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import _404 from "@/public/assets/404.png";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className='w-screen flex flex-col bg-white'>
      <main className='min-h-dvh flex justify-center item-center'>
        <div className='flex flex-col justify-center item-center space-y-8'>
          <Image
            src={_404}
            width={300}
            height={120}
            alt='404 image'
            className=''
          />

          <div className='text-black text-center space-y-3'>
            <div>
              <p>Sorry page not found</p>
            </div>

            <div>
              <Link className='bg-black' href='/'>
                <Button className='bg-black mx-auto'>
                  <span>Go home</span>

                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
