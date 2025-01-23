import { useState } from "react"
import { QRCodeSVG } from 'qrcode.react';
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
        <div>
            <h2>qr code generator</h2>
            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
            <button onClick={handleGenerate}>generate QR</button>
            <select onChange={(e) => setColor(e.target.value)}>
                <option value="black">black</option>
                <option value="blue">blue</option>
                <option value="red">red</option>
                <option value="magenta">magenta</option>
                <option value="gold">gold</option>
                <option value="green">green</option>
            </select>
            {qrValue && <QRCodeSVG value={link} size={200} fgColor={color} />}
        </div>
    )
}

export default Qrcode