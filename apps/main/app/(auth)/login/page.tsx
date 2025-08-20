'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import encryptPassword from '@/utils/password-encryption';
import { toast } from 'sonner';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    const encryptedPassword = encryptPassword(data.password);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: encryptedPassword,
        callbackUrl: '/platform',
      });

      if (!res) {
        toast.error('Unexpected error. Please try again.');
      } else if (res.ok && res.url) {
        toast.success('LoggedIn successfully');
        router.push(res.url);
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: 'https://main-whilter-ai.netlify.app/auth/callback',
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-500">Welcome back!</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
                message: 'Please enter a valid email address.',
              },
            })}
            className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters.',
                },
              })}
              className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900 pr-10"
            />
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              className="!absolute top-1/2 right-4 -translate-y-1/2"
              aria-label="toggle password visibility"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-medium py-2 rounded-full ${loading
            ? 'bg-[#324e9f] cursor-not-allowed'
            : 'bg-[#1E3A8A] hover:bg-[#1C3074]'

            }`}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: 'white' }} />
          ) : (
            'Login'
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-sm text-gray-500">Continue with</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Login */}
      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
      // onClick={() => signIn('google')}
      onClick={handleGoogleLogin}
       >
        <FcGoogle className="text-xl" />
        <span className="text-sm font-medium text-gray-500">
          Login with Google
        </span>
      </button>
    </div>
  );
}
