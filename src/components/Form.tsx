import { useState } from "react";

export default function Pricing() {
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { nombre, contacto, mensaje } = formData;
  const isValid = nombre !== "" && contacto !== "" && mensaje !== "";

  const resetForm = () => {
    setTimeout(() => {
      setFormData({
        nombre: "",
        contacto: "",
        mensaje: "",
      });
    }, 500); // 500ms delay as requested
  };

  const eBase = "mailto:hola@cosmostudio.es?subject=Contacto%20web%20⚡&body=";
  const wBase = "https://wa.me/34632175017?text=";

  const rawMessage = `Contacto: ${nombre} (${contacto})\n${mensaje}`;
  const encodedMessage = encodeURIComponent(rawMessage);

  return (
    <form
      id="contacto"
      className="flex w-full lg:w-1/2 flex-col items-center justify-center gap-8 rounded-xl border border-gray-50/10 bg-petrol-400 text-petrol-50 px-4 py-8 text-center shadow backdrop-blur-xl md:p-8"
    >
      <label className="flex w-full flex-col items-center gap-2">
        <span>Nombre de contacto</span>

        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={handleChange}
          placeholder="Ej. Julia García"
          className="w-full max-w-md rounded-lg border border-gray-50/10 bg-petrol-500 p-3 text-center text-lg placeholder:text-petrol-400"
        />
      </label>

      <label className="flex w-full flex-col items-center gap-2">
        <span>Correo electrónico o teléfono</span>

        <input
          type="text"
          name="contacto"
          value={contacto}
          onChange={handleChange}
          placeholder="Ej. juliagarcia@email.com / 600 600 600"
          className="w-full max-w-md rounded-lg border border-gray-50/10 bg-petrol-500 p-3 text-center text-lg placeholder:text-petrol-400"
        />
      </label>

      <label className="flex w-full flex-col items-center gap-2">
        <span> Tu mensaje </span>

        <textarea
          style={{ scrollbarWidth: "none" }}
          name="mensaje"
          value={mensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          rows={5}
          className="w-full max-w-md resize-none rounded-lg border border-gray-50/10 bg-petrol-500 p-3 text-center text-lg placeholder:text-petrol-400"
        ></textarea>
      </label>

      <div className="mt-4 flex w-full flex-col items-center gap-2">
        <p>Enviar formulario a través de</p>

        <div className="group flex w-full max-w-md rounded-full border border-gray-50/10 bg-petrol-700 p-2">
          <a
            id="sendEmail"
            href={isValid ? `${eBase}${encodedMessage}` : undefined}
            onClick={(e) => {
              if (!isValid) {
                e.preventDefault();
                return;
              }
              resetForm();
            }}
            className={`w-full max-w-xs rounded-full p-2 text-center transition-colors ${
              isValid
                ? "hover:bg-petrol-400 hover:text-gray-950 cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            Email
          </a>

          <a
            id="sendWhatsapp"
            href={isValid ? `${wBase}${encodedMessage}` : undefined}
            target={isValid ? "_blank" : undefined}
            rel={isValid ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!isValid) {
                e.preventDefault();
                return;
              }
              resetForm();
            }}
            className={`w-full max-w-xs rounded-full p-2 text-center transition-colors ${
              isValid
                ? "hover:bg-petrol-400 hover:text-gray-950 cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            Whatsapp
          </a>
        </div>
      </div>
    </form>
  );
}
