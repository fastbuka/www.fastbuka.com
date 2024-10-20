// src/app/user/tickets/page.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function UserTickets() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // Implement ticket submission logic here
    console.log('Ticket submitted:', { subject, message });
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold mb-6">Support Tickets</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
        <form onSubmit={handleSubmitTicket}>
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mb-4"
          />
          <Textarea
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-4"
            rows={5}
          />
          <Button type="submit">Submit Ticket</Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
        {/* Add list of user's tickets here */}
      </div>
    </div>
  );
}