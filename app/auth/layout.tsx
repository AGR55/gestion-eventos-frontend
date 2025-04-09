export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-full">
            <div className="bg-primary-500 flex items-center justify-center">
                <div className="w-full max-w-sm mb-4">
                    <h1 className="text-3xl font-bold text-white">Welcome to the Auth Page</h1>
                    <p>Please sign in to continue</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>
        </section>
    );
}