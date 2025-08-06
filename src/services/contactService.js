const API_URL = import.meta.env.VITE_API_URL;

// GET - Obtener todos los contactos
export async function fetchContacts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const rawContacts = await response.json();

    const contacts = rawContacts.map(c => ({
      id: c.id,
      name: c.fullname,
      phone: c.phonenumber,
      email: c.email,
      category: c.type,
      address: c.company,
      favorite: false, // No existe en la API, puedes manejarlo localmente
      avatar: c.fullname
        ? c.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U',
    }));

    return contacts;
  } catch (error) {
    console.error('❌ Error al cargar contactos:', error);
    throw error;
  }
}

// POST - Crear nuevo contacto
export async function createContact(contactData) {
  try {
    const payload = {
      fullname: contactData.name,
      phonenumber: contactData.phone,
      email: contactData.email,
      type: contactData.category,
      company: contactData.address,
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const created = await response.json();

    return {
      id: created.id,
      name: created.fullname,
      phone: created.phonenumber,
      email: created.email,
      category: created.type,
      address: created.company,
      favorite: false,
      avatar: created.fullname
        ? created.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U',
    };
  } catch (error) {
    console.error('❌ Error al crear contacto:', error);
    throw error;
  }
}

// PUT - Actualizar contacto
export async function updateContact(id, contactData) {
  try {
    const payload = {
      fullname: contactData.name,
      phonenumber: contactData.phone,
      email: contactData.email,
      type: contactData.category,
      company: contactData.address,
    };

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const updated = await response.json();

    return {
      id: updated.id,
      name: updated.fullname,
      phone: updated.phonenumber,
      email: updated.email,
      category: updated.type,
      address: updated.company,
      favorite: false,
      avatar: updated.fullname
        ? updated.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U',
    };
  } catch (error) {
    console.error('❌ Error al actualizar contacto:', error);
    throw error;
  }
}

// DELETE - Eliminar contacto
export async function deleteContact(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    console.log(`✅ Contacto ${id} eliminado`);
  } catch (error) {
    console.error
}
}