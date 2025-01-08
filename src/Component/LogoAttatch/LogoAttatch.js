import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import BlankTShirt from "../../Images/mockup-black-t-shirt.png";

const LogoAttatch = () => {
  const [logo, setLogo] = useState(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState(100);
  const tshirtRef = useRef(null);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle dragging the logo
  const handleDragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      })
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = tshirtRef.current.getBoundingClientRect();
    const { offsetX, offsetY } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );
    setPosition({
      x: e.clientX - rect.left - offsetX,
      y: e.clientY - rect.top - offsetY,
    });
  };

  const handleDragOver = (e) => e.preventDefault();

  // Handle resizing the logo
  const handleResize = (e) =>
    setSize(Math.max(50, parseInt(e.target.value, 10)));

  // Handle downloading the final image
  const handleDownload = async () => {
    const canvasElement = tshirtRef.current;
    const canvas = await html2canvas(canvasElement, {
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = "tshirt-with-logo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>Task 2</h2>

        <div className="logo-attatch-container">
          {/* T-Shirt Image div */}
          <div
            ref={tshirtRef}
            className="tshirt-container"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <img src={BlankTShirt} alt="T-Shirt" className="tshirt-image" />
            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="logo"
                draggable
                onDragStart={handleDragStart}
                style={{
                  position: "absolute",
                  top: position.y,
                  left: position.x,
                  width: size,
                  height: "auto",
                }}
              />
            )}
          </div>

          {/* Lgog Controls div */}
          <div className="controls">
            <label>
              Upload Logo:
              <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </label>{" "}
            <br />
            <label>
              Resize Logo:
              <input
                type="range"
                min="50"
                max="300"
                value={size}
                onChange={handleResize}
              />
            </label>
            <br />
            <button onClick={handleDownload}>Download Final T-Shirt</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoAttatch;
