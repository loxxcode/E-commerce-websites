'use client';

import { useEffect } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';



import { useStoreModal } from "@/hooks/use-store-modal";




const SetupPage = () => {

  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();


   const  onOpen = useStoreModal((state) => state.onOpen);
   const  isOpen = useStoreModal((state) => state.isOpen);

   useEffect(() => {
    if (!isOpen) {
        onOpen();
    }

   },[isOpen, onOpen
    
   ]);


  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in'); 
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded || !isSignedIn) return null; 

  return (
    <div  className='p-4'>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}


export default SetupPage;