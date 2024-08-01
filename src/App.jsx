import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const Home = () => {
  return (
    <>
      <Navbar />
      <Template page="Home" />
    </>
  );
};
const Dashboard = () => {
  return (
    <>
      <div className="bg-slate-800 h-screen flex items-center justify-center text-white text-2xl">
        <div className="absolute right-0 top-0 p-5">
          <UserButton />
        </div>
        <h1>Dashboard</h1>
      </div>
    </>
  );
};

const Template = ({ page }) => {
  return (
    <div className="bg-slate-800 h-screen flex items-center justify-center">
      <h1 className="text-3xl text-white font-bold">{page}</h1>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="bg-slate-800 h-16 flex justify-between p-5 text-white">
      <h1 className="text-2xl text-white font-bold">Logo</h1>
      <a href="/signin" className="text-2xl text-white font-bold">
        SignIn
      </a>
    </div>
  );
};

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin/*"
          element={
            <>
              <div className="bg-slate-800 h-screen flex items-center justify-center text-white flex-col">
                <SignIn
                  routing="path"
                  path="/signin"
                  signUpUrl="/signup"
                  afterSignOutUrl="/dashboard"
                  forceRedirectUrl="/dashboard"
                />
                <a href="/" className="mt-5 bg-slate-600 p-3 rounded-md">
                  Back to home
                </a>
              </div>
            </>
          }
        />
        <Route
          path="/signup/*"
          element={
            <>
              <div className="bg-slate-800 h-screen flex items-center justify-center text-white flex-col">
                <SignIn
                  routing="path"
                  path="/signin"
                  signUpUrl="/signup"
                  afterSignOutUrl="/dashboard"
                />
                <SignUp routing="path" path="/signup" signInUrl="/signin" />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <Navigate to="/signin" />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}
