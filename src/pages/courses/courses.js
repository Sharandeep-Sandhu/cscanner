// pages/courses.js

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

export function CoursesPage() {
    const BASE_URL = 'http://localhost:8080';
    const router = useRouter(); // Correctly imported useRouter
    const [courses, setCourses] = useState([]);
    // const [filteredCourses, setFilteredCourses] = useState([]);
    // const [selectedPriceOrder, setSelectedPriceOrder] = useState(null);
    // const [selectedDateOrder, setSelectedDateOrder] = useState(null);
    // const [selectedRegion, setSelectedRegion] = useState(null);

    useEffect(() => {
        console.log('Router query parameters:', router.query); // Ensure router.query is logged properly

        async function fetchCourses() {
            try {
                const { brandname, course_id, start_date, region } = router.query || {};
                if (!brandname || !course_id || !start_date || !region) {
                    console.error('Required query parameters are missing.');
                    return;
                }

                const searchParams = new URLSearchParams({
                    brandname,
                    course_id,
                    start_date,
                    region
                });
                const searchUrl = `${BASE_URL}/search?${searchParams.toString()}`;

                const response = await fetch(searchUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const rawData = await response.json();

                const extractedData = rawData.map(course => ({
                    brandname: course.brandname,
                    coursename: course.coursename,
                    duration: course.duration,
                    price: course.price,
                    region: course.region,
                    start_date: course.start_date,
                    brand_image: course.brand_image,
                    url: course.url
                }));

                console.log(extractedData)
                setCourses(extractedData || []);
                setFilteredCourses(extractedData || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setCourses([]);
                setFilteredCourses([]);
            }
        }

        if (router.query && Object.keys(router.query).length > 0) {
            fetchCourses();
        }
    }, [router.query]);

    // const applyFilters = () => {
    //     let filtered = [...courses];
        
    //     if (selectedPriceOrder) {
    //         filtered.sort((a, b) => selectedPriceOrder === 'low-to-high' ? a.price - b.price : b.price - a.price);
    //     }
    //     if (selectedDateOrder) {
    //         filtered.sort((a, b) => selectedDateOrder === 'newest' ? new Date(b.start_date) - new Date(a.start_date) : new Date(a.start_date) - new Date(b.start_date));
    //     }
    //     if (selectedRegion) {
    //         filtered = filtered.filter(course => course.region.toLowerCase() === selectedRegion.toLowerCase());
    //     }
        
    //     setFilteredCourses(filtered);
    // };

    return (
        <div className="container mx-auto py-12 px-4 md:px-6 grid md:grid-cols-[1fr_300px] gap-8">
            <div className="ml-[10%]">
                <h1 className="text-3xl font-bold mb-8">All Courses</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <div key={course.course_id} className="bg-card rounded-lg overflow-hidden shadow-md bg-[#18181b]">
                                <div className="h-48">
                                    <img
                                        src={course.brand_image}
                                        alt={course.brandname}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-2">{course.coursename}</h2>
                                    <p className="text-muted-foreground mb-4">
                                        Duration: {course.duration}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold">${course.price}</span>
                                        <Link href={course.url} target="_blank" rel="noopener noreferrer">
                                            <Button size="sm">Enroll</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl font-semibold text-gray-600">No courses available</p>
                    )}
                </div>
            </div>
            {/* <div className="bg-card rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div className="grid gap-4">
                    <div>
                        <Label htmlFor="price" className="text-sm font-medium">
                            Price
                        </Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    Price
                                    <ChevronDownIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuRadioGroup value={selectedPriceOrder} onValueChange={setSelectedPriceOrder}>
                                    <DropdownMenuRadioItem value="low-to-high">Low to High</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="high-to-low">High to Low</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <Label htmlFor="date" className="text-sm font-medium">
                            Date
                        </Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    Date
                                    <ChevronDownIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuRadioGroup value={selectedDateOrder} onValueChange={setSelectedDateOrder}>
                                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <Label htmlFor="region" className="text-sm font-medium">
                            Region
                        </Label>
                        <Select id="region" className="mt-1" onValueChange={setSelectedRegion}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={null}>All</SelectItem>
                                <SelectItem value="USA">USA</SelectItem>
                                <SelectItem value="UK">UK</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
                </div>
            </div> */}
        </div>
    );
}

function ChevronDownIcon(props) {
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
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

export default CoursesPage;
