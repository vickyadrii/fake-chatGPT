import { useState } from "react";
import OpenAI from "openai";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const codeKey = ["code", "kode", "codingan", "kodingan", "script", "javascript"];
  const keys = Object.keys(prompts.answer);

  const [prompts, setPrompts] = useState({
    question: "",
    answer: "",
  });

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_MY_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleChatBox = async () => {
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
        console.log(res.choices[0].message.content);
        setPrompts((prev) => ({
          ...prev,
          answer: JSON.parse(res.choices[0].message.content),
        }));
      })
      .catch((err) => console.log(err));
  };

  console.log(keys[0]);

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
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomDark}
                      customStyle={{
                        color: "black",
                      }}
                    >
                      {prompts?.answer?.code ??
                        prompts?.answer?.kode ??
                        prompts?.answer?.script ??
                        prompts?.answer?.javascript ??
                        prompts?.answer?.codingan}
                    </SyntaxHighlighter>
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
              className="py-3 rounded-xl bg-gray-900 hover:bg-gray-950 focus:ring focus:ring-slate-600 shadow-sm outline-none transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
