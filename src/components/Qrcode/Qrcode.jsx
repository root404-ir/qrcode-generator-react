import { useState } from "react"
import { QRCodeSVG } from 'qrcode.react';
import './Qrcode.css'
const Qrcode = () => {
    const [link, setLink] = useState('')
    const [qrValue, setQrValue] = useState('')
    const [color, setColor] = useState('black')
    const [size, setSize] = useState(128)
    const isValidUrl = str => {
        try {
            new URL(str)
            return true
        } catch {
            return false
        }
    }

    const handleGenerate = () => {
        if (link && isValidUrl(link)) {
            setQrValue(link)
        } else {
            setQrValue('')
        }
    }

    const downloadQrCode = () => {
        const svgElement = document.querySelector('svg')
        if (!svgElement) {
            alert("could not find qrcode");
            return;
        }
        const canvas = document.createElement('canvas')
        const context = canvas.getContext("2d")

        const img = new Image()
        const svgData = new XMLSerializer().serializeToString(svgElement)

        const svgBlob = new Blob([svgData], { type: "image/svg+xml" })
        const url = URL.createObjectURL(svgBlob)

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height

            context.drawImage(img, 0, 0)

            const pngUrl = canvas.toDataURL("image/png")

            const a = document.createElement('a')
            a.href = pngUrl
            a.download = "QRcode.png"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            URL.revokeObjectURL(url)
        }
        img.src = url
    }

    return (
        <div className="qrcode-wrapper">
            <h2 className="title"><span className="qr-title">QR</span> Code Generator</h2>
            <div className="generate-qr">
                <input type="text" className="text-box" placeholder="enter your link" value={link} onChange={(e) => setLink(e.target.value)} />
                <button className="generate" onClick={handleGenerate}>generate QR</button>
            </div>
            <div className="options">
                <select className="select-option" onChange={(e) => setColor(e.target.value)}>
                    <option>choose QR color</option>
                    <option value="black">black</option>
                    <option value="blue">blue</option>
                    <option value="red">red</option>
                    <option value="magenta">magenta</option>
                    <option value="gold">gold</option>
                    <option value="green">green</option>
                </select>
                <select className="select-option" onChange={(e) => setSize(e.target.value)}>
                    <option>choose QR size</option>
                    <option value={128}>128</option>
                    <option value={200}>200</option>
                    <option value={240}>240</option>
                    <option value={260}>260</option>
                    <option value={300}>300</option>
                </select>
            </div>
            <div className="qrcode">
                {qrValue && <QRCodeSVG value={link} title={link} size={size} fgColor={color} />}
            </div>
            {qrValue && (
                <div>
                    <button onClick={downloadQrCode} className="downlaod-qr">download this QR</button>
                </div>
            )}
        </div>
    )
}

export default Qrcode