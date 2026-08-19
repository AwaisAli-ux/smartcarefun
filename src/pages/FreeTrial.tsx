import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, User, Phone, Check, ChevronLeft } from "lucide-react";

interface ConfettiPiece {
  id: number;
  r: string;
  x: string;
  y: string;
  width: string;
  height: string;
  background: string;
  borderRadius: string;
  animationDelay: string;
}

const FreeTrial = () => {
  const navigate = useNavigate();
  const [isRevealed, setIsRevealed] = useState(false);
  const [step, setStep] = useState<"phone" | "name">("phone");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleClaimClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(e);
    setIsRevealed(true);
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 350);
  };

  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${(e.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2}px`;
    ripple.style.top = `${(e.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 620);
  };

  const spawnConfetti = () => {
    const colors = ["#FFC85C", "#FF8FCF", "#6D5DF6", "#2CC9B4", "#FF9E4C"];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 36; i++) {
      const angle = Math.random() * 360;
      const distance = 110 + Math.random() * 160;
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad) * distance;
      const y = Math.sin(rad) * distance + 40;
      const size = 5 + Math.random() * 6;

      pieces.push({
        id: i,
        r: `${Math.random() * 900 - 450}deg`,
        x: `${x}px`,
        y: `${y}px`,
        width: `${size}px`,
        height: `${Math.random() > 0.5 ? size : size * 1.6}px`,
        background: colors[Math.floor(Math.random() * colors.length)],
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        animationDelay: `${Math.random() * 0.18}s`,
      });
    }

    setConfetti(pieces);
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 10);
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneError("");
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handlePhoneNext = (e: React.FormEvent) => {
    e.preventDefault();
    const rawDigits = phone.replace(/\D/g, "");
    if (rawDigits.length !== 10) {
      setPhoneError("Please enter a complete 10-digit phone number.");
      phoneInputRef.current?.focus();
      return;
    }

    setPhoneError("");
    setStep("name");
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 200);
  };

  const handleFinalSubmit = async (customName?: string) => {
    const submittedName = (typeof customName === "string" ? customName : name).trim();
    setIsSubmitting(true);

    try {
      await fetch("https://formsubmit.co/ajax/support@smartcaretv.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `⚡ New Free Trial Request: ${submittedName || `+1 ${phone}`}`,
          _captcha: "false",
          _template: "table",
          "Customer Name": submittedName || "Not Provided (Skipped)",
          "Phone / WhatsApp": `+1 ${phone}`,
          "Request Type": "FREE TRIAL UNLOCK (24H Instant Access)",
          SubmittedAt: new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
      spawnConfetti();
      setShowSuccess(true);
    }
  };

  const handleDoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(e);
    setShowSuccess(false);
    navigate("/");
  };

  const rawDigitsCount = phone.replace(/\D/g, "").length;

  return (
    <div className="free-trial-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

        .free-trial-container {
          --spring: cubic-bezier(.34, 1.56, .64, 1);
          --smooth: cubic-bezier(.22, 1, .36, 1);
          --gold: #FFC85C;
          --amber: #FF9E4C;
          --pink: #FF8FCF;
          --violet: #6D5DF6;
          --teal: #2CC9B4;
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          background:
            radial-gradient(circle at 15% 10%, var(--violet) 0%, transparent 55%),
            radial-gradient(circle at 88% 88%, var(--teal) 0%, transparent 50%),
            radial-gradient(circle at 75% 20%, rgba(255,143,207,0.2) 0%, transparent 45%),
            linear-gradient(160deg, #221B4D 0%, #150F33 60%, #0E0A24 100%);
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .screen {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 26px 20px;
          overflow: hidden;
          background: transparent;
        }

        .aurora {
          position: absolute;
          inset: -30%;
          background: radial-gradient(circle at 25% 25%, rgba(109,93,246,0.4), transparent 50%),
                      radial-gradient(circle at 75% 75%, rgba(44,201,180,0.3), transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255,143,207,0.2), transparent 45%);
          filter: blur(60px);
          animation: drift 14s ease-in-out infinite alternate;
          z-index: 0;
          pointer-events: none;
        }

        @keyframes drift {
          0%   { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(3%,-4%) rotate(8deg); }
        }

        .dot {
          position: absolute;
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
          animation: float 6s var(--smooth) infinite;
        }
        .dot:nth-child(2){ width:12px; height:12px; background:var(--gold); top:14%; left:10%; animation-delay:0s; }
        .dot:nth-child(3){ width:8px;  height:8px;  background:var(--teal); top:18%; right:12%; animation-delay:1.2s; }
        .dot:nth-child(4){ width:6px;  height:6px;  background:var(--pink); top:65%; left:6%; animation-delay:2s; }
        .dot:nth-child(5){ width:10px; height:10px; background:var(--violet); bottom:15%; right:8%; animation-delay:0.6s; }
        .dot:nth-child(6){ width:7px;  height:7px;  background:var(--gold); bottom:25%; left:16%; animation-delay:2.6s; }
        .dot:nth-child(7){ width:8px;  height:8px;  background:var(--teal); top:38%; left:24%; animation-delay:1.8s; }
        .dot:nth-child(8){ width:6px;  height:6px;  background:var(--pink); top:48%; right:20%; animation-delay:0.9s; }
        .dot:nth-child(9){ width:9px;  height:9px;  background:var(--gold); bottom:35%; right:26%; animation-delay:3.1s; }

        @keyframes float {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.85; }
          50%     { transform: translateY(-18px) scale(1.2); opacity: 1; }
        }

        .back-nav {
          position: absolute;
          top: 22px;
          left: 24px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 20px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          transition: all 0.25s ease;
        }
        .back-nav:hover {
          color: #fff;
          background: rgba(255,255,255,0.12);
          transform: translateX(-2px);
        }

        .logo {
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 12.5px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          z-index: 2;
          opacity: 0;
          animation: fade-down 0.6s var(--smooth) 0.1s forwards;
        }
        .logo span { color: var(--gold); }

        @keyframes fade-down {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }

        .card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          text-align: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 38px 26px 30px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          transition: filter 0.4s var(--smooth), transform 0.4s var(--smooth), max-height 0.4s var(--smooth);
          opacity: 0;
          animation: card-in 0.7s var(--spring) 0.15s forwards;
        }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(28px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hero-stage {
          position: relative;
          width: 92px;
          height: 92px;
          margin: 0 auto 20px;
          transition: width 0.5s var(--spring), height 0.5s var(--spring), margin 0.5s var(--spring);
        }

        .hero-glow {
          position: absolute;
          inset: -18px;
          background: radial-gradient(circle, rgba(255,200,92,0.45), transparent 70%);
          filter: blur(10px);
          animation: glow-pulse 2.6s ease-in-out infinite;
          transition: opacity 0.4s ease;
        }

        @keyframes glow-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.92); }
          50%     { opacity: 1; transform: scale(1.08); }
        }

        .hero-box {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 26px;
          background: linear-gradient(145deg, var(--gold), var(--amber));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          box-shadow: 0 14px 32px rgba(255,158,76,0.35), inset 0 1px 0 rgba(255,255,255,0.4);
          opacity: 0;
          animation: hero-in 0.75s var(--spring) 0.35s forwards, bob 3s var(--smooth) 1.1s infinite;
          transition: width 0.5s var(--spring), height 0.5s var(--spring), font-size 0.5s var(--spring);
        }

        @keyframes hero-in {
          0%   { opacity: 0; transform: scale(0.3) rotate(-50deg); }
          65%  { opacity: 1; transform: scale(1.12) rotate(6deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes bob {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50%     { transform: translateY(-9px) rotate(3deg); }
        }

        .card.revealed .hero-stage { width: 52px; height: 52px; margin-bottom: 14px; }
        .card.revealed .hero-box { font-size: 24px; animation: none; transform: none; }
        .card.revealed .hero-glow { opacity: 0; }

        .title-text {
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          color: #FFFFFF;
          font-size: 24px;
          line-height: 1.22;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
          opacity: 0;
          animation: text-in 0.6s var(--smooth) 0.5s forwards;
        }

        .title-text span {
          background: linear-gradient(90deg, var(--gold), var(--pink));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: sheen 3.5s linear infinite;
        }

        @keyframes sheen {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .sub {
          color: rgba(255,255,255,0.62);
          font-size: 14px;
          line-height: 1.5;
          max-width: 320px;
          margin: 0 auto 24px;
          opacity: 0;
          animation: text-in 0.6s var(--smooth) 0.6s forwards;
        }

        @keyframes text-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .claim-btn {
          position: relative;
          width: 100%;
          padding: 17px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(90deg, var(--gold), var(--amber));
          color: #221B4D;
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(255,158,76,0.28);
          opacity: 0;
          animation: text-in 0.6s var(--smooth) 0.7s forwards;
          transition: transform 0.25s var(--spring), box-shadow 0.25s var(--smooth),
                      opacity 0.3s ease, max-height 0.4s var(--smooth), padding 0.4s var(--smooth), margin 0.4s var(--smooth);
        }

        .claim-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: shine 2.8s ease-in-out infinite;
        }

        @keyframes shine {
          0%   { left: -60%; }
          45%  { left: 130%; }
          100% { left: 130%; }
        }

        .claim-btn:active {
          transform: scale(0.96);
          box-shadow: 0 4px 14px rgba(255,158,76,0.24);
        }

        .card.revealed .claim-btn {
          opacity: 0;
          max-height: 0;
          padding: 0;
          margin: 0;
          pointer-events: none;
        }

        .reveal-form {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(-6px);
          transition: max-height 0.55s var(--spring), opacity 0.45s ease 0.15s, transform 0.45s var(--smooth) 0.1s;
        }

        .card.revealed .reveal-form {
          max-height: 380px;
          opacity: 1;
          transform: translateY(0);
        }

        .field {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 14px;
          padding: 4px;
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }

        .field:focus-within {
          border-color: var(--gold);
          background: rgba(255,255,255,0.1);
          box-shadow: 0 0 0 4px rgba(255,200,92,0.12);
        }

        .field.error {
          border-color: #ff5555;
          box-shadow: 0 0 0 4px rgba(255,85,85,0.15);
        }

        .cc {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          color: rgba(255,255,255,0.75);
          padding: 14px 10px 14px 14px;
          border-right: 1px solid rgba(255,255,255,0.16);
        }

        .field-icon {
          padding: 14px 10px 14px 14px;
          color: rgba(255,255,255,0.6);
          border-right: 1px solid rgba(255,255,255,0.16);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .input-box {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-size: 15.5px;
          font-weight: 500;
          padding: 14px 12px;
        }

        .input-box::placeholder {
          color: rgba(255,255,255,0.32);
        }

        .digit-badge {
          position: absolute;
          right: 12px;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          background: rgba(0,0,0,0.25);
          padding: 3px 8px;
          border-radius: 8px;
          pointer-events: none;
        }

        .digit-badge.complete {
          color: #2CC9B4;
          background: rgba(44,201,180,0.15);
        }

        .error-text {
          font-size: 12px;
          color: #ff7777;
          text-align: left;
          margin-top: 6px;
          padding-left: 6px;
          font-weight: 500;
        }

        .submit-btn {
          position: relative;
          width: 100%;
          margin-top: 12px;
          padding: 16px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(90deg, var(--gold), var(--amber));
          color: #221B4D;
          font-family: 'Sora', sans-serif;
          font-size: 15.5px;
          font-weight: 700;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(255,158,76,0.28);
          transition: transform 0.25s var(--spring), box-shadow 0.25s var(--smooth);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:active {
          transform: scale(0.96);
        }

        .submit-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .skip-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.55);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          padding: 6px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .skip-btn:hover {
          color: #FFFFFF;
          background: rgba(255,255,255,0.06);
        }

        .step-back-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s ease;
        }

        .step-back-btn:hover {
          color: var(--gold);
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(34,27,77,0.28);
          transform: scale(0);
          animation: ripple-anim 0.6s ease-out forwards;
          pointer-events: none;
        }

        @keyframes ripple-anim {
          to { transform: scale(3.2); opacity: 0; }
        }

        .fine {
          margin-top: 14px;
          font-size: 11.5px;
          color: rgba(255,255,255,0.32);
          line-height: 1.5;
        }

        .card.success-active {
          filter: blur(3px);
          transform: scale(0.98);
        }

        /* ================= SUCCESS POPUP ================= */
        .overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(9,7,24,0);
          backdrop-filter: blur(0px);
          pointer-events: none;
          transition: background 0.45s var(--smooth), backdrop-filter 0.45s var(--smooth);
        }

        .overlay.show {
          background: rgba(9,7,24,0.6);
          backdrop-filter: blur(3px);
          pointer-events: auto;
        }

        .popup {
          width: 86%;
          max-width: 320px;
          text-align: center;
          background: linear-gradient(165deg, #2B2260, #180F3D);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 26px;
          padding: 34px 24px 28px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.5);
          transform: scale(0.3) translateY(60px) rotate(-6deg);
          opacity: 0;
        }

        .overlay.show .popup {
          animation: pop-in 0.75s var(--spring) forwards;
        }

        @keyframes pop-in {
          0%   { transform: scale(0.3) translateY(60px) rotate(-6deg); opacity: 0; }
          55%  { transform: scale(1.08) translateY(-10px) rotate(2deg); opacity: 1; }
          75%  { transform: scale(0.97) translateY(2px) rotate(-1deg); }
          100% { transform: scale(1) translateY(0) rotate(0deg); opacity: 1; }
        }

        .mascot-stage {
          position: relative;
          width: 88px;
          height: 88px;
          margin: 0 auto 18px;
        }

        .mascot-ring {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 2px solid rgba(255,200,92,0.4);
          opacity: 0;
        }

        .overlay.show .mascot-ring {
          animation: ring-expand 1.4s var(--smooth) 0.3s infinite;
        }

        @keyframes ring-expand {
          0%   { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .mascot {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: linear-gradient(145deg, var(--gold), var(--amber));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 46px;
          box-shadow: 0 14px 30px rgba(255,158,76,0.4), inset 0 1px 0 rgba(255,255,255,0.4);
          animation: mascot-wiggle 1.7s var(--smooth) infinite 0.75s;
        }

        @keyframes mascot-wiggle {
          0%,100% { transform: rotate(0deg) scale(1); }
          20%     { transform: rotate(-10deg) scale(1.08); }
          50%     { transform: rotate(0deg) scale(0.98); }
          75%     { transform: rotate(9deg) scale(1.06); }
        }

        .popup h2 {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: 24px;
          color: #FFFFFF;
          margin-bottom: 8px;
          opacity: 0;
        }

        .overlay.show .popup h2 {
          animation: text-in 0.5s var(--smooth) 0.45s forwards;
        }

        .popup h2 span {
          background: linear-gradient(90deg, var(--gold), var(--pink));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .popup p {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.55;
          margin-bottom: 22px;
          opacity: 0;
        }

        .overlay.show .popup p {
          animation: text-in 0.5s var(--smooth) 0.55s forwards;
        }

        .popup p strong {
          color: rgba(255,255,255,0.85);
        }

        .done-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(90deg, var(--gold), var(--amber));
          color: #221B4D;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          opacity: 0;
          transition: transform 0.25s var(--spring);
          position: relative;
          overflow: hidden;
        }

        .overlay.show .done-btn {
          animation: text-in 0.5s var(--smooth) 0.65s forwards;
        }

        .done-btn:active {
          transform: scale(0.96);
        }

        .confetti-piece {
          position: absolute;
          top: 50%;
          left: 50%;
          opacity: 0;
          pointer-events: none;
          animation: burst 1.3s var(--smooth) forwards;
        }

        @keyframes burst {
          0%   { opacity: 1; transform: translate(-50%,-50%) rotate(0deg) translate(0,0) scale(1); }
          70%  { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%,-50%) rotate(var(--r)) translate(var(--x), var(--y)) scale(0.35); }
        }
      `}</style>

      <div className="screen">
        <Link to="/" className="back-nav">
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>

        <div className="aurora"></div>

        <div className="logo">
          SMART CARE <span>TV</span>
        </div>

        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>

        <div className={`card ${isRevealed ? "revealed" : ""} ${showSuccess ? "success-active" : ""}`}>
          <div className="hero-stage">
            <div className="hero-glow"></div>
            <div className="hero-box">{step === "name" ? "👤" : "🎁"}</div>
          </div>

          <h1 className="title-text">
            {step === "name" ? (
              <>What's your <span>Name?</span></>
            ) : (
              <>Congratulations!<br />You've unlocked a <span>Free Trial</span></>
            )}
          </h1>

          <p className="sub">
            {step === "name"
              ? "Optional — helps us personalize your instant access."
              : "Tap below to claim instant access. No card required."}
          </p>

          <button className="claim-btn" onClick={handleClaimClick}>
            Claim Your Free Trial
          </button>

          <div className="reveal-form">
            {step === "phone" ? (
              <form onSubmit={handlePhoneNext}>
                <div className={`field ${phoneError ? "error" : ""}`}>
                  <span className="cc">+1</span>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="(555) 000-0000"
                    className="input-box"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                  <span className={`digit-badge ${rawDigitsCount === 10 ? "complete" : ""}`}>
                    {rawDigitsCount === 10 ? (
                      <span className="flex items-center gap-1"><Check className="w-3 h-3 inline" /> 10 digits</span>
                    ) : (
                      `${rawDigitsCount}/10`
                    )}
                  </span>
                </div>

                {phoneError && <p className="error-text">{phoneError}</p>}

                <button
                  type="submit"
                  className="submit-btn"
                  onClick={(e) => addRipple(e)}
                >
                  Continue →
                </button>
                <p className="fine">By continuing you agree to receive one text message.</p>
              </form>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="step-back-btn"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back to Phone ({phone})
                </button>

                <form onSubmit={(e) => { e.preventDefault(); handleFinalSubmit(); }}>
                  <div className="field">
                    <span className="field-icon">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      ref={nameInputRef}
                      type="text"
                      placeholder="Your Name (Optional)"
                      className="input-box"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                    onClick={(e) => addRipple(e)}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Activating Trial...</span>
                      </>
                    ) : (
                      "Complete & Get Free Trial 🎉"
                    )}
                  </button>

                  <button
                    type="button"
                    className="skip-btn"
                    disabled={isSubmitting}
                    onClick={() => handleFinalSubmit("Not Provided")}
                  >
                    Skip & Complete
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className={`overlay ${showSuccess ? "show" : ""}`}>
          {confetti.map((c) => (
            <div
              key={c.id}
              className="confetti-piece"
              style={
                {
                  "--r": c.r,
                  "--x": c.x,
                  "--y": c.y,
                  width: c.width,
                  height: c.height,
                  background: c.background,
                  borderRadius: c.borderRadius,
                  animationDelay: c.animationDelay,
                } as React.CSSProperties
              }
            />
          ))}

          <div className="popup">
            <div className="mascot-stage">
              <div className="mascot-ring"></div>
              <div className="mascot">🎉</div>
            </div>
            <h2>
              You're <span>In!</span>
            </h2>
            <p>
              Your free trial is confirmed. We just sent your <strong>access details</strong> — check your messages.
            </p>
            <button className="done-btn" onClick={handleDoneClick}>
              Awesome, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
