"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [type, setType] = useState("Text");
  const [inputBuffer, setInputBuffer] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileBuffer, setFileBuffer] = useState<File | null>(null);
  const [modeBuffer, setModeBuffer] = useState<string>("");
  const [resultBuffer, setResultBuffer] = useState<string>("");

  const switchResultToInput = () => {
    setInputBuffer(resultBuffer);
  };

  useEffect(() => {
    if (fileBuffer) {
      const reader = new FileReader();
      if (fileBuffer.name.split(".").length > 1) {
        setFileName(fileBuffer.name);
      }
      reader.readAsBinaryString(fileBuffer);
      reader.onload = () => {
        const arrBuffer = reader.result as string;
        const binaryString = arrBuffer;
        setInputBuffer(binaryString);
      };
    }
  }, [fileBuffer]);

  return (
    <div className="flex min-w-screen relative min-h-screen flex-col justify-start items-center">
      {/* Background */}
      <div className="flex w-full h-full absolute top-0 left-0 bg-[url('./assets/bg.jpg')] z-[-1]" />

      {/* All Container */}
      <div className="flex min-w-90% min-h-screen flex-col justify-start items-center gap-10 py-10 px-20 bg-[#fafafa]">
        {/* Title Container */}
        <div className="flex flex-col justify-center items-center gap-5">
          {/* Title */}
          <Image src="/logo.png" width={100} height={100} alt="Logo Picture" />
          {/* Title */}
          <div className="font-bold text-3xl">Block Cipher</div>
        </div>

        {/* Content Container */}
        <div className="flex lg:flex-row flex-col justify-center items-center gap-20">
          {/* Input Container */}
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="flex flex-row justify-between w-full gap-10">
              <label className="font-bold text-left text-xl">
                {" "}
                Input Text{" "}
              </label>
              <button
                className="font-bold border-2 border-[#454545] py-2 px-4 rounded-xl hover:bg-[#454545] hover:text-white"
                onClick={() => {
                  type == "Text" ? setType("File") : setType("Text");
                }}
              >
                {" "}
                {type == "Text" ? "Text Input" : "Binary File"}{" "}
              </button>
            </div>

            {type == "Text" ? (
              <textarea
                onChange={(e) => setInputBuffer(e.target.value)}
                className="bg-[#efefef] border-2 border-black min-w-[400px] min-h-[300px] p-[20px] shadow-xl"
                id="input"
                name="input"
                placeholder="Insert your input here ..."
                value={inputBuffer}
              />
            ) : (
              <div className="flex justify-center items-center">
                <input
                  type="file"
                  className="border-2 border-black p-[20px] shadow-xl"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFileBuffer(e.target.files[0]);
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Process Container */}
          <div className="flex flex-col justify-center items-center gap-6">
            {/* Dropdown */}
            <div className="flex flex-col gap-2">
              <p> Choose the desired mode: </p>
              <select
                className="py-2 px-6 border-2 border-[#bfbfbf] hover:bg-[#bfbfbf] focus:bg-[#bfbfbf] cursor-pointer rounded-full hover:text-[#ffffff] focus:text-[#ffffff]"
                name="mode"
                id="mode"
                onChange={(e) => setModeBuffer(e.target.value)}
                value={modeBuffer}
              >
                <option value="ECB">ECB</option>
                <option value="CBC">CBC</option>
                <option value="OFB">OFB</option>
                <option value="CFB">CFB</option>
                <option value="counter">Counter</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-5">
              <button className="text-[#c5b846] border-2 border-[#c5b846] font-bold py-2 px-4 rounded-xl hover:bg-[#c5b846] hover:text-white">
                {" "}
                Encrypt{" "}
              </button>
              <button className="text-[#3290cf] border-2 border-[#3290cf] font-bold py-2 px-4 rounded-xl hover:bg-[#3290cf] hover:text-white">
                {" "}
                Decrypt{" "}
              </button>
            </div>

            {/* Switch Button */}
            <Image
              className="border-2 border-black rounded-full p-3 cursor-pointer hover:bg-[#f1f1f1] shadow-xl"
              src="/circular_arrow.png"
              width={60}
              height={60}
              alt="Switch Button"
              onClick={() => switchResultToInput()}
            />
          </div>

          {/* Result Container */}
          <div className="flex flex-col justify-center items-start gap-4">
            <label className="font-bold text-left text-xl"> Result Text </label>
            <textarea
              readOnly
              className="bg-[#efefef] border-2 border-black min-w-[400px] min-h-[300px] p-[20px] shadow-xl"
              id="input"
              name="input"
              value={resultBuffer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
