"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
    sender: "user" | "bot";
    text: string;
}

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const webhook = "https://ismaeldev.app.n8n.cloud/webhook/chatbot2";

    // Auto-scroll al último mensaje
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage: Message = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        const currentInput = input;
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch(webhook, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: currentInput }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // ✅ Lectura segura: primero texto, luego parse
            const rawText = await res.text();
            const data = rawText ? JSON.parse(rawText) : {};

            const botMessage: Message = {
                sender: "bot",
                text: data.reply || "Lo siento, no pude procesar tu mensaje.",
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);

            let errorMessageText = "Error de conexión con el servidor.";

            if (error instanceof TypeError && error.message === "Failed to fetch") {
                errorMessageText =
                    "No se pudo conectar con el chatbot. Por favor, asegúrate de que el webhook de n8n esté activo y permita CORS.";
            }

            const errorMessage: Message = {
                sender: "bot",
                text: errorMessageText,
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 999,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "10px",
                }}
            >
                {open && (
                    <div
                        style={{
                            width: "350px",
                            height: "400px",
                            background: "white",
                            borderRadius: "15px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            border: "1px solid #e5e7eb",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                padding: "15px",
                                background: "#007bff",
                                color: "white",
                                fontWeight: "bold",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span>Chat Hidalsoft</span>
                            <button
                                onClick={() => setOpen(false)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                padding: "15px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                background: "#f9fafb",
                            }}
                        >
                            {messages.length === 0 && (
                                <p
                                    style={{
                                        color: "#6b7280",
                                        textAlign: "center",
                                        fontSize: "14px",
                                        marginTop: "20px",
                                    }}
                                >
                                    ¡Hola! ¿En qué podemos ayudarte hoy?
                                </p>
                            )}

                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    style={{
                                        alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                                        background: m.sender === "user" ? "#007bff" : "#e5e7eb",
                                        color: m.sender === "user" ? "white" : "#1f2937",
                                        padding: "8px 12px",
                                        borderRadius: "12px",
                                        maxWidth: "80%",
                                        fontSize: "14px",
                                        lineHeight: "1.4",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    {m.text}
                                </div>
                            ))}

                            {/* ✅ Indicador "Escribiendo..." */}
                            {isTyping && (
                                <div
                                    style={{
                                        alignSelf: "flex-start",
                                        background: "#e5e7eb",
                                        color: "#6b7280",
                                        padding: "8px 12px",
                                        borderRadius: "12px",
                                        fontSize: "14px",
                                        fontStyle: "italic",
                                    }}
                                >
                                    Escribiendo...
                                </div>
                            )}

                            {/* Ancla para auto-scroll */}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div
                            style={{
                                display: "flex",
                                padding: "10px",
                                borderTop: "1px solid #e5e7eb",
                                background: "white",
                                gap: "8px",
                            }}
                        >
                            <input
                                style={{
                                    flex: 1,
                                    padding: "8px 12px",
                                    borderRadius: "20px",
                                    border: "1px solid #d1d5db",
                                    outline: "none",
                                    fontSize: "14px",
                                    opacity: isTyping ? 0.6 : 1,
                                }}
                                placeholder="Escribe un mensaje..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                disabled={isTyping}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isTyping}
                                style={{
                                    background: isTyping ? "#93c5fd" : "#007bff",
                                    color: "white",
                                    border: "none",
                                    padding: "8px 15px",
                                    borderRadius: "20px",
                                    cursor: isTyping ? "not-allowed" : "pointer",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    transition: "background 0.2s",
                                }}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                )}

                {/* Botón flotante */}
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,123,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    {open ? "✕" : "💬"}
                </button>
            </div>
        </>
    );
}