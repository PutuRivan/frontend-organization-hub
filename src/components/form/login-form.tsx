"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { type TUserLoginSchema, userLoginSchema } from "@/libs/schema";
import { Spinner } from "../ui/spinner";

export default function LoginForm() {
  const form = useForm<TUserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, loading } = useAuth();

  async function onSubmit(values: TUserLoginSchema) {
    login({ email: values.email, password: values.password });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <Card className="w-[480px] shadow-xl border border-gray-200 rounded-3x1 p-9">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          className="pl-10 h-12 text-base"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          className="pl-10 h-12 text-base"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BUTTON */}
              <Button
                className="w-full h-12 text-base"
                type="submit"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Log In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
