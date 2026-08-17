import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main className="flex min-h-screen  mx-auto max-w-[500px] items-center justify-center bg-[#121212] px-4 text-white">
      <div className="w-[90%] max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
        <div className="mb-6 text-7xl font-black tracking-tight text-red-400">404</div>

        <h1 className="text-3xl font-bold sm:text-4xl">Page not found</h1>

        <p className="mt-4 text-base text-slate-300 sm:text-lg">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
          >
            Go to home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
};

export default Error;
