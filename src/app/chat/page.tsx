"use client";

import CustomMarkdown from "@/components/CustomMarkdown";
import { CircularProgress } from "@nextui-org/react";
import React, { memo, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Chat = {
  text: string;
  isFromSender: boolean;
};

const ChatBotContent = memo(function ChatBotContent({
  content,
}: {
  content: string;
}) {
  return (
    <Suspense>
      <CustomMarkdown source={content} />
    </Suspense>
  );
});

export default function ChatPage(): React.ReactElement {
  const [chats, setChats] = useState<Chat[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatboxRef.current) {
      console.log("Scroll height " + chatboxRef.current?.scrollHeight);
      console.log("Height " + chatboxRef.current?.offsetHeight);
    }
  }, [chats]);

  return (
    <main className="flex flex-col overflow-hidden h-screen pt-20">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{
              type: "tween",
              ease: ["easeIn", "easeOut"],
              duration: 0.4,
            }}
            className="flex-1 flex flex-col justify-center items-center"
            exit={{ opacity: 0 }}
          >
            <h1 className="mx-auto text-center text-4xl font-semibold leading-10">
              Hi! How can <span className="text-colorPrimary">Lexicon</span>{" "}
              help you?
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showWelcome && (
          <motion.div
            ref={chatboxRef}
            onScroll={(event) => {
              if (
                event.currentTarget.scrollTop ==
                (chatboxRef.current?.scrollHeight ?? 0) -
                  (chatboxRef.current?.offsetHeight ?? 0)
              ) {
                console.log("Last Position " + event.currentTarget.scrollTop);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "tween",
              ease: ["easeIn", "easeOut"],
              delay: 0.4,
            }}
            className="flex-1 px-72 py-9 space-y-6 overflow-scroll"
          >
            {chats.map((chat, index) => {
              if (chat.isFromSender) {
                return (
                  <div key={index} className="flex justify-end items-end">
                    <p className="p-4 bg-colorSecondaryBackground text-gray-900 rounded-xl flex justify-end max-w-md">
                      {chat.text}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="flex flex-row gap-4 justify-start items-start"
                  >
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
                    <div className="flex flex-col gap-2">
                      <ChatBotContent content={chat.text} />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mt-6 p-3 border-1 border-colorBorder rounded-lg w-fit"
                      >
                        <h3 className="text-textGray40 text-xs font-normal">
                          Source:
                        </h3>
                        <a
                          href="https://google.com"
                          target="_blank"
                          className="underline underline-offset-2 text-colorPrimary font-bold text-sm hover:opacity-85"
                        >
                          Amri Zalva - Individu
                        </a>
                      </motion.div>
                    </div>
                  </div>
                );
              }
            })}
            {loading && (
              <div className="flex flex-row gap-4 items-center w-fit bg-slate-50 px-4 py-2 rounded-xl">
                <CircularProgress size="sm" />
                <h5 className="text-sm font-semibold text-textGrayBold">
                  Generating Responses...
                </h5>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-72 w-full">
        <div className="relative mb-24">
          <input
            className="w-full border-1 px-4 py-2 text-base rounded-lg placeholder:text-base placeholder:font-light shadow-sm outline-colorPrimary"
            type="text"
            name="message"
            id="message"
            value={query}
            autoComplete="off"
            onInput={(event) => {
              setQuery(event.currentTarget.value);
            }}
            placeholder="Message Chatbot"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                setLoading(true);
                setShowWelcome(false);

                const newChats = [
                  ...chats,
                  {
                    text: query,
                    isFromSender: true,
                  },
                ];
                setChats(newChats);

                setQuery("");

                setTimeout(() => {
                  setLoading(false);
                  setChats([
                    ...newChats,
                    {
                      text: "This is the result",
                      isFromSender: false,
                    },
                  ]);
                }, 3000);
              }
            }}
          />
          <button
            className="absolute right-3 top-0 bottom-0 hover:opacity-85 transition-all duration-200"
            onClick={() => {
              setLoading(true);
              setShowWelcome(false);

              const newChats = [
                ...chats,
                {
                  text: query,
                  isFromSender: true,
                },
              ];
              setChats(newChats);

              setQuery("");

              setTimeout(() => {
                setLoading(false);
                setChats([
                  ...newChats,
                  {
                    text: "This is the result",
                    isFromSender: false,
                  },
                ]);
              }, 3000);
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
