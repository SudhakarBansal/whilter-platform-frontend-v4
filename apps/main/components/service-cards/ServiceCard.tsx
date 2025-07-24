'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { type ServiceCardProps } from '@whilter/ui-kit/types';
import { checkServiceAccess } from '../../utils/auth';
import React, { useState } from 'react';
import { UnauthorizedDialog } from '../UnAuthorizedDialog';

export const ServiceCard: React.FC<ServiceCardProps> = ({
  serviceId,
  image,
  href,
  title
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    debugger;
    const role = (session?.user as any)?.role;
    const userSections = (session?.user as any)?.section || [];
    const targetSection = serviceId;

    const hasAccess = checkServiceAccess(role, userSections, targetSection);

    if (hasAccess) {
      router.push(href);
    } else {
      setShowDialog(true);
    }
  };


  return (
    <>
      <div
        onClick={handleClick}
        className="relative cursor-pointer bg-transparent transition-shadow duration-300 ease-in-out rounded-[40px] aspect-[16/10] bg-gradient-to-br from-blue-400 to-blue-800 overflow-hidden group translate-z-0"
      >
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="overlay absolute bottom-0 left-0 right-0 h-[35%] group-hover:h-full transition-all duration-300 ease-in-out bg-gradient-to-b from-blue-300/80 to-blue-600 flex items-center justify-center shadow-[0px_-9px_17px_0px_rgba(0,0,0,0.2)]">
          <div className="p-4">
            <h4 className="text-xl md:text-lg lg:text-xl text-center text-white font-normal">
              {title}
            </h4>
          </div>
        </div>
      </div>

      {/* Simple Dialog */}
      {showDialog && (
        <UnauthorizedDialog open={showDialog}
          onClose={() => setShowDialog(false)}
          title={title} />
      )}
    </>
  );
};
