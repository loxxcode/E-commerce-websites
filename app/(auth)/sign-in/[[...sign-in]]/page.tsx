'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <SignIn
          path="/sign-in"        // must match folder name
          routing="path"         // uses path-based routing
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}
