import React, { useState, useEffect } from "react";

export default function ParcelHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("nik_bookings");
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  if (bookings.length === 0) {
    return (
      <section className="max-w-lg sm:max-w-xl md:max-w-3xl mx-auto bg-white p-6 border rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4">Parcel History</h2>
        <p className="text-gray-600">No parcels booked yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto bg-white p-6 border rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Parcel History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="border px-3 py-2">Tracking ID</th>
              <th className="border px-3 py-2">Sender</th>
              <th className="border px-3 py-2">Receiver</th>
              <th className="border px-3 py-2">Address</th>
              <th className="border px-3 py-2">Weight (kg)</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b.id} className={index % 2 === 0 ? "bg-gray-50 text-center" : "bg-white text-center"}>
                <td className="border px-3 py-2">{b.id}</td>
                <td className="border px-3 py-2">{b.sender}</td>
                <td className="border px-3 py-2">{b.receiver}</td>
                <td className="border px-3 py-2">{b.address}</td>
                <td className="border px-3 py-2">{b.weight}</td>
                <td className="border px-3 py-2 text-blue-600">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
