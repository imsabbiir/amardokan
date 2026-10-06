/* eslint-disable react-hooks/purity */
"use client";
import Sec from "../Sec";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
const testimonials = [
  {
    id: 1,
    name: "Rahim Hossain",
    designation: "Online Seller",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
    rating: 5,
    quote:
      "I don't have to worry about keeping products in stock anymore. I can focus on marketing and getting more customers.",
  },
  {
    id: 2,
    name: "Fatima Akter",
    designation: "Facebook Store Owner",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    rating: 5,
    quote:
      "The profit calculator makes it much easier to decide which products are worth selling and how much I should charge.",
  },
  {
    id: 3,
    name: "Shahariyar Hasan",
    designation: "E-commerce Seller",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
    rating: 5,
    quote:
      "From receiving orders to packing and delivery, everything is handled in one place. It saves me a huge amount of time.",
  },
  {
    id: 4,
    name: "Ayesha Karim",
    designation: "Online Business Owner",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop",
    rating: 5,
    quote:
      "I was able to start selling without investing in inventory or setting up my own warehouse. It made starting much easier.",
  },
  {
    id: 5,
    name: "Imran Hossain",
    designation: "Digital Entrepreneur",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop",
    rating: 5,
    quote:
      "Having the products, fulfillment, and delivery handled for me lets me spend more time growing my business.",
  },
];


export function Testimonials() {
  const autoplay = false;
  const [active, setActive] = useState(0);
  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };
  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <Sec id={"testimonials"} title="Built for people who want to sell, not manage warehouses.">
      <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 40
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col justify-between py-4">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold text-ac ">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-fg ">
                {testimonials[active].designation}
              </p>

              <motion.p className="mt-8 text-lg text-fg ">
                <svg
                  className="w-10 h-10 mx-auto mb-3 text-ac"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 14"
                >
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-ac cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5 text-card transition-transform duration-300 group-hover/button:rotate-12 " />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-ac  cursor-pointer"
              >
                <ArrowRight className="h-5 w-5 text-card transition-transform duration-300 group-hover/button:-rotate-12 " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Sec>
  );
}

export default Testimonials;
