import { useState } from "react";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";

const questions = [
  {
    id: 1,
    question:
      "¿Cuánto tiempo dedicas actualmente a gestionar tus redes sociales?",
    type: "radio",
    options: [
      "Menos de 1 hora a la semana",
      "Entre 1-3 horas semanales",
      "Entre 3-5 horas semanales",
      "Más de 5 horas semanales",
      "No tengo tiempo para gestionarlo",
    ],
  },
  {
    id: 2,
    question:
      "¿Sientes que tu presencia en redes refleja tu esencia y tu trabajo?",
    type: "radio",
    options: [
      "Sí, totalmente",
      "A veces, pero podría mejorar",
      "No mucho",
      "Para nada",
      "Ni siquiera tengo presencia activa",
    ],
  },
  {
    id: 3,
    question: "¿Qué es lo que más te cuesta?",
    type: "radio",
    options: [
      "Crear contenido visual atractivo",
      "Escribir textos que conecten",
      "Ser constante y publicar regularmente",
      "Responder mensajes y gestionar la comunidad",
      "Todo lo anterior",
    ],
  },
  {
    id: 4,
    question: "¿Cuál es tu objetivo principal?",
    type: "radio",
    options: [
      "Atraer nuevos pacientes/clientes",
      "Educar y aportar valor a mi comunidad",
      "Posicionarme como referente en mi área",
      "Crear conexión y confianza",
      "Todos los anteriores",
    ],
  },
  {
    id: 5,
    question:
      "¿Qué te gustaría delegar si pudieras? (Cuéntanos en tus palabras)",
    type: "textarea",
    placeholder:
      "Ej: Me gustaría delegar la creación de contenido, pero mantener la respuesta a mensajes...",
  },
  {
    id: 6,
    question: "¿Cuál es tu correo electrónico?",
    type: "email",
    placeholder: "tu@email.com",
  },
  {
    id: 7,
    question: "¿Cuándo te gustaría empezar?",
    type: "radio",
    options: [
      "Lo antes posible",
      "En las próximas semanas",
      "En 1-2 meses",
      "Solo estoy explorando opciones",
    ],
  },
];

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const canGoNext = answers[currentQuestion.id]?.trim().length > 0;

  const handleNext = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cosmos-petrol to-cosmos-petrol/90"></div>
        <div className="absolute inset-0 opacity-15">
          <img
            src="/Planning.jpg"
            alt="Planificación y organización"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cosmos-petrol/95 via-cosmos-petrol/90 to-cosmos-petrol/95"></div>
        </div>

        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-cosmos-terracotta" />
            </div>
            <h2 className="text-cosmos-petrol mb-4">
              ¡Gracias por completar el quiz!
            </h2>
            <p className="text-xl text-dark/80 mb-8">
              Hemos recibido tus respuestas. En breve nos pondremos en contacto
              contigo para hablar sobre cómo Cosmos puede acompañarte en tu
              presencia digital.
            </p>
            <button onClick={handleReset} className="cta-primary">
              Volver al inicio
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cosmos-petrol to-cosmos-petrol/90"></div>
      <div className="absolute inset-0 opacity-15">
        <img
          src="/Planning.jpg"
          alt="Planificación y organización"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cosmos-petrol/95 via-cosmos-petrol/90 to-cosmos-petrol/95"></div>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 text-light">
            <h2 className="mb-4">
              ¿Es el momento de delegar tus redes sociales?
            </h2>
            <p className="text-lg opacity-90">
              Responde estas 7 preguntas y te diremos si Cosmos es para ti.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-cosmos-petrol">
                  Pregunta {currentStep + 1} de {questions.length}
                </span>
                <span className="text-sm text-dark/60">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}%
                  completado
                </span>
              </div>
              <div className="w-full bg-terracotta-50 rounded-full h-2">
                <div
                  className="bg-cosmos-terracotta h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl md:text-2xl text-cosmos-petrol mb-6">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === "radio" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-4 rounded-xl border-2 border-cosmos-beige hover:border-cosmos-terracotta cursor-pointer transition-all duration-200 group"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={answers[currentQuestion.id] === option}
                        onChange={(e) =>
                          setAnswers({
                            ...answers,
                            [currentQuestion.id]: e.target.value,
                          })
                        }
                        className="w-5 h-5 text-cosmos-terracotta focus:ring-cosmos-terracotta"
                      />
                      <span className="ml-3 text-dark group-hover:text-cosmos-petrol">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === "textarea" && (
                <textarea
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [currentQuestion.id]: e.target.value,
                    })
                  }
                  placeholder={currentQuestion.placeholder}
                  rows={5}
                  className="w-full p-4 rounded-xl border-2 border-cosmos-beige focus:border-cosmos-terracotta focus:ring-2 focus:ring-cosmos-terracotta/20 outline-none transition-all duration-200 resize-none"
                />
              )}

              {currentQuestion.type === "email" && (
                <input
                  type="email"
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [currentQuestion.id]: e.target.value,
                    })
                  }
                  placeholder={currentQuestion.placeholder}
                  className="w-full p-4 rounded-xl border-2 border-cosmos-beige focus:border-cosmos-terracotta focus:ring-2 focus:ring-cosmos-terracotta/20 outline-none transition-all duration-200"
                />
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg text-cosmos-petrol hover:bg-terracotta-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex items-center space-x-2 cta-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLastQuestion ? "Enviar" : "Siguiente"}</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
