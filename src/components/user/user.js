"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { CustomContainer, CustomErrorMessage, CustomInput } from "../ui";
import ItemList from "./itemList";
import Modal from "./modal";

export default function User() {
  const [items, setItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("/api/items");
    setItems(res.data);
  };

  const validate = () => {
    const errors = {};
    if (!firstName) errors.firstName = "First Name is required";
    if (!lastName) errors.lastName = "Last Name is required";
    if (!email) errors.email = "Email is required";
    if (!phone) errors.phone = "Phone Number is required";
    return errors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newItem = {
      id: updateId || Date.now().toString(),
      firstName,
      lastName,
      email,
      phone,
    };
    if (updateId) {
      await axios.put("/api/items", {
        id: updateId,
        updatedItem: { firstName, lastName, phone },
      });
      setUpdateId(null);
    } else {
      await axios.post("/api/items", newItem);
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setShowModal(false);
    setErrors({});
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete("/api/items", { data: { id } });
    fetchItems();
  };

  const handleEdit = (item) => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setEmail(item.email);
    setPhone(item.phone);
    setUpdateId(item.id);
    setShowModal(true);
  };

  const handleAdd = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setUpdateId(null);
    setShowModal(true);
  };

  const handleBlock = async (id, isBlocked) => {
    await axios.patch("/api/items", { id, isBlocked });
    fetchItems();
  };

  return (
    <>
      <section className="my-10">
        <CustomContainer>
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-semibold">CRUD App</h1>
            <button
              onClick={handleAdd}
              className="py-2 px-5 rounded bg-blue-500 text-white flex items-center gap-2"
            >
              <FiPlus className="text-lg" />
              Add Employee
            </button>
          </div>

          <ItemList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBlock={handleBlock}
          />
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
          >
            <CustomInput
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            {errors.firstName && <CustomErrorMessage name={errors.firstName} />}
            <CustomInput
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
            {errors.lastName && <CustomErrorMessage name={errors.lastName} />}
            <CustomInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={!!updateId} // Disable the email field if updating
            />
            {errors.email && <CustomErrorMessage name={errors.email} />}
            <CustomInput
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
            {errors.phone && <CustomErrorMessage name={errors.phone} />}
          </Modal>
        </CustomContainer>
      </section>
    </>
  );
}
