'use client'
import { signin, signup } from "@/services/operations/auth";
import { useRef, useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, MessageCircle } from 'lucide-react';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AuthPage({isSignin}:{isSignin: boolean}){
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        const username = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        setIsLoading(true);
        
        try {
            if(!isSignin){
                const response = await signup({username, email, password})
                console.log("Response, signup", response)
                if(!response){
                    return;
                }
                toast.success("You're signup");
                router.push("/signin");
            }else if(isSignin){
                const response = await signin({email, password});
                console.log("response", response);
                if(!response){
                    return;
                }
                toast.success("You're signin");
                router.push("/dashboard");
            }
        } catch (error) {
            console.error('Auth error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
            
            <div className="relative max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center items-center space-x-2 mb-6">
                        <MessageCircle className="h-12 w-12 text-blue-500" />
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ChatFlow
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {isSignin ? 'Welcome back' : 'Create your account'}
                    </h2>
                    <p className="text-gray-400">
                        {isSignin 
                            ? 'Sign in to continue to your dashboard' 
                            : 'Join thousands of users already chatting'
                        }
                    </p>
                </div>

                {/* Form */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 shadow-2xl">
                    <div className="space-y-6">
                        {/* Username field - only for signup */}
                        {!isSignin && (
                            <div className="space-y-2">
                                <label htmlFor="username" className="text-sm font-medium text-gray-300">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        ref={nameRef}
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    ref={emailRef}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    ref={passwordRef}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-12 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={handleClick}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <span>{isSignin ? "Sign In" : "Create Account"}</span>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-800 text-gray-400">
                                    {isSignin ? "Don't have an account?" : "Already have an account?"}
                                </span>
                            </div>
                        </div>

                        {/* Switch auth mode */}
                        <div className="text-center">
                            <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                                {isSignin ? "Sign up for free" : "Sign in instead"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-400">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    )
}