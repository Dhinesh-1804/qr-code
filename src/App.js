import { useState } from "react";
import "./App.css";

function QrCode(){
    const [img,setImg]= useState("");
    const [loading,setLoading]=useState(false);
    const [qrData,setQrData]=useState("")
    const [qrSize,setQrSize] =useState("")
    async function generateQR(){
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}×${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
          console.error("Error generating QR code",error);
        }finally{
            setLoading(false);
        }
    }
    function downloadQR(){
        fetch(img).then((response) => response.blob()).then((blob) =>{
            const link = document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrcode.png";
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{
            console.error("Error downloading QR",error)
        })

    }
    return <div className="app-container">
        <h1> QR CODE GENERATOR</h1>
        {loading &&<p>Please wait...</p>}
        {img && <img src={img} className="qr-code-image"/>}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data For QR Code:
            </label>
            <input type="text" value={qrData} id="dataInput" placeholder="Enter Data for QR Code" onChange={(e)=>setQrData(e.target.value)}/>
            <label htmlFor="sizeInput" className="input-label">
                Image size (e.g.,150)
            </label>
            <input type="text" value={qrSize} onChange={(e)=>setQrSize(e.target.value)} id="sizeInput" placeholder="Enter image size"/>
            <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className="dowload-button" onClick={downloadQR}>Download QR Code</button>
            
        </div>
        <h4 className="footer"> Designed By Dhinesh</h4>
    
    </div>
}
export default QrCode ;
