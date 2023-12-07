import { useState } from "react";
import OpenAI from "openai";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompts, setPrompts] = useState({
    question: "",
    answer: "",
  });

  const codeKey = ["code", "kode", "codingan", "kodingan", "script", "javascript"];
  const keys = Object.keys(prompts.answer);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_MY_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleChatBox = async () => {
    setIsLoading(true);

    await openai.chat.completions
      .create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON.",
          },
          { role: "user", content: prompts.question },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      })
      .then((res) => {
        setPrompts((prev) => ({
          ...prev,
          answer: JSON.parse(res.choices[0].message.content),
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex flex-col justify-between min-h-screen">
        {prompts.answer ? (
          <div>
            <div className="p-5">
              <div className="flex gap-3">
                <img
                  src={"https://www.vickyadrii.my.id/_astro/me.cb19b02c.png"}
                  alt="ic_profile"
                  className="w-7 h-7 rounded-full border-white"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold">You</h3>
                  <p className="flex-1">{prompts?.question}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex gap-3">
                <img
                  src={"https://chatgptaihub.com/wp-content/uploads/2023/06/ChatGPT-logo-with-color-Background.png"}
                  alt="ic_profile"
                  className="w-7 h-7 rounded-full border-white"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">ChatGPT</h3>
                  {!codeKey.includes(keys[0]) ? (
                    <p className="flex-1">
                      {prompts?.answer?.response ??
                        prompts?.answer?.message ??
                        prompts?.answer?.error ??
                        prompts?.answer?.output ??
                        prompts?.answer?.greeting ??
                        prompts?.answer?.result}
                    </p>
                  ) : (
                    <div className="w-full">
                      <SyntaxHighlighter
                        language="javascript"
                        style={atomDark}
                        customStyle={{
                          width: "100%",
                        }}
                        useInlineStyles={{
                          innerWidth: "100%",
                        }}
                      >
                        {prompts?.answer?.code ??
                          prompts?.answer?.kode ??
                          prompts?.answer?.script ??
                          prompts?.answer?.javascript ??
                          prompts?.answer?.codingan}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex justify-center p-5 items-end">
          <div className="flex flex-col gap-4 w-full">
            <textarea
              onBlur={(event) =>
                setPrompts((prev) => ({
                  ...prev,
                  question: event.target.value,
                }))
              }
              className="border-[0.5px] border-white/50 pt-5 px-5 resize-none bg-transparent rounded-2xl outline-none"
              placeholder="Message ChatGPT..."
            />

            <button
              onClick={handleChatBox}
              className="py-3.5 rounded-xl bg-gray-900 hover:bg-gray-950 focus:ring focus:ring-slate-600 shadow-sm outline-none transition-all"
            >
              {isLoading ? (
                <div className="flex justify-center animate-spin">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      opacity="0.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.17049 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C8.14348 3 6.36301 3.7375 5.05025 5.05025C3.7375 6.36301 3 8.14348 3 10C3 11.8565 3.7375 13.637 5.05025 14.9497C6.36301 16.2625 8.14348 17 10 17ZM10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20Z"
                      fill="white"
                    />
                    <path
                      d="M0 10C0 4.477 4.477 0 10 0V3C8.14348 3 6.36301 3.7375 5.05025 5.05025C3.7375 6.36301 3 8.14348 3 10H0Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
