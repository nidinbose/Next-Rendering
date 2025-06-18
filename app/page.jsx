'use client'
import { useEffect } from "react";
import Image from "next/image";
import Landing from "./HomeComponents/Landing";
import AboutSection from "./HomeComponents/about";
import WellnessServices from "./HomeComponents/Services";
import WhyChooseUs from "./HomeComponents/Why";
import RecentBlogs from "./HomeComponents/News";
import ContactPage from "./HomeComponents/Contact";


export default function Home() {
    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div className="">
       <Landing/>
       <AboutSection/>
       <WellnessServices/>
       <WhyChooseUs/>
       <RecentBlogs/>
       <ContactPage/>
    </div>
  );
}
