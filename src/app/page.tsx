"use client"
import { useState } from "react";

export default function Home() {
  const [type, setType] = useState("Text")

  return (
    <div className="flex min-w-screen min-h-screen flex-col bg-[#fafafa] justify-start items-center gap-20 py-10 px-20 ">
      
      {/* Title */}
      <div className="font-bold text-3xl">
        Block Cipher
      </div>

      {/* Content Container */}
      <div className="flex flex-row justify-center items-center gap-20">

        {/* Input Container */}
        <div className="flex flex-col justify-center items-start gap-4">
          <div className="flex flex-row justify-between w-full gap-10">
            <label className="font-bold text-left text-xl"> Input Text </label>
            <button className="font-bold border-2 border-[#454545] py-2 px-4 rounded-xl hover:bg-[#454545] hover:text-white" 
            onClick={() => {type == "Text" ? setType("File") : setType("Text")}}> {type == "Text" ? "Text Input" : "Binary File"} </button>
          </div>
          {
            type == "Text" 
            ? <input className="bg-[#efefef] border-2 border-black min-w-[400px] min-h-[300px] padding-[20px] " type="text" id="input" name="input"/>
            : <div/>
          }
        </div>

        {/* Process Container */}
        <div className="flex flex-col justify-center items-center gap-10">
          <button className="text-[#d33939] border-2 border-[#d33939] font-bold py-2 px-4 rounded-xl hover:bg-[#d33939] hover:text-white"> Encrypt </button>
          <button className="text-[#2dca47] border-2 border-[#2dca47] font-bold py-2 px-4 rounded-xl hover:bg-[#2dca47] hover:text-white"> Decrypt </button>
        </div>

        {/* Result Container */}
        <div className="flex flex-col justify-center items-start gap-4">
          <label className="font-bold text-left text-xl"> Result Text </label>
          <input readOnly className="bg-[#efefef] border-2 border-black min-w-[400px] min-h-[300px] padding-[20px]" type="text" id="input" name="input"/>
        </div>
      </div>
      


    </div>
  );
}
