export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
            <h1 className="text-4xl font-bold mb-4 text-dracula-purple">
                Welcome to Online Learning Platform
            </h1>
            <p className="text-lg mb-6 text-dracula-comment">
                Join us as an Admin, Instructor, or Student!
            </p>
            <div className="flex space-x-4">
                <a
                    href="/auth/signup"
                    className="px-6 py-2 bg-dracula-green text-dracula-background rounded hover:bg-dracula-cyan"
                >
                    Sign Up
                </a>
                <a
                    href="/auth/login"
                    className="px-6 py-2 bg-dracula-pink text-dracula-background rounded hover:bg-dracula-purple"
                >
                    Log In
                </a>
            </div>
        </div>
    );
}
