"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  token: z
    .string()
    .min(3, { message: "Ключ має містити не менше аніж 15 символів" })
    .max(25, { message: "Ключ має містити не більше аніж 25 символів" }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { token: "" },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    data
  ): Promise<void> => {
    console.log(data);
    const result = await signIn("credentials", {
      token: data.token,
      redirect: false,
    });
    console.log(result);
    if (result?.error) {
      form.setError("token", {
        type: "manual",
        message:
          "Перевірте ключ, та спробуйте ще раз. Або напищіть мені в соц. мережі.",
      });
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center space-y-8 h-screen">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 rounded bg-neutral-100 dark:bg-neutral-900"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Ключ доступа</FormLabel>
                <FormControl>
                  <Input autoComplete="fasle" {...field} />
                </FormControl>
                <FormDescription>
                  Введіть ключ доступа який вам надав фотограф.
                </FormDescription>
                {form.formState.isSubmitting && (
                  <Loader
                    className="mx-auto animate-[spin_3s_linear_infinite]"
                    size={40}
                  />
                )}
                <FormMessage className="p-4 text-red-400 w-fit bg-neutral-200 dark:bg-neutral-800" />
              </FormItem>
            )}
          />
          <Button
            className="font-medium tracking-widest uppercase"
            type="submit"
          >
            Увійти
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Login;
