import { useRef, useState, useEffect } from "react";
import { validateFormData } from "../Utils/Validate";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { addUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const auth = getAuth();

    // Listen to auth state changes and redirect to browse if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(addUser({ email: user.email, uid: user.uid }));
                navigate('/browse');
            }
        });
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFormRender = () => {
        setIsSignup(!isSignup);
        setErrorMessage(null);
    }

    const handleFormSubmit = () => {
        setIsLoading(true);
        setErrorMessage(null);
        const message = validateFormData({email: email.current.value, password: password.current.value});

        if(message == null) {
            if(isSignup) {
                createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    dispatch(addUser({email: user.email, uid: user.uid}));
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    setErrorMessage(error.message);
                    setIsLoading(false);
                  });
            } else {
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if(user) dispatch(addUser({email: user.email, uid: user.uid}));
                    setIsLoading(false);
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                    setIsLoading(false);
                });
            }
        } else {
            setErrorMessage(message);
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
            {/* Header */}
            <nav className="flex items-center justify-between px-8 py-6">
                <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                    CINEPHILE
                </h1>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    {/* Form Card */}
                    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8 md:p-10 animate-fade-in">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-3xl font-black text-white mb-2">
                                {isSignup ? "Create Account" : "Welcome Back"}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {isSignup ? "Join CINEPHILE today" : "Sign in to continue"}
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            {/* Name Field (Sign Up Only) */}
                            {isSignup && (
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Full Name</label>
                                    <div className="relative">
                                        <i className='bx bx-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg'></i>
                                        <input
                                            ref={name}
                                            className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                                            type="text"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Email Address</label>
                                <div className="relative">
                                    <i className='bx bx-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg'></i>
                                    <input
                                        ref={email}
                                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Password</label>
                                <div className="relative">
                                    <i className='bx bx-lock-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg'></i>
                                    <input
                                        ref={password}
                                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/50">
                                    <i className='bx bx-error-circle text-red-500 text-xl'></i>
                                    <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={handleFormSubmit}
                                disabled={isLoading}
                                className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <i className='bx bx-loader-alt animate-spin text-lg'></i>
                                        <span>Please wait...</span>
                                    </>
                                ) : (
                                    <span>{isSignup ? "Create Account" : "Sign In"}</span>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-5">
                            <div className="flex-1 h-px bg-gray-700"></div>
                            <span className="text-gray-500 text-xs uppercase tracking-wider">OR</span>
                            <div className="flex-1 h-px bg-gray-700"></div>
                        </div>

                        {/* Toggle Sign In/Sign Up */}
                        <div className="text-center">
                            {!isSignup ? (
                                <p className="text-gray-400 text-sm">
                                    New to CINEPHILE?{' '}
                                    <button
                                        onClick={handleFormRender}
                                        className="text-red-500 hover:text-red-400 font-semibold hover:underline transition-colors duration-200"
                                    >
                                        Create an account
                                    </button>
                                </p>
                            ) : (
                                <p className="text-gray-400 text-sm">
                                    Already have an account?{' '}
                                    <button
                                        onClick={handleFormRender}
                                        className="text-red-500 hover:text-red-400 font-semibold hover:underline transition-colors duration-200"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            )}
                        </div>

                        {/* Features */}
                        <div className="mt-6 pt-6 border-t border-gray-800">
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div className="group">
                                    <div className="bg-gradient-to-br from-red-600/10 to-red-500/5 rounded-lg p-3 border border-red-500/20 transition-all duration-300 group-hover:border-red-500/40 group-hover:from-red-600/20 group-hover:to-red-500/10">
                                        <i className='bx bx-movie-play text-red-500 text-2xl mb-1'></i>
                                        <p className="text-white text-xs font-semibold">Movies</p>
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="bg-gradient-to-br from-red-600/10 to-red-500/5 rounded-lg p-3 border border-red-500/20 transition-all duration-300 group-hover:border-red-500/40 group-hover:from-red-600/20 group-hover:to-red-500/10">
                                        <i className='bx bx-tv text-red-500 text-2xl mb-1'></i>
                                        <p className="text-white text-xs font-semibold">TV Shows</p>
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="bg-gradient-to-br from-red-600/10 to-red-500/5 rounded-lg p-3 border border-red-500/20 transition-all duration-300 group-hover:border-red-500/40 group-hover:from-red-600/20 group-hover:to-red-500/10">
                                        <i className='bx bx-search-alt text-red-500 text-2xl mb-1'></i>
                                        <p className="text-white text-xs font-semibold">AI Search</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;