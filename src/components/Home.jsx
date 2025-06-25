import React from "react";
import { Calendar } from "@/components/ui/calendar"; // You can use any calendar library

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">📖 Secret Diary</h1>
        <Button className="bg-red-500 hover:bg-red-600 text-white flex gap-2 items-center">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 p-6 gap-6">
        {/* Calendar */}
        <div className="w-1/3 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">📅 Select Date</h2>
          <Calendar mode="single" selected={new Date()} onSelect={() => {}} className="rounded-md border" />
        </div>

        {/* Diary Entry Area */}
        <div className="w-2/3 bg-white rounded-lg shadow p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📝 Your Diary</h2>
          <textarea
            placeholder="Write your secrets here..."
            className="flex-1 p-4 text-gray-700 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <Button className="mt-4 self-end bg-blue-500 hover:bg-blue-600 text-white">
            Save Entry
          </Button>
        </div>
      </div>
    </div>
  );
}
