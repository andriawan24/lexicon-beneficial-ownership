"use client";

import CustomMarkdown from "@/components/CustomMarkdown";
import OptionalRendering from "@/components/ui/OptionalRendering";
import { CircularProgress } from "@nextui-org/react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import React, { Suspense, useState } from "react";

export default function ChatPage(): React.ReactElement {
  const [chats, setChats] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  return (
    <main className="flex flex-col overflow-hidden h-screen pt-20">
      <OptionalRendering
        classname="flex-1 flex flex-col justify-center items-center"
        condition={chats.length == 0}
      >
        <h1 className="mx-auto text-center text-4xl font-semibold leading-10">
          Hi! How can <span className="text-colorPrimary">Lexicon</span> help
          you?
        </h1>
      </OptionalRendering>

      <OptionalRendering
        classname="flex-1 px-72 py-9 space-y-6 overflow-scroll"
        condition={chats.length > 0}
      >
        <div className="flex justify-end items-end">
          <p className="p-4 bg-colorSecondaryBackground text-gray-900 rounded-xl flex justify-end max-w-md">
            Tell me about what happen to Isti Su`ilah and her corruption case!
          </p>
        </div>
        <div className="flex flex-row gap-4 justify-start items-start">
          <div className="px-2 py-2 bg-colorSecondaryBackground border border-colorBorder rounded-full">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 20C9.90273 20 12.324 17.9387 12.88 15.2H18.7746L19.0323 12.32H12.7616C12.0351 9.824 9.73055 8 7 8C3.68629 8 1 10.6863 1 14C1 17.3137 3.68629 20 7 20ZM19.6384 12.32L19.3806 15.2H20.9859L21.3644 12.32H19.6384ZM23.2294 15.2H21.7652L22.1437 12.32H23.6079L23.2294 15.2ZM23.9479 15.2H25.0158L25.3942 12.32H24.3264L23.9479 15.2ZM26.4766 15.2H25.979L26.3575 12.32H26.8551L26.4766 15.2ZM26.9201 12.3286L26.8551 12.32H26.9201V12.3286ZM7 17.5999C8.98822 17.5999 10.6 15.9882 10.6 13.9999C10.6 12.0117 8.98822 10.3999 7 10.3999C5.01178 10.3999 3.4 12.0117 3.4 13.9999C3.4 15.9882 5.01178 17.5999 7 17.5999Z"
                fill="#236084"
              />
            </svg>
          </div>
          {/* <div>
            <p className="justify-start max-w-full text-colorPrimaryText leading-7">
              <span className="font-semibold text-xl">Rincian Terdakwa</span>
              <br />
              <span>
                Terdakwa Isti Su`ilah terbukti melakukan tindak pidana korupsi
                sesuai hukum yang berlaku. Menjatuhkan pidana penjara selama 5
                tahun dan tetap ditahan. Memerintahkan Isti Su`ilah untuk
                membayar uang pengganti sebesar Rp737.456.530,00. Menghukum
                denda Rp200.000.000,00 yang dapat diganti dengan pidana penjara
                selama 6 bulan jika tidak dibayar.
              </span>
            </p>
            <div className="mt-6 p-3 border-1 border-colorBorder rounded-lg w-fit">
              <h3 className="text-textGray40 text-xs font-normal">Source:</h3>
              <a
                href="https://google.com"
                target="_blank"
                className="underline underline-offset-2 text-colorPrimary font-bold text-sm hover:opacity-85"
              >
                Amri Zalva - Individu
              </a>
            </div>
          </div> */}
          <div className="flex flex-col gap-2">
            <Suspense>
              <CustomMarkdown
                source={`# Hello World
              ## Markdown Example

              This is a paragraph with **bold** text and *italic* text.

              - Here is a list item
              - Another list item
              
              1. First ordered list item
              2. Second ordered list item

              [Link to Google](https://www.google.com)

              > This is a blockquote.

              `}
              />
            </Suspense>
          </div>
          {/* <div className="flex flex-row gap-4 items-center bg-slate-50 px-4 py-2 rounded-xl">
            <CircularProgress size="sm" />
            <h5 className="text-sm font-semibold text-textGrayBold">
              Generating Responses...
            </h5>
          </div> */}
        </div>
      </OptionalRendering>

      <div className="px-72 w-full">
        <div className="relative mb-24">
          <input
            className="w-full border-1 px-4 py-2 text-base rounded-lg placeholder:text-base placeholder:font-light shadow-sm outline-colorPrimary"
            type="text"
            name="message"
            id="message"
            value={query}
            onInput={(event) => {
              setQuery(event.currentTarget.value);
            }}
            placeholder="Message Chatbot"
          />
          <button
            className="absolute right-3 top-0 bottom-0 hover:opacity-85 transition-all duration-200"
            onClick={() => {
              setChats([query]);
              setQuery("");
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.925 5.025L9.18333 7.70833L2.91667 6.875L2.925 5.025ZM9.175 12.2917L2.91667 14.975V13.125L9.175 12.2917ZM1.25833 2.5L1.25 8.33333L13.75 10L1.25 11.6667L1.25833 17.5L18.75 10L1.25833 2.5Z"
                fill="#6D6D6D"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
