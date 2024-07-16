import React from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "./button";
import Image from 'next/image';

function Navbar() {
    return (
        <header className="bg-black text-white py-4 px-6 md:px-8 lg:px-10">
            <div className="mx-auto flex items-center justify-between space-x-2">
                <Link href="/" className="font-bold text-[35px] flex items-center">
                    <Image
                        src="/logo/logo1.png" 
                        alt="Logo"
                        width={200}
                        height={200}
                        className="mr-2 mt--9"
                    />
                    {/* <img src="\logo\logo1.png" alt="Logo" width={200} height={200} className="mr-2 mt--9" /> */}
                    {/* Course Scanner */}
                </Link>
            </div>

        </header>

    )
}

export default Navbar