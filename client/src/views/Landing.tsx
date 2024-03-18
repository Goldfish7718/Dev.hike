"use client";
import { motion } from "framer-motion";
import { World } from '@/components/ui/globe'
import { globeConfig, sampleArcs } from "@/config/globeConfig";
import { Button } from "@/components/ui/button";
import { ArrowUpRightFromSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function GlobeDemo() {

  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-row items-center justify-center sm:py-20 h-screen md:h-auto dark:bg-[#0c0a09] bg-white relative w-full">
        {/* DESKTOP LANDING WITH GLOBE */}
        <div className="hidden md:block max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4 mt-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="div"
          >
            <h3 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
              Connecting Developers around the world
            </h3>
            <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
              Showcase your journey with Dev.hike. <br />For developers, By Developers.
            </p>
          </motion.div>
          <div className="absolute w-full bottom-0 inset-x-0 h-40 pointer-events-none select-none dark:to-black to-white z-40" />
          <div className="hidden absolute sm:block w-full -bottom-20 h-72 md:h-full z-10">
            <World data={sampleArcs} globeConfig={globeConfig} />;
          </div>
        </div>

        {/* MOBILE LANDING */}
        <div className="md:hidden h-screen flex flex-col items-center justify-center px-4 text-center">
          <h3 className="text-4xl">Connecting Developers around the world</h3>
          <p className="text-neutral-700 dark:text-neutral-200">Showcase your journey with Dev.hike. For developers, By Developers.</p>
          <Button className="w-2/5 my-8" onClick={() => navigate('/sign-up')}>Join Dev.hike <ArrowUpRightFromSquare size={18} className="mx-1" /></Button>
        </div>

      </div>
      <div className="m-4 justify-center hidden sm:flex">
        <Button className="w-2/5" onClick={() => navigate('/sign-up')}>Join Dev.hike <ArrowUpRightFromSquare size={18} className="mx-1" /></Button>
      </div>
    </>
  );
}
