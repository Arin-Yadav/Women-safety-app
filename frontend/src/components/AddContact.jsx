// src/pages/AddContacts.jsx
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const contactSchema = yup.object().shape({
  contacts: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      relation: yup.string().required("Relation is required"),
    })
  ),
});

export default function AddContacts() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      contacts: [{ name: "", email: "", phone: "", relation: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const onSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user.id) {
      alert("User not found. Please sign in again.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/addcontacts", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
       },
      body: JSON.stringify({ userId: user.id, contacts: data.contacts }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Contacts added successfully!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 via-pink-500 to-red-500 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-6xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-700 text-center mb-6">
          ➕ Add Emergency Contacts
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start border rounded-lg p-4 bg-gray-50 shadow-sm">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register(`contacts.${index}.name`)}
                  placeholder="Name"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
                {errors.contacts?.[index]?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contacts[index].name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register(`contacts.${index}.email`)}
                  placeholder="Email"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
                {errors.contacts?.[index]?.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contacts[index].email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  {...register(`contacts.${index}.phone`)}
                  placeholder="Phone"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
                {errors.contacts?.[index]?.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contacts[index].phone.message}
                  </p>
                )}
              </div>

              {/* Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relation
                </label>
                <input
                  type="text"
                  {...register(`contacts.${index}.relation`)}
                  placeholder="Relation"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
                {errors.contacts?.[index]?.relation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contacts[index].relation.message}
                  </p>
                )}
              </div>

              {/* Remove button */}
              <div className="col-span-1 sm:col-span-2 md:col-span-4 text-right">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium mt-2">
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add another contact */}
          <button
            type="button"
            onClick={() =>
              append({ name: "", email: "", phone: "", relation: "" })
            }
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300">
            ➕ Add Another Contact
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300 mt-4">
            Save All Contacts
          </button>
        </form>
      </div>
    </div>
  );
}
