"use client";
import Login from "@/components/auth/Login";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function RenderLogin() {
  const [selectedLoginMethod, setSelectedLoginMethod] = useState<
    "email" | "phone"
  >("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState({
    countryCode: "NG",
    number: "",
  });

  return (
    <motion.div
      layout
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="w-full flex flex-col items-center py-11 2xl:py-12 @max-2xl:px-6 @max-2xl:py-6 px-16"
    >
      <Login
        asPage
        email={email}
        phone={phone}
        setPhone={setPhone}
        setEmail={setEmail}
        selectedLoginMethod={selectedLoginMethod}
        setSelectedLoginMethod={setSelectedLoginMethod}
      />
    </motion.div>
  );
}
