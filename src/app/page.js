// import Input from "@/components/input";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
