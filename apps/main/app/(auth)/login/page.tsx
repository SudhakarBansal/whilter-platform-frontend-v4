'use client';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded p-2 mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded p-2 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
