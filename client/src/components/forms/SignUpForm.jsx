import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Mail, MoveLeft, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from "@/services/usersApi";
import { useState } from "react";

const Schema = yup.object({
  userName: yup.string().required("userName is required"),
  email: yup.string().email("Invalid email").required("email is required"),
  password: yup.string().min(6, "must be at least 6 digit long").required("password is required"),
});

const SignUpForm = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      setSuccess(res.message);
      navigate("/login");
    } catch (error) {
      setError(error?.data?.message);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-10">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <Link to="/login">
              <CardDescription className="flex items-center gap-2 my-2">
                <MoveLeft /> Back to sign in
              </CardDescription>
            </Link>
            <CardTitle className="text-xl">Create your account</CardTitle>
            {error && <p className="text-center font-medium text-red-700 py-2">{error}</p>}
            {success && <p className="text-center font-medium text-green-700 py-2">{success}</p>}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-3 relative">
                  <Label htmlFor="userName">Username</Label>
                  <User className="absolute h-4 w-4 top-9 left-2 text-slate-700" />
                  <Input
                    id="userName"
                    type="text"
                    placeholder="prince thakur"
                    className="ps-8"
                    {...register("userName", { required: "userName is required" })}
                  />
                  {errors.userName && <p className="text-sm text-red-700 ">{errors.userName.message}</p>}
                </div>
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
                  {errors.email && <p className="text-sm text-red-700 ">{errors.email.message}</p>}
                </div>
                <div className="grid gap-3 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*****"
                    className="ps-8"
                    {...register("password", { required: "password is required" })}
                  />
                  <LockKeyhole className="absolute h-4 w-4 top-9 left-2 text-slate-700" />
                  {errors.password && <p className="text-sm text-red-700 ">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-[#096b92]">
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpForm;
