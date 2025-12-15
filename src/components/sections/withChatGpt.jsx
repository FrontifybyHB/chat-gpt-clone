// import React, {  useState } from 'react'
// import InputArea from './InputArea'
// import Messages from './Messages'
// import * as webllm from "@mlc-ai/web-llm";
// import OpenAI from "openai";
// import PermissionModel from './PermissionModel'
// import DowloadProgress from './DowloadProgress'

// const ConversationArea = () => {
//     const [messages, setMessages] = useState([
//         {
//             role: "system",
//             content: "You are a helpful assistant that can help me with my tasks."
//         }
//     ])

//     const openaiKey = import.meta.env.VITE_OPENAI_API_KEY
    
//     // Initialize OpenAI client
//     const openai = new OpenAI({
//         apiKey: openaiKey,
//         dangerouslyAllowBrowser: true
//     });

//     const [input, setInput] = useState("")
//     const [engine, setEngine] = useState(null)
//     const [showPermissionModal, setShowPermissionModal] = useState(true)
//     const [useLocalLLM, setUseLocalLLM] = useState(false)
//     const [isDownloading, setIsDownloading] = useState(false)
//     const [downloadProgress, setDownloadProgress] = useState(0)
//     const [isLoading, setIsLoading] = useState(false)

//     const downloadLocalLLM = async () => {
//         setIsDownloading(true)
//         setShowPermissionModal(false)

//         // const selectedtool = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
//         const selectedtool = "snowflake-arctic-embed-s-q0f32-MLC-b4";

//         try {
//             const engine = await webllm.CreateMLCEngine(selectedtool, {
//                 initProgressCallback: (initProgress) => {
//                     setDownloadProgress(Math.round(initProgress.progress * 100))
//                     console.log("initProgress", initProgress)
//                 }
//             })

//             setEngine(engine)
//             setUseLocalLLM(true)
//             setIsDownloading(false)
//         } catch (err) {
//             console.log("err", err)
//             setIsDownloading(false)
//             setUseLocalLLM(false)
//         }
//     }

//     const useAPIMode = () => {
//         setShowPermissionModal(false)
//         setUseLocalLLM(false)
//     }

//     const sendMessageToLocalLLM = async () => {
//         const tempMessages = [...messages];
//         tempMessages.push({
//             role: "user",
//             content: input
//         })

//         setMessages(tempMessages)
//         setInput("")
//         setIsLoading(true)

//         try {
//             const reply = await engine.chat.completions.create({
//                 messages: tempMessages,
//             })

//             const text = reply.choices[0].message.content
//             setMessages([...tempMessages, {
//                 role: "assistant",
//                 content: text
//             }])
//         } catch (error) {
//             console.error("Local LLM error:", error)
//             sendMessageToAPI(tempMessages)
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

//     const sendMessageToAPI = async (tempMessages = null, retryCount = 0) => {
//         const messagesToSend = tempMessages || [...messages, {
//             role: "user",
//             content: input
//         }]

//         if (!tempMessages) {
//             setMessages(messagesToSend)
//             setInput("")
//         }

//         setIsLoading(true)

//         try {
//             const chatCompletion = await openai.chat.completions.create({
//                 model: "gpt-4o-mini",
//                 messages: messagesToSend
//             });

//             const text = chatCompletion.choices[0].message.content

//             setMessages([...messagesToSend, {
//                 role: "assistant",
//                 content: text
//             }])
//         } catch (error) {
//             console.error("API error:", error)
            
//             // Handle specific OpenAI errors
//             if (error.status === 429) {
//                 // Rate limit error - retry with exponential backoff
//                 if (retryCount < 3) {
//                     const waitTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
//                     setMessages([...messagesToSend, {
//                         role: "assistant",
//                         content: `Rate limit reached. Retrying in ${waitTime/1000} seconds...`
//                     }])
                    
//                     await sleep(waitTime)
//                     return sendMessageToAPI(tempMessages, retryCount + 1)
//                 } else {
//                     setMessages([...messagesToSend, {
//                         role: "assistant",
//                         content: "Sorry, I'm experiencing high traffic. Please try again in a few minutes, or consider using the local model for offline chat."
//                     }])
//                 }
//             } else if (error.status === 401) {
//                 setMessages([...messagesToSend, {
//                     role: "assistant",
//                     content: "Authentication error. Please check your API key."
//                 }])
//             } else if (error.status === 503) {
//                 setMessages([...messagesToSend, {
//                     role: "assistant",
//                     content: "OpenAI servers are currently overloaded. Please try again later."
//                 }])
//             } else {
//                 setMessages([...messagesToSend, {
//                     role: "assistant",
//                     content: "Sorry, I'm having trouble connecting. Please try again or use the local model."
//                 }])
//             }
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const sendMesageToLlm = () => {
//         if (input.trim() === "" || isLoading) return;
        
//         if (useLocalLLM && engine) {
//             sendMessageToLocalLLM()
//         } else {
//             sendMessageToAPI()
//         }
//     }

//     return (
//         <div className="conversation-area">
//             {showPermissionModal && (
//                 <PermissionModel
//                     downloadLocalLLM={downloadLocalLLM} 
//                     useAPIMode={useAPIMode}
//                 />
//             )}

//             {isDownloading && (
//                 <DowloadProgress downloadProgress={downloadProgress} />
//             )}

//             <Messages messages={messages} />
//             <InputArea
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 sendMesageToLlm={sendMesageToLlm}
//                 disabled={isDownloading}
//             />
//         </div>
//     )
// }

// export default ConversationArea
