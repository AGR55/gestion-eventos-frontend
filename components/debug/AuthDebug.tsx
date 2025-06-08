"use client";

import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthDebug() {
  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const currentSession = await getSession();
        setSessionData(currentSession);
      } catch (error) {
        console.error("Error getting session:", error);
      }
    };

    fetchSession();
  }, [session]);

  const clearSession = () => {
    // No podemos limpiar la sesión de NextAuth desde aquí
    // El usuario tendría que hacer signOut()
    alert("Para cerrar sesión, usa el botón de logout de la aplicación");
  };

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed top-4 left-4 bg-gray-800 p-4 rounded-lg text-white text-xs max-w-lg max-h-96 overflow-auto z-50">
      <h3 className="font-bold mb-2">NextAuth Debug:</h3>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-yellow-400">Session Status:</h4>
          <p>{status}</p>
        </div>

        <div>
          <h4 className="font-semibold text-blue-400">
            Session Data (useSession):
          </h4>
          <pre className="text-xs overflow-auto max-h-32">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div>
          <h4 className="font-semibold text-green-400">
            Session Data (getSession):
          </h4>
          <pre className="text-xs overflow-auto max-h-32">
            {JSON.stringify(sessionData, null, 2)}
          </pre>
        </div>

        <div>
          <h4 className="font-semibold text-purple-400">Auth Status:</h4>
          <p>Authenticated: {session ? "Yes" : "No"}</p>
          <p>Has User: {session?.user ? "Yes" : "No"}</p>
          <p>Has Access Token: {session?.accessToken ? "Yes" : "No"}</p>
          {session?.accessToken && (
            <p>Token Length: {(session.accessToken as string).length}</p>
          )}
        </div>

        <Button
          onClick={clearSession}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          Info about logout
        </Button>
      </div>
    </div>
  );
}
