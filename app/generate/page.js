"use client";

import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Generate = () => {
  // const notify = () => toast("Wow so easy !");

  const [link, setLink] = useState("");
  const [linktext, setLinktext] = useState("");
  const [handle, setHandle] = useState("");
  const [pic, setPic] = useState("");

  const add_link = async (text, link, handle) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      link: link,
      linktext: text,
      handle: handle,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch("http://localhost:3000/api/generate", requestOptions);
    const result = await r.json();
    toast(result.message);
    setLink("");
    setLinktext("");
  };

  return (
    <div className="bg-[#d2e823] min-h-screen grid grid-cols-2">
      <div className="col1 flex justify-center items-center flex-col text-[#254f1c] ">
        <div className="flex flex-col gap-5 my-8">
          <h1 className="font-bold text-4xl">Create your Linktree</h1>
          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step-1: Claim your handle
            </h2>
            <div className="mx-4">
              <input
                value={handle}
                onChange={(e) => {
                  setHandle(e.target.value);
                }}
                type="text"
                className="px-4 py-2 my-2 bg-white focus:outline-white rounded-full"
                placeholder="Choose a handle"
              />
            </div>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">Step-2: Add your links</h2>
            <div className="mx-4">
              <input
                value={linktext}
                onChange={(e) => {
                  setLinktext(e.target.value);
                }}
                type="text"
                className="px-4 py-2 my-2 bg-white focus:outline-white rounded-full"
                placeholder="Enter link text"
              />
              <input
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                type="text"
                className="px-4 py-2 mx-2 my-2 bg-white focus:outline-white rounded-full"
                placeholder="Enter link "
              />
              <button className="p-5 py-2 mx-2 bg-[#254f1c] text-white font-bold rounded-3xl">
                Add link
              </button>
            </div>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step-3: Add a picture and finalize
            </h2>
            <div className="mx-4 flex flex-col">
              <input
                value={pic}
                onChange={(e) => {
                  setPic(e.target.value);
                }}
                type="text"
                className="px-4 py-2 my-2 bg-white focus:outline-white rounded-full"
                placeholder="Enter link to your picture"
              />
              <button
                onClick={() => {
                  add_link(linktext, link, handle);
                }}
                className="p-5 py-2 mx-2 w-fit my-5 bg-[#254f1c] text-white font-bold rounded-3xl"
              >
                Create your link
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2 w-full h-screen ">
        <img
          src="/generate.webp"
          className="h-full w-full object-cover"
          alt="login_image"
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Generate;
