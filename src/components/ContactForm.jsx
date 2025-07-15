import { useState } from "react";
import "./contacform.css"

export default function ContactForm({ onAddContact }) {
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChangeContact = (event) => {
    const { name, value } = event.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newContact.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (newContact.name.trim().length < 2) {
      newErrors.name = "Debe tener al menos 2 caracteres";
    }

    if (!newContact.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!/^\d{8,15}$/.test(newContact.phone.trim())) {
      newErrors.phone = "Debe tener entre 8 y 15 dígitos";
    }

    if (!newContact.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContact.email.trim())) {
      newErrors.email = "Formato de email no válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onAddContact({
      id: crypto.randomUUID(),
      name: newContact.name.trim(),
      phone: parseInt(newContact.phone.trim(), 10),
      email: newContact.email.trim(),
      isFavorite: false,
    });

    setNewContact({ name: "", phone: "", email: "" });
    setErrors({});
  };

  return (
    <div className="contact-form">
      <h2>Add new contact</h2>

      <div className="form-container">
        <div className="form-row">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleChangeContact}
            placeholder="Ingresa el nombre"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={newContact.phone}
            onChange={handleChangeContact}
            placeholder="Ingresa el teléfono"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-row">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={newContact.email}
            onChange={handleChangeContact}
            placeholder="Ingresa el email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
      </div>

      <button className="add-button" onClick={handleSubmit}>Add Contact</button>
    </div>
  );
}