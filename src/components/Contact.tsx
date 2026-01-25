import Form from "./Form";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="flex w-full max-w-7xl flex-col items-center justify-center gap-14 px-4 py-48 lg:flex-row mx-auto"
    >
      <article className="flex flex-col items-center justify-center text-center lg:w-1/2 lg:items-start lg:text-left">
        <h2 className="text-5xl font-bold">Hablemos de tu marca</h2>
        <p className="mt-4 max-w-2xl text-xl">
          Déjanos tu mensaje y te contactamos en breve. Será un placer
          escucharte y acompañarte.
        </p>

        <ul className="mt-10 flex flex-col gap-8 text-neutral-600">
          <li className="flex flex-col">
            <p>Whatsapp</p>
            <a
              href="tel:0034632175017"
              className="text-petrol-900 mt-1 text-2xl underline hover:no-underline"
            >
              (+34) 632 17 50 17
            </a>
          </li>
          <li className="flex flex-col">
            <p>Correo electrónico</p>
            <a
              href="mailto:hola@cosmostudio.es"
              className="text-petrol-900 mt-1 text-2xl underline hover:no-underline"
            >
              hola@cosmostudio.es
            </a>
          </li>
        </ul>
      </article>

      <Form />
    </section>
  );
}
