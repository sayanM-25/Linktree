"use client";

import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

const Generate = () => {
  const searchParams = useSearchParams();

  const [links, setLinks] = useState([{ linktext: "", link: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  const handleChange = (index, linktext, link) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { linktext, link };
        } else {
          return item;
        }
      });
    });
  };

  const add_link = () => {
    setLinks(links.concat([{ linktext: "", link: "" }]));
  };

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links,
      handle: handle,
      pic: pic,
      desc: desc,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch("http://localhost:3000/api/generate", requestOptions);
    const result = await r.json();

    if (result.success) {
      toast.success(result.message);
      setLinks([]);
      setPic("");
      setHandle("");
    } else {
      toast.error(result.message);
    }
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
            {links &&
              links.map((item, index) => {
                return (
                  <div key={index} className="mx-4">
                    <input
                      value={item.linktext}
                      onChange={(e) => {
                        handleChange(index, e.target.value, item.link);
                      }}
                      type="text"
                      className="px-4 py-2 my-2 bg-white focus:outline-white rounded-full"
                      placeholder="Enter link text"
                    />
                    <input
                      value={item.link}
                      onChange={(e) => {
                        handleChange(index, item.linktext, e.target.value);
                      }}
                      type="text"
                      className="px-4 py-2 mx-2 my-2 bg-white focus:outline-white rounded-full"
                      placeholder="Enter link "
                    />
                  </div>
                );
              })}
            <button
              onClick={() => {
                add_link();
              }}
              className="p-5 py-2 mx-2 w-fit my-5 bg-[#254f1c] text-white font-bold rounded-3xl"
            >
              + Add link
            </button>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step-3: Add a picture and Description
            </h2>
            <div className="mx-4 flex flex-col">
              <input
                value={pic || ""}
                onChange={(e) => {
                  setPic(e.target.value);
                }}
                type="text"
                className="px-4 py-2 my-2 bg-white focus:outline-white rounded-full"
                placeholder="Enter link to your picture"
              />
              <input
                value={desc || ""}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                type="text"
                className="px-4 py-2 my-2 bg-white focus:outline-white rounded-full"
                placeholder="Enter description"
              />
              <button
                disabled={pic == "" || handle == "" || links[0].linktext == ""}
                onClick={() => {
                  submitLinks();
                }}
                className="disabled:bg-slate-500 p-5 py-2 mx-2 w-fit my-5 bg-[#254f1c] text-white font-bold rounded-3xl"
              >
                Create your linkTree
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
