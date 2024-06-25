"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button"; // Ensure this path is correct
import { ClockIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DollarSignIcon } from 'lucide-react';
import { ChevronDownIcon } from 'lucide-react';

const Component = () => {
  const BASE_URL = 'http://localhost:8080';
  const [brandNames, setBrandNames] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState('');
  const [courseNames, setCourseNames] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [sortDirection, setSortDirection] = useState("asc");
  const [priceFilter, setPriceFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch brand names from backend
    fetch(`${BASE_URL}/brandnames`)
      .then(response => response.json())
      .then((data) => {
        setBrandNames(data.map(item => item.brandname));
      })
      .catch(error => {
        console.error('Error fetching brand names:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch course names based on selected brand name
    if (selectedBrandName) {
      fetch(`${BASE_URL}/coursename/${selectedBrandName}`)
        .then(response => response.json())
        .then((data) => {
          // Use a Set to filter out duplicate course names
          const uniqueCourses = Array.from(new Set(data.map(item => item.coursename)))
            .map(name => data.find(course => course.coursename === name));
          setCourseNames(uniqueCourses);
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

  const handleCourseNameChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      brandname: selectedBrandName,
      course_id: selectedCourseId,
      start_date: e.currentTarget.querySelector('input[name="start_date"]')?.value || '',
      region: e.currentTarget.querySelector('select[name="region"]')?.value || '',
    };

    const queryString = new URLSearchParams(formData).toString();
    const url = `${BASE_URL}/search?${queryString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/coursename`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Failed to fetch courses:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filteredResults = [...courses].filter((course) => {
      const title = course.coursename || ""; // Handle null or undefined coursename
      const titleMatch = title.toLowerCase().includes(titleFilter.toLowerCase());
      const priceMatch = priceFilter ? course.price <= parseFloat(priceFilter) : true;
      const durationMatch = durationFilter ? course.duration === durationFilter : true;
      return titleMatch && priceMatch && durationMatch;
    });

    if (dateSortOrder) {
      filteredResults.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateSortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    setSearchResults(filteredResults);
  }, [courses, titleFilter, priceFilter, durationFilter, dateSortOrder]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-white py-4 px-6 md:px-8 lg:px-10" style={{ backgroundColor: "#0b4251" }}>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Course Scanner
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#about">About</Link>
            <Link href="#courses">Courses</Link>
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
        <section className="py-12 px-6 md:px-8 lg:px-10" id="about">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-White-600 mb-4" style={{ fontSize: '25px' }}>
                  Course Comparison is a platform that helps you find the best deals on online courses across multiple
                  websites. We understand that finding the right course at the right price can be a daunting task, so
                  we have created this tool to make the process easier.
                </p>
                <p className="text-white-600 mb-4" style={{ fontSize: '20px' }}>
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
        <section className="py-12 px-6 md:px-8 lg:px-10">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-4" style={{ textAlign: "center" }}>Find the Best Courses Price</h1>
            <p className="text-lg md:text-xl text-white-600 mb-8" style={{ textAlign: "center" }}>Compare course prices across multiple websites and find the best deal.</p>

            <div className="text-white" style={{ padding: "6rem" }}>
              <form
                className="mt-4 flex flex-col md:flex-row bg-white justify-between p-2 text-black rounded space-y-4 md:space-y-0"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col w-full md:w-auto">
                  <label htmlFor="brand-name" className="text-sm" style={{ fontWeight: 'bold' }}>
                    Brand Name
                  </label>
                  <select
                    id="brand-name"
                    name="brand-name"
                    value={selectedBrandName}
                    onChange={handleBrandNameChange}
                    className="w-full bg-transparent focus:outline-none"
                  >
                    <option value="">Select Brand Name</option>
                    {brandNames.map((brandName, index) => (
                      <option key={index} value={brandName}>
                        {brandName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full md:w-auto">
                  <label htmlFor="course-name" className="text-sm" style={{ fontWeight: 'bold' }}>
                    Course Name
                  </label>
                  <select
                    id="course-name"
                    name="course-name"
                    value={selectedCourseId}
                    onChange={handleCourseNameChange}
                    className="w-full bg-transparent focus:outline-none"
                  >
                    <option value="">Select Course Name</option>
                    {courseNames.map((course, index) => (
                      <option key={index} value={course.course_id}>
                        {course.coursename}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full md:w-auto">
                  <label htmlFor="start_date" className="text-sm font-bold">
                    Start Date
                  </label>
                  <input
                    id="start_date"
                    name="start_date"
                    type="date"
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
                <div className="flex flex-col w-full md:w-auto">
                  <label htmlFor="region" className="text-sm" style={{ fontWeight: 'bold' }}>
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    className="w-full bg-transparent focus:outline-none"
                  >
                    <option value="">Select Region Name</option>
                    <option value="UK">UK</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
                <div className="border-l border-gray-300 mx-4 hidden md:block"></div>
                <button
                  className="bg-[#0b4251] px-4 py-2 text-white w-full md:w-auto"
                  style={{ fontWeight: 'bold', borderRadius: '12px' }}
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>

            {searchResults.length > 0 && (
              <div className="container mx-auto grid md:grid-cols-[240px_1fr] gap-8 py-8 px-4 md:px-6">
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  <div className="grid gap-4">
                    {/* Dropdown menu for sorting */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span>Sort by</span>
                          <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => setSortBy(value)}>
                          <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="duration-asc">Duration: Short to Long</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="duration-desc">Duration: Long to Short</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="title-asc">Title: A to Z</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="title-desc">Title: Z to A</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Date filter select */}
                    <div className="grid gap-2">
                      <Label htmlFor="date-filter">Date</Label>
                      <Select id="date-filter" value={dateSortOrder} onValueChange={setDateSortOrder}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asc">Date: Ascending</SelectItem>
                          <SelectItem value="desc">Date: Descending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duration filter select */}
                    <div className="grid gap-2">
                      <Label htmlFor="duration-filter">Duration</Label>
                      <Select id="duration-filter" value={durationFilter} onValueChange={setDurationFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Filter by duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 days">All</SelectItem>
                          <SelectItem value="8 weeks">8 weeks</SelectItem>
                          <SelectItem value="10 weeks">10 weeks</SelectItem>
                          <SelectItem value="12 weeks">12 weeks</SelectItem>
                          <SelectItem value="14 weeks">14 weeks</SelectItem>
                          <SelectItem value="16 weeks">16 weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Title filter input */}
                    <div className="grid gap-2">
                      <Label htmlFor="title-filter">Title</Label>
                      <Input
                        id="title-filter"
                        type="text"
                        placeholder="Filter by title"
                        value={titleFilter}
                        onChange={(e) => setTitleFilter(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Displaying search results in list format */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                  <ul className="grid grid-cols-1 gap-6">
                    {searchResults.map((course) => (
                      <li key={course.id} className="shadow-md rounded-lg p-4" style={{ backgroundColor: '#030712' }}>
                        <div className="grid md:grid-cols-[1fr_auto] gap-4">
                          <div>
                            <h3 className="text-lg font-semibold">{course.coursename}</h3>
                            <p className="text-muted-foreground">{course.course_code}</p>
                            {/* Additional course details */}
                            <div className="flex items-center gap-2 mt-2">
                              <ClockIcon className="w-4 h-4" />
                              <span>{course.duration}</span>
                              <Separator orientation="vertical" className="h-4" />
                              <DollarSignIcon className="w-4 h-4" />
                              <span>{course.price}</span>
                              <Separator orientation="vertical" className="h-4" />
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              <span>{course.start_date}</span>
                            </div>
                          </div>
                          <Link href={course.url}>
                            <Button size="lg">Enroll</Button>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
      <footer className="py-4 px-6 md:px-8 lg:px-10" style={{ backgroundColor: "#0b4251" }}>
        <div className="container mx-auto text-white text-center">
          <p>&copy; 2024 Course Scanner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Component;

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}