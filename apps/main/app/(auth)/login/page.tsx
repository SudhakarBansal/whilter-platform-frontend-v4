'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });

    if (!res) {
      setError('Unexpected error. Please try again.');
    } else if (res.ok && res.url) {
      router.push(res.url);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('Something went wrong. Please try again later.');
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-500">Welcome back!</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#1E3A8A] hover:bg-[#1C3074] text-white font-medium py-3 rounded-full"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-sm text-gray-500">Continue with</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Login Button */}
      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition">
        <FcGoogle className="text-xl" />
        <span className="text-sm font-medium text-gray-500">Login with Google</span>
      </button>

      {/* Register Link */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{' '}
        <a href="#" className="text-blue-700 font-medium hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
