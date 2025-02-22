"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import Link from "next/link";
import Image from "next/image";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useCountDown } from "@/hooks/use-countdown";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifyLoginSchema as formSchema } from "@/schema/auth";
import { client_login } from "@/actions/auth/login";
import { toast } from "sonner";
import { getOtp } from "@/actions/auth";
import NextForm from "next/form";
import { useFormStatus } from "react-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [ref] = useAutoAnimate();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [step, setStep] = React.useState<"otp" | "verify">("otp");
  const [emailValid, seEmailValid] = React.useState(false);
  const [timeLeft, { start, format, reset, pause, resume }] = useCountDown(
    60 * 1000 * 10
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });
  const email = form.watch("email");

  const [message, setMessage] = React.useState<string | undefined>(undefined);

  const [state, action, pending] = React.useActionState(
    client_login,
    undefined
  );

  React.useEffect(() => {
    setMessage(state?.message);
  }, [state]);

  form.watch(() => {
    setMessage(undefined);
  });

  React.useEffect(() => {
    if (email) {
      form.trigger("email").then((isValid) => {
        seEmailValid(isValid);
      });
    }
  }, [email, form]);

  React.useEffect(() => {
    if (timeLeft <= 0 && step === "verify") {
      pause();
      reset();
      setStep("otp");
      form.resetField("otp");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const otpPromise = () =>
    new Promise(async (resolve, reject) => {
      pause();
      const res = await getOtp(email);

      if (res?.status === true) {
        setStep("verify");
        reset();
        start();
        resolve(res);
      } else {
        resume();
        reject(res);
      }
    });

  async function otpClicked() {
    if (!emailValid) return;
    toast.promise(otpPromise, {
      loading: "Loading...",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      success: (data: any) => {
        return data?.message ?? "OTP request successfull";
      },
      error: (data: any) => {
        return (
          data?.message ??
          "Oops! an error occured while completing your request"
        );
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <Link
              href='/'
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='flex items-center justify-center pb-8'>
                <Image
                  src='/assets/KMC-logo-light.png'
                  alt='KMC Logo'
                  width={200}
                  height={80}
                  className='h-8 w-auto'
                />
              </div>
              <span className='sr-only'>Kingdom Millionaire Conference</span>
            </Link>
            <h1 className='text-xl font-bold'>Welcome Back</h1>
            <div className='text-center text-sm'>
              Don&apos;t have an account? Contact the admin.
            </div>
          </div>
          <Form {...form}>
            <form action={action} className='space-y-8'>
              <div ref={ref} className='flex flex-col gap-3'>
                {message && (
                  <p className='text-sm font-medium text-destructive'>
                    {message}
                  </p>
                )}

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl className='w-full'>
                        <Input
                          placeholder='m@example.com'
                          {...field}
                          name='email'
                          type='email'
                          className='w-full'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {step !== "otp" && (
                  <FormField
                    control={form.control}
                    name='otp'
                    render={({ field }) => (
                      <FormItem>
                        <label className='text-sm font-normal'>
                          One-Time Password
                        </label>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                            inputMode='text'
                            {...field}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot className='p-4 size-14' index={0} />
                              <InputOTPSlot className='p-4 size-14' index={1} />
                              <InputOTPSlot className='p-4 size-14' index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot className='p-4 size-14' index={3} />
                              <InputOTPSlot className='p-4 size-14' index={4} />
                              <InputOTPSlot className='p-4 size-14' index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {step === "verify" && (
                <SubmitButton
                  pending={form.formState.isSubmitting || pending}
                />
              )}

              {step === "otp" && (
                <Button
                  type='button'
                  disabled={!emailValid}
                  onClick={otpClicked}
                  className='py-4 h-auto rounded-full font-semibold w-full'
                >
                  Send OTP
                </Button>
              )}

              {step === "verify" ? (
                timeLeft >= 1 ? (
                  <div
                    key='resend-countdown'
                    className='text-center mt-3 text-sm text-gray-500'
                  >
                    <p>
                      Resend in{" "}
                      <NumberFlow
                        trend={-1}
                        value={format.displayMinutes}
                        format={{ minimumIntegerDigits: 2 }}
                      />
                      :
                      <NumberFlow
                        trend={-1}
                        value={format.displaySeconds}
                        format={{ minimumIntegerDigits: 2 }}
                      />
                    </p>
                  </div>
                ) : (
                  <Button
                    type='button'
                    disabled={!emailValid}
                    onClick={otpClicked}
                    className='py-4 h-auto rounded-full font-semibold w-full'
                    variant='secondary'
                  >
                    Resend
                  </Button>
                )
              ) : null}
            </form>
          </Form>
        </div>
      </div>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  '>
        By clicking continue, you agree to our{" "}
        <Link href='#'>Terms of Service</Link> and{" "}
        <Link href='#'>Privacy Policy</Link>.
      </div>
    </div>
  );
}

function SubmitButton({ pending: pendingProp }: { pending: boolean }) {
  const status = useFormStatus();

  const pending = status.pending || pendingProp;

  return (
    <Button
      disabled={pending}
      className='py-4 h-auto rounded-full font-semibold w-full'
    >
      <span className='data-[active=true]:opacity-0' data-active={pending}>
        Login
      </span>

      {pending && (
        <div
          role='status'
          className='absolute w-full h-full grid place-content-center'
        >
          <svg
            aria-hidden='true'
            className='size-5 animate-spin fill-white text-[#ffffff]/50'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </Button>
  );
}
