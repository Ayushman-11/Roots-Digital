import React from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { Hero } from "../../sections/Hero";
import { Services } from "../../sections/Services";
import { HowWeWork } from "../../sections/HowWeWork";
import { About } from "../../sections/About";
import { Contact } from "../../sections/Contact";

export const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-white to-dark-50">
            <Navbar />
            <main className="pt-24 md:pt-28">
                <Hero />
                <Services />
                <HowWeWork />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};
