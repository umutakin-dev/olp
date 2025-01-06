import "./global.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-dracula-background text-dracula-foreground flex flex-col">
                {/* Header */}
                <header className="w-full p-4 bg-dracula-currentLine text-dracula-foreground">
                    <h1 className="text-lg font-bold text-center">
                        Online Learning Platform
                    </h1>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center">
                    {children}
                </main>
            </body>
        </html>
    );
}
