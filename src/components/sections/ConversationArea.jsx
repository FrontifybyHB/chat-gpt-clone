import React, { useState } from 'react'
import InputArea from './InputArea'
import Messages from './Messages'
import * as webllm from "@mlc-ai/web-llm";
import PermissionModel from './PermissionModel'
import DowloadProgress from './DowloadProgress'

const ConversationArea = () => {
    const [messages, setMessages] = useState([
        {
            role: "system",
            content: "You are a helpful assistant that can help me with my tasks."
        }
    ])

    const [input, setInput] = useState("")
    const [engine, setEngine] = useState(null)
    const [showPermissionModal, setShowPermissionModal] = useState(true)
    const [isDownloading, setIsDownloading] = useState(false)
    const [downloadProgress, setDownloadProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const downloadLocalLLM = async () => {
        setIsDownloading(true)
        setShowPermissionModal(false)

        // const selectedtool = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
        const selectedtool = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

        try {
            const engine = await webllm.CreateMLCEngine(selectedtool, {
                initProgressCallback: (initProgress) => {
                    setDownloadProgress(Math.round(initProgress.progress * 100))
                    console.log("initProgress", initProgress)
                }
            })

            setEngine(engine)
            setIsDownloading(false)
        } catch (err) {
            console.log("err", err)
            setIsDownloading(false)
            setMessages([...messages, {
                role: "assistant",
                content: "Failed to download the local model. Please try again or check your internet connection."
            }])
        }
    }

    const skipDownload = () => {
        setShowPermissionModal(false)
        setMessages([...messages, {
            role: "assistant",
            content: "You chose to skip the local model download. You can refresh the page to try again later."
        }])
    }

    const sendMessageToLocalLLM = async () => {
        if (input.trim() === "" || isLoading || !engine) return;

        const tempMessages = [...messages];
        tempMessages.push({
            role: "user",
            content: input
        })

        setMessages(tempMessages)
        setInput("")
        setIsLoading(true)

        try {
            const reply = await engine.chat.completions.create({
                messages: tempMessages,
            })

            const text = reply.choices[0].message.content
            setMessages([...tempMessages, {
                role: "assistant",
                content: text
            }])
        } catch (error) {
            console.error("Local LLM error:", error)
            setMessages([...tempMessages, {
                role: "assistant",
                content: "Sorry, there was an error processing your message. Please try again."
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const sendMesageToLlm = () => {
        if (engine) {
            sendMessageToLocalLLM()
        } else {
            setMessages([...messages, {
                role: "assistant",
                content: "Please download the local model first to start chatting."
            }])
        }
    }

    return (
        <div className="conversation-area">
            {showPermissionModal && (
                <PermissionModel
                    downloadLocalLLM={downloadLocalLLM} 
                    useAPIMode={skipDownload}
                />
            )}

            {isDownloading && (
                <DowloadProgress downloadProgress={downloadProgress} />
            )}

            <Messages messages={messages} />
            <InputArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sendMesageToLlm={sendMesageToLlm}
                disabled={isDownloading || isLoading || !engine}
            />
        </div>
    )
}

export default ConversationArea