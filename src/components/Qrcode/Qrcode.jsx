import { useState } from "react"
import { QRCodeSVG } from 'qrcode.react';
import './Qrcode.css'
const Qrcode = () => {
    const [link, setLink] = useState('')
    const [qrValue, setQrValue] = useState('')
    const [color, setColor] = useState('black')
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
    return (
        <div className="qrcode-wrapper">
            <h2 className="title"><span className="qr-title">QR</span> Code Generator</h2>
            <div className="options">
                <input type="text" className="text-box" placeholder="enter your link" value={link} onChange={(e) => setLink(e.target.value)} />
                <button className="generate" onClick={handleGenerate}>generate QR</button>
            </div>
            <select className="select-color" onChange={(e) => setColor(e.target.value)}>
                <option value="black">black</option>
                <option value="blue">blue</option>
                <option value="red">red</option>
                <option value="magenta">magenta</option>
                <option value="gold">gold</option>
                <option value="green">green</option>
            </select>
            <div className="qrcode">
                {qrValue && <QRCodeSVG value={link} size={200} fgColor={color} />}
            </div>
        </div>
    )
}

export default Qrcode