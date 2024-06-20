/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CrnqhdZVjnu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Group } from "lucide-react"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [filters, setFilters] = useState({
    category: [],
    difficulty: [],
    instructor: [],
  })
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
      duration: "4 weeks",
      price: 99.99,
      category: "Web Development",
      difficulty: "Beginner",
      instructor: "John Doe",
      date: "2023-05-01",
    },
    {
      id: 2,
      title: "Advanced React.js",
      description:
        "Dive deep into React.js and learn advanced concepts like hooks, context, and performance optimization.",
      duration: "6 weeks",
      price: 199.99,
      category: "Web Development",
      difficulty: "Advanced",
      instructor: "Jane Smith",
      date: "2023-06-15",
    },
    {
      id: 3,
      title: "Data Structures and Algorithms",
      description: "Explore the fundamental data structures and algorithms used in computer science.",
      duration: "8 weeks",
      price: 149.99,
      category: "Computer Science",
      difficulty: "Intermediate",
      instructor: "Bob Johnson",
      date: "2023-07-01",
    },
    {
      id: 4,
      title: "Introduction to Machine Learning",
      description: "Get started with machine learning and learn how to build simple models using Python.",
      duration: "6 weeks",
      price: 179.99,
      category: "Data Science",
      difficulty: "Beginner",
      instructor: "Alice Williams",
      date: "2023-08-15",
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      description: "Learn how to build cross-platform mobile apps using the Flutter framework.",
      duration: "8 weeks",
      price: 199.99,
      category: "Mobile Development",
      difficulty: "Intermediate",
      instructor: "Charlie Davis",
      date: "2023-09-01",
    },
  ]
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
      const dateMatch =
        (!dateRange.start || new Date(course.date) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(course.date) <= new Date(dateRange.end))
      const priceMatch = course.price >= priceRange.min && course.price <= priceRange.max
      const categoryMatch = filters.category.length === 0 || filters.category.includes(course.category)
      const difficultyMatch = filters.difficulty.length === 0 || filters.difficulty.includes(course.difficulty)
      const instructorMatch = filters.instructor.length === 0 || filters.instructor.includes(course.instructor)
      return titleMatch && dateMatch && priceMatch && categoryMatch && difficultyMatch && instructorMatch
    })
  }, [searchTerm, dateRange, priceRange, filters])
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleDateRangeChange = (range) => {
    setDateRange(range)
  }
  const handlePriceRangeChange = (range) => {
    setPriceRange(range)
  }
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }))
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-white py-4 px-6 md:px-8 lg:px-10" style={{ backgroundColor: "#0b4251" }}>
        <div className="container mx-auto flex items-center justify-between">
          <Link className="text-xl font-bold" href="#">
            Course Scanner
          </Link>
          
          <Button className="md:hidden" variant="outline">
            <MenuIcon className="w-6 h-6" />
          </Button>
        </div>
      </header>
      <main className="flex-1" style={{
        height: '100vh',
        background: 'linear-gradient(to top, #87bbd7, #f2c864, #0b4251)'
      }}>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="bg-black rounded-lg shadow-md p-6" style={{ background: 'linear-gradient(to top, #87bbd7, #f2c864, #0b4251)' }}>
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <div className="space-y-4" >
              <div>
                <h3 className="text-md font-bold mb-2">Date Range</h3>
                <div className="w-full">
                  <Input type="date" className="w-full" style={{ background: '#0b4251' }} placeholder="Start Date" />
                  <Input type="date" className="w-full mt-2" style={{ background: '#0b4251' }} placeholder="End Date" />
                </div>
              </div>
              <div>
                <h3 className="text-md font-bold mb-2">Price Range</h3>
                <div className="w-full">
                  <Input type="number" className="w-full" style={{ background: '#0b4251' }} placeholder="Min Price" />
                  <Input type="number" className="w-full mt-2" style={{ background: '#0b4251' }} placeholder="Max Price" />
                </div>
              </div>
              <div>
                <h3 className="text-md font-bold mb-2">Category</h3>
                <div className="space-y-2">
                  <Checkbox value="Web Development">Web Development</Checkbox>
                  <Checkbox value="Computer Science">Computer Science</Checkbox>
                  <Checkbox value="Data Science">Data Science</Checkbox>
                  <Checkbox value="Mobile Development">Mobile Development</Checkbox>
                </div>
              </div>
              <div>
                <h3 className="text-md font-bold mb-2">Difficulty</h3>
                <div className="space-y-2">
                  <Checkbox value="Beginner">Beginner</Checkbox>
                  <Checkbox value="Intermediate">Intermediate</Checkbox>
                  <Checkbox value="Advanced">Advanced</Checkbox>
                </div>
              </div>
              <div>
                <h3 className="text-md font-bold mb-2">Instructor</h3>
                <div className="space-y-2">
                  <Checkbox value="John Doe">John Doe</Checkbox>
                  <Checkbox value="Jane Smith">Jane Smith</Checkbox>
                  <Checkbox value="Bob Johnson">Bob Johnson</Checkbox>
                  <Checkbox value="Alice Williams">Alice Williams</Checkbox>
                  <Checkbox value="Charlie Davis">Charlie Davis</Checkbox>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className=" rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Courses</h2>
              <ul className="space-y-4">
                {filteredCourses.map((course) => (
                  <li key={course.id} className=" rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p style={{ color: "black" }}>{course.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="font-bold">Duration:</span> {course.duration}
                      </div>
                      <div>
                        <span className="font-bold">Price:</span> ${course.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <UserIcon className="w-4 h-4 mr-2" />
                        <span>{course.instructor}</span>
                      </div>
                      <div>
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {/* <span>{new Date(course.date).toLocaleDateString()}</span> */}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

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
  )
}


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}