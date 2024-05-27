"use client";

import Link from "next/link";

interface errorProps {
  error: Error;
  reset: () => void;
}

export default function error({ error, reset }: errorProps) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen">
      <h2 className="text-3xl">Alguma coisa deu errado :(</h2>
      <div className="flex gap-4 text-light font-bold">
        <button
          onClick={() => reset()}
          className="bg-primary w-full p-4 rounded-lg text-center"
        >
          Tentar Novamente
        </button>
        <Link href={"/"} legacyBehavior>
          <a className="bg-secondary p-4 rounded-lg w-full text-center">
            {" "}
            Voltar ao Início{" "}
          </a>
        </Link>
      </div>
    </div>
  );
}
