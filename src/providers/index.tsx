import { Toaster } from "@/components/ui/sonner";
import AuthProviders from "./auth-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProviders>
        {children}
        <Toaster
          richColors
          position="top-center"
          theme="light" />
      </AuthProviders>
    </>
  )
}
