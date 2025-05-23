"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-medium">Что-то пошло не так.</h2>

      <Button variant="secondary" asChild>
        <Link href="/">Главная страница</Link>
      </Button>

      <Button variant="primary" onClick={() => reset()}>
        Попробуйте еще раз
      </Button>
    </div>
  );
};

export default Error;
