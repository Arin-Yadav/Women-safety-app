import React, { useEffect, useState } from "react";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  // Example: Fetch contacts from backend API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/getcontacts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        setContacts(data.contacts); // expected: [{name, phone, relation, email}]
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <section className="bg-white shadow-md rounded-lg p-6 mt-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Emergency Contacts
      </h2>

      {contacts.length === 0 ? (
        <p className="text-gray-600 text-center">No contacts added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg hover:shadow-lg transition">
              {/* <img
                src={contact.avatar || "https://via.placeholder.com/50"}
                alt={contact.name}
                className="w-12 h-12 rounded-full border"
              /> */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {`Name: ${contact.name}`}
                </h3>
                <p className="text-gray-600">{`Phone: ${contact.phone}`}</p>
                <p className="text-sm text-gray-500">{`Relation: ${contact.relation}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
