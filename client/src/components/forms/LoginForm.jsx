import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "@/services/usersApi";
import { useDispatch } from "react-redux";
import { setCredential } from "@/features/authSlice/AuthSlice";
import { useState } from "react";

export function LoginForm() {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { register, handleSubmit, reset } = useForm();
  const [formSuccess, setFormSuccess] = useState("");
  const [error, setError] = useState("");

  const formSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      setFormSuccess("Login successful 🎉 Redirecting...");
      dispatch(setCredential(res));
    } catch (error) {
      setError(error?.data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    reset();
  };
  return (
    <div className="max-w-sm mx-auto py-10 px-2 ">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome to ExpanseTracker</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                {error && (
                  <p className="text-center text-red-700 font-medium py-2">
                    {error}
                  </p>
                )}
                {formSuccess && (
                  <p className="text-center text-green-700 font-medium py-2">
                    {formSuccess}
                  </p>
                )}
                <div className="grid gap-6">
                  <div className="grid gap-3 relative">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="prince@gmail.com"
                      className="ps-8"
                      {...register("email", { required: "email is required" })}
                    />
                    <Mail className="absolute h-4 w-4 top-9 left-2 text-slate-700" />
                  </div>
                  <div className="grid gap-3 relative">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="*****"
                      className="ps-8"
                      {...register("password", {
                        required: "password is required",
                      })}
                    />
                    <LockKeyhole className="absolute h-4 w-4 top-10 left-2 text-slate-700" />
                  </div>
                  <Button type="submit" className="w-full bg-[#096b92]">
                    {isLoading ? "Logging In..." : "Login"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
