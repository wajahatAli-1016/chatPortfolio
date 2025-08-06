"use client"
import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './chatbot.module.css';

const ChatbotContent = () => {
    const searchParams = useSearchParams();
    const [locale, setLocale] = useState('en'); // Default to 'en' to match server render
    const [isClient, setIsClient] = useState(false);
    
    // Handle locale detection on client side only
    useEffect(() => {
        setIsClient(true);
        const detectedLocale = searchParams.get('locale') || 'en';
        setLocale(detectedLocale);
    }, [searchParams]);
    
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi there! I'm WajahatBot 🤖. Want to explore my work? Ask away! You can ask me about my projects, skills, experience, or anything else!",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Update welcome message when locale changes
    useEffect(() => {
        if (isClient && locale) {
            const welcomeMessage = locale === 'fr' 
                ? "Salut ! Je suis WajahatBot 🤖. Envie d'explorer mon travail ? Posez-moi vos questions ! Vous pouvez me demander mes projets, compétences, expérience ou autre chose !"
                : "Hi there! I'm WajahatBot 🤖. Want to explore my work? Ask away! You can ask me about my projects, skills, experience, or anything else!";
            
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === 1 
                        ? { ...msg, text: welcomeMessage }
                        : msg
                )
            );
        }
    }, [locale, isClient]);

    // Wajahat's comprehensive information
    const wajahatData = {
        "name": "Wajahat",
        "title": "Fullstack Developer",
        "bio": "Passionate Fullstack Developer with expertise in building scalable web applications, RESTful APIs, and modern frontend interfaces. I enjoy turning complex problems into simple, beautiful, and intuitive designs.",
        "location": "Pakistan",
        "email": "wajahat@example.com",
        "socialLinks": {
            "github": "https://github.com/wajahatAli-1016",
            "linkedin": "https://www.linkedin.com/in/wajahat-ali-880a74272/",
            "twitter": "https://twitter.com/wajahat_dev",
            "portfolio": "https://tubular-gnome-454e39.netlify.app/"
        },
        "skills": {
            "frontend": ["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
            "backend": ["Node.js", "Express", "NextJS", "MongoDB"],
            "devops": ["GitHub Actions", "Vercel", "Netlify"],
            "tools": ["Figma", "Postman", "VS Code"]
        },
        "projects": [
            {
                "name": "Async Standups",
                "description": "Async Standups – Keep your team in sync without syncing your schedules.",
                "techStack": ["Next.js", "MongoDB", "Tailwind CSS", "Auth.js"],
                "link": "https://async-standups-loux.vercel.app/",
                "github": "https://github.com/wajahatAli-1016/asyncStandups",
            },
            {
                "name": "Mind therapy",
                "description": "Emotional support app with journal and mood tracker with AI feedback and chatbot.",
                "techStack": ["Next.js", "Node.js", "MongoDB"],
                "link": "https://mindtherapy1-wzsc.vercel.app/",
                "github": "https://github.com/wajahatAli-1016/mindtherapy1",
            },
            {
                "name": "Bookify",
                "description": "Bookify – Buy books online, smarter and faster.",
                "techStack": ["React", "Express", "MongoDB", "Tailwind CSS", "Node.js"],
                "link": "https://bookify-frontend-vw31.vercel.app/",
                "github": "https://github.com/wajahatAli-1016/bookify",
            }
        ],
        "experience":
        {
            "role": "Fullstack Developer Intern",
            "company": "Musketeers Tech",
            "duration": "03-july-2025 - 03-sep-2025",
            "description": "Building scalable web solutions using Next.js, Node.js, and MongoDB. Apply internationalization in many projects."
        }
        ,
        "education": {
            "degree": "BS in Computer Science",
            "university": "University of the Punjab",
            "year": "2022 - 2026"
        },

        "chatPortfolio": {
            "enabled": true,
            "description": "Ask me anything about my projects, tech stack, or experience. Powered by AI!",
            "botName": "WajahatBot",
            "welcomeMessage": "Hi there! I'm WajahatBot 🤖. Want to explore my work? Ask away!",
            "faq": [
                {
                    "question": "What technologies do you use the most?",
                    "answer": "I work primarily with React, Next.js, Node.js, and MongoDB."
                },
                {
                    "question": "Can I see your latest project?",
                    "answer": "Sure! Check out ChatPortfolio AI: https://chat.wajahat.dev"
                },
                {
                    "question": "Are you open to freelance work?",
                    "answer": "Yes, I'm open to exciting freelance opportunities. Feel free to contact me!"
                }
            ]
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Function to translate text to French
    const translateToFrench = async (text) => {
        if (locale !== 'fr') return text; // Only translate if locale is French
        
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama3-8b-8192',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a translator. Translate the user message to French. Keep the same meaning and tone. Only respond with the French translation, nothing else.'
                        },
                        {
                            role: 'user',
                            content: text
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 100,
                    top_p: 1,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Translation error:', error);
            return text; // Return original text if translation fails
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const callGroqAPI = async (userMessage) => {
        try {
            const languageInstruction = locale === 'fr' 
                ? "IMPORTANT: Respond ONLY in French. All responses must be in French language."
                : "IMPORTANT: Respond ONLY in English. All responses must be in English language.";

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama3-8b-8192',
                    messages: [
                        {
                            role: 'system',
                            content: `${languageInstruction}

You are WajahatBot, an AI assistant for Wajahat Ali's portfolio. Keep all responses SHORT, CONCISE, and TO THE POINT. Maximum 2-3 sentences per answer.

${JSON.stringify(wajahatData, null, 2)}

Key rules:
- Keep responses brief and direct
- Focus on the most relevant information only
- Use bullet points when listing multiple items
- Be friendly but concise
- If asked about something not in the data, briefly redirect to Wajahat's work
- ALWAYS respond in ${locale === 'fr' ? 'French' : 'English'}`
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 150,
                    top_p: 1,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling Groq API:', error);
            const fallbackMessage = locale === 'fr'
                ? "J'ai des difficultés à me connecter à mon service IA en ce moment. Mais je peux vous parler de Wajahat ! C'est un développeur Fullstack passionné du Pakistan qui a construit des projets incroyables comme DevBlog, EcomStore et ChatPortfolio AI. Il se spécialise dans React, Next.js, Node.js et MongoDB. Voulez-vous en savoir plus sur son travail ?"
                : "I'm having trouble connecting to my AI service right now. But I can tell you about Wajahat! He's a passionate Fullstack Developer from Pakistan who has built amazing projects like DevBlog, EcomStore, and ChatPortfolio AI. He specializes in React, Next.js, Node.js, and MongoDB. Would you like to know more about his work?";
            return fallbackMessage;
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Translate user message to the appropriate language based on locale
        const translatedMessage = await translateToFrench(inputMessage);
        
        const userMessage = {
            id: messages.length + 1,
            text: translatedMessage, // Show translated message in chat
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            // Call Groq API for AI response with translated message
            const aiResponseText = await callGroqAPI(translatedMessage);

            const aiResponse = {
                id: messages.length + 2,
                text: aiResponseText,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Error in handleSendMessage:', error);

            // Fallback response
            const fallbackMessage = locale === 'fr'
                ? "Je suis désolé, j'ai des difficultés techniques en ce moment. Mais je serais ravi de vous parler de Wajahat ! C'est un développeur Fullstack talentueux du Pakistan avec de l'expérience en React, Next.js, Node.js et MongoDB. Ses projets incluent DevBlog, EcomStore et ChatPortfolio AI. Que souhaitez-vous savoir sur son travail ?"
                : "I'm sorry, I'm having some technical difficulties right now. But I'd be happy to tell you about Wajahat! He's a talented Fullstack Developer from Pakistan with experience in React, Next.js, Node.js, and MongoDB. His projects include DevBlog, EcomStore, and ChatPortfolio AI. What would you like to know about his work?";

            const fallbackResponse = {
                id: messages.length + 2,
                text: fallbackMessage,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, fallbackResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={styles.backButton}>
                    ← Back to Portfolio
                </Link>
                <h1>WajahatBot 🤖</h1>
                <p>{locale === 'fr' ? 'Posez-moi vos questions sur Wajahat !' : 'Ask me about Wajahat!'}</p>
            </div>

            <div className={styles.chatContainer}>
                <div className={styles.messages}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${styles[message.sender]}`}
                        >
                            <div className={styles.messageContent}>
                                <div className={styles.messageText}>{message.text}</div>
                                <div className={styles.messageTime}>
                                    {formatTime(message.timestamp)}
                                </div>
                            </div>
                            {message.sender === 'ai' && (
                                <div className={styles.aiIndicator}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className={`${styles.message} ${styles.ai}`}>
                            <div className={styles.messageContent}>
                                <div className={styles.typingIndicator}>
                                    <div className={styles.typingDot}></div>
                                    <div className={styles.typingDot}></div>
                                    <div className={styles.typingDot}></div>
                                </div>
                            </div>
                            <div className={styles.aiIndicator}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.inputContainer}>
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={locale === 'fr' 
                            ? "Posez-moi vos questions sur les projets, compétences ou expérience de Wajahat..."
                            : "Ask me about Wajahat's projects, skills, or experience..."
                        }
                        className={styles.messageInput}
                        rows="1"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className={styles.sendButton}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

const Chatbot = () => {
    return (
        <Suspense fallback={
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>WajahatBot 🤖</h1>
                    <p>Loading...</p>
                </div>
                <div className={styles.chatContainer}>
                    <div className={styles.messages}>
                        <div className={`${styles.message} ${styles.ai}`}>
                            <div className={styles.messageContent}>
                                <div className={styles.messageText}>Loading chatbot...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <ChatbotContent />
        </Suspense>
    );
};

export default Chatbot;