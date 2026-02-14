'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <SignUp
          path="/sign-up"          // must match folder
          routing="path"           // uses path-based routing
          signInUrl="/sign-in"     // link back to login
          afterSignUpUrl="/"       // redirect to protected page after signup
        />
      </div>
    </div>
  );
}
