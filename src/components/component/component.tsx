"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const BASE_URL = "http://localhost:8080";


const Component = () => {
  const [brandNames, setBrandNames] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState('');
  const [courseNames, setCourseNames] = useState([]);

  // Fetch brand names from backend
  useEffect(() => {
    fetch(`${BASE_URL}/brandnames`)
      .then(response => response.json())
      .then(data => {
        setBrandNames(data.map(item => item.brandname));
      })
      .catch(error => {
        console.error('Error fetching brand names:', error);
      });
  }, []);

  // Fetch course names based on selected brand name
  useEffect(() => {
    if (selectedBrandName) {
      fetch(`${BASE_URL}/names/${selectedBrandName}`)
        .then(response => response.json())
        .then(data => {
          setCourseNames(data.map(item => ({ id: item.id, name: item.name })));
        })
        .catch(error => {
          console.error('Error fetching course names:', error);
        });
    } else {
      setCourseNames([]);
    }
  }, [selectedBrandName]);

  const handleBrandNameChange = (event) => {
    setSelectedBrandName(event.target.value);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-white py-4 px-6 md:px-8 lg:px-10" style={{ backgroundColor: "#0b4251" }}>
        <div className="container mx-auto flex items-center justify-between">
          <Link className="text-xl font-bold" href="#">
            Course Scanner
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#about">About</Link>
            <Link href="#courses">Courses</Link>
            <Link href="#contact">Contact</Link>
          </nav>
          <Button className="md:hidden" variant="outline">
            <MenuIcon className="w-6 h-6" />
          </Button>
        </div>
      </header>
      <main className="flex-1" style={{
        height: '100vh',
        background: 'linear-gradient(to top, #87bbd7, #f2c864, #0b4251)'
      }}>
        <section className="py-12 px-6 md:px-8 lg:px-10">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-4" style={{ textAlign: "center" }}>Find the Best Courses Price</h1>
            <p className="text-lg md:text-xl text-white-600 mb-8" style={{ textAlign: "center" }}>Compare course prices across multiple websites and find the best deal.</p>

            <div className="text-white" style={{ padding: "6rem" }}>
              <div className="mt-4 flex flex-col md:flex-row bg-white justify-between p-2 text-black rounded space-y-4 md:space-y-0">
                <div className="flex flex-col w-full md:w-auto">
                  <label htmlFor="brand-name" className="text-sm" style={{ fontWeight: "bold" }}>
                    Brand Name
                  </label>
                  <select
                    id="brand-name"
                    className="w-full bg-transparent focus:outline-none"
                    value={selectedBrandName}
                    onChange={handleBrandNameChange}
                  >
                    <option value="">Select Brand Name</option>
                    {brandNames.map((brandName, index) => (
                      <option key={index} value={brandName}>
                        {brandName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="border-l border-gray-300 mx-4 hidden md:block"></div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <label htmlFor="course-name" className="text-sm" style={{ fontWeight: "bold" }}>
                    Course Name
                  </label>

                  <select
                    id="course-name"
                    className="w-full bg-transparent focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Select Course Name</option>
                    {courseNames.map(option => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="border-l border-gray-300 mx-4 hidden md:block"></div>
                <div className="flex flex-col w-full md:w-auto">
                  <label htmlFor="start-date" className="text-sm" style={{ fontWeight: "bold" }}>
                    Preferred date
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>

                <div className="border-l border-gray-300 mx-4 hidden md:block"></div>
                <div className="flex flex-col w-full md:w-auto">
                  <label htmlFor="region-name" className="text-sm" style={{ fontWeight: "bold" }}>
                    Region
                  </label>
                  <select
                    id="region-name"
                    className="w-full bg-transparent focus:outline-none"
                    defaultValue="" // Set the default value as needed
                  >
                    <option value="" disabled>Select Region Name</option>
                    <option value="region1">UK</option>
                    <option value="region2">USA</option>

                  </select>
                </div>
                <div className="border-l border-gray-300 mx-4 hidden md:block"></div>
                <button className="bg-[#0b4251] px-4 py-2 text-white w-full md:w-auto" style={{ fontWeight: "bold", borderRadius: "12px" }}>Search</button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 px-6 md:px-8 lg:px-10" id="courses">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-8" style={{ textAlign: "center" }}>Our Top Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <Card>
                <Image
                  alt="Course Image"
                  className="rounded-t-md"
                  height={200}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={340}
                />
                <CardContent className="p-4" style={{ backgroundColor: "#0b4251" }}>
                  <h3 className="text-lg font-bold mb-2">Introduction to Web Development</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600">
                      <span className="font-bold">$99</span>
                      on Udemy{"\n"}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-bold">$149</span>
                      on Coursera{"\n"}
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Compare Prices
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <Image
                  alt="Course Image"
                  className="rounded-t-md"
                  height={200}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={340}
                />
                <CardContent className="p-4" style={{ backgroundColor: "#0b4251" }}>
                  <h3 className="text-lg font-bold mb-2">Machine Learning for Beginners</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600">
                      <span className="font-bold">$199</span>
                      on Udemy{"\n"}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-bold">$249</span>
                      on Coursera{"\n"}
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Compare Prices
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <Image
                  alt="Course Image"
                  className="rounded-t-md"
                  height={200}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={340}
                />
                <CardContent className="p-4" style={{ backgroundColor: "#0b4251" }}>
                  <h3 className="text-lg font-bold mb-2">Data Structures and Algorithms</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600">
                      <span className="font-bold">$149</span>
                      on Udemy{"\n"}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-bold">$199</span>
                      on Coursera{"\n"}
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Compare Prices
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <Image
                  alt="Course Image"
                  className="rounded-t-md"
                  height={200}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={340}
                />
                <CardContent className="p-4" style={{ backgroundColor: "#0b4251" }}>
                  <h3 className="text-lg font-bold mb-2">Introduction to Digital Marketing</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600">
                      <span className="font-bold">$79</span>
                      on Udemy{"\n"}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-bold">$99</span>
                      on Coursera{"\n"}
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Compare Prices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-12 px-6 md:px-8 lg:px-10" id="about">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-4" style={{ textAlign: "center" }}>About</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  Course Comparison is a platform that helps you find the best deals on online courses across multiple
                  websites. We understand that finding the right course at the right price can be a daunting task, so
                  we have created this tool to make the process easier.
                </p>
                <p className="text-gray-600 mb-4">
                  Our mission is to empower learners like you to access high-quality education at affordable prices. By
                  comparing course prices from various platforms, we aim to help you make informed decisions and get the
                  most value for your money.
                </p>
              </div>
              <div>
                <Image
                  alt="About Image"
                  className="rounded-md"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "cover",
                  }}
                  width={500}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 px-6 md:px-8 lg:px-10" id="contact">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-4" style={{ textAlign: "center" }}>Contact Us</h1>
            <form className="max-w-md mx-auto">
              <div className="mb-4">
                <Label htmlFor="name" style={{ color: "black" }}>Name</Label>
                <Input id="name" required type="text" style={{ backgroundColor: "white", color: "black" }} />
              </div>
              <div className="mb-4">
                <Label htmlFor="email" style={{ color: "black" }}>Email</Label>
                <Input id="email" required type="email" style={{ backgroundColor: "white", color: "black" }} />
              </div>
              <div className="mb-4">
                <Label htmlFor="message" style={{ color: "black" }}>Message</Label>
                <Textarea id="message" required rows={5} style={{ backgroundColor: "white", color: "black" }} />
              </div>
              <Button className="w-full" style={{ backgroundColor: "#0b4251", color: "white" }} type="submit">
                Submit
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-4 px-6 md:px-8 lg:px-10">
        <div className="container mx-auto flex items-center justify-between">
          <p>© 2023 Course Comparison. All rights reserved.</p>
          <nav className="hidden md:flex items-center space-x-6">
            <Link className="hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:underline" href="#">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default Component