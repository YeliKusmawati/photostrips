"use client";

import { useEffect, useRef, useState } from "react";
import { Space_Grotesk, Quicksand, Playfair_Display } from "next/font/google";

const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"] });

const FILTERS = [
  { label: "Original", emoji: "✨", value: "none" },
  { label: "Soft", emoji: "🌸", value: "brightness(110%) contrast(95%) saturate(115%)" },
  { label: "Golden", emoji: "🌅", value: "sepia(25%) saturate(140%) brightness(108%)" },
  { label: "Ice", emoji: "🧊", value: "hue-rotate(-15deg) saturate(120%) brightness(105%)" },
  { label: "Vintage", emoji: "📼", value: "sepia(55%) contrast(115%) brightness(95%)" },
  { label: "Noir", emoji: "🖤", value: "grayscale(100%) contrast(120%)" },
  { label: "Dreamy", emoji: "💭", value: "brightness(115%) contrast(90%) saturate(130%)" },
  { label: "Y2K", emoji: "💿", value: "saturate(180%) hue-rotate(15deg) contrast(110%)" },
];

const FRAMES = [
  { id: "white", label: "Putih", bg: "#ffffff", accent: "#e9d5ff", pattern: "solid" },
  { id: "pink", label: "Pink", bg: "#fce7f3", accent: "#f9a8d4", pattern: "solid" },
  { id: "purple", label: "Ungu", bg: "#ede9fe", accent: "#c4b5fd", pattern: "solid" },
  { id: "mint", label: "Mint", bg: "#d1fae5", accent: "#6ee7b7", pattern: "solid" },
  { id: "yellow", label: "Kuning", bg: "#fef3c7", accent: "#fcd34d", pattern: "solid" },
  { id: "black", label: "Hitam", bg: "#1f1f1f", accent: "#4b5563", pattern: "solid" },
  { id: "dot-white", label: "Polkadot Putih", bg: "#ffffff", accent: "#f3f4f6", pattern: "dots", patternColor: "#d1d5db" },
  { id: "dot-black", label: "Polkadot Hitam", bg: "#1f1f1f", accent: "#374151", pattern: "dots", patternColor: "#6b7280" },
  { id: "dot-pink", label: "Polkadot Pink", bg: "#fce7f3", accent: "#f9a8d4", pattern: "dots", patternColor: "#f472b6" },
  { id: "dot-purple", label: "Polkadot Ungu", bg: "#ede9fe", accent: "#c4b5fd", pattern: "dots", patternColor: "#a78bfa" },
  { id: "dot-mint", label: "Polkadot Mint", bg: "#d1fae5", accent: "#6ee7b7", pattern: "dots", patternColor: "#34d399" },
  { id: "dot-blue", label: "Polkadot Biru", bg: "#dbeafe", accent: "#93c5fd", pattern: "dots", patternColor: "#60a5fa" },
  { id: "stripe-white", label: "Garis Putih", bg: "#ffffff", accent: "#f3f4f6", pattern: "stripes", patternColor: "#e5e7eb" },
  { id: "stripe-black", label: "Garis Hitam", bg: "#1f1f1f", accent: "#374151", pattern: "stripes", patternColor: "#4b5563" },
  { id: "stripe-pink", label: "Garis Pink", bg: "#fce7f3", accent: "#f9a8d4", pattern: "stripes", patternColor: "#f472b6" },
  { id: "stripe-purple", label: "Garis Ungu", bg: "#ede9fe", accent: "#c4b5fd", pattern: "stripes", patternColor: "#a78bfa" },
  { id: "stripe-mint", label: "Garis Mint", bg: "#d1fae5", accent: "#6ee7b7", pattern: "stripes", patternColor: "#34d399" },
  { id: "grid-white", label: "Grid Putih", bg: "#ffffff", accent: "#f3f4f6", pattern: "grid", patternColor: "#e5e7eb" },
  { id: "grid-black", label: "Grid Hitam", bg: "#1f1f1f", accent: "#374151", pattern: "grid", patternColor: "#4b5563" },
  { id: "grid-pink", label: "Grid Pink", bg: "#fce7f3", accent: "#f9a8d4", pattern: "grid", patternColor: "#f9a8d4" },
  { id: "grid-purple", label: "Grid Ungu", bg: "#ede9fe", accent: "#c4b5fd", pattern: "grid", patternColor: "#c4b5fd" },
  { id: "heart-white", label: "Love Putih", bg: "#ffffff", accent: "#f3f4f6", pattern: "hearts", patternColor: "#d1d5db" },
  { id: "heart-black", label: "Love Hitam", bg: "#1f1f1f", accent: "#374151", pattern: "hearts", patternColor: "#6b7280" },
  { id: "heart-pink", label: "Love Pink", bg: "#fce7f3", accent: "#f9a8d4", pattern: "hearts", patternColor: "#ec4899" },
  { id: "star-white", label: "Bintang Putih", bg: "#ffffff", accent: "#f3f4f6", pattern: "stars", patternColor: "#d1d5db" },
  { id: "star-black", label: "Bintang Hitam", bg: "#1f1f1f", accent: "#374151", pattern: "stars", patternColor: "#6b7280" },
  { id: "star-yellow", label: "Bintang", bg: "#fef3c7", accent: "#fcd34d", pattern: "stars", patternColor: "#f59e0b" },
  { id: "star-purple", label: "Bintang Ungu", bg: "#ede9fe", accent: "#c4b5fd", pattern: "stars", patternColor: "#8b5cf6" },
];

const BACKGROUNDS = [
  { id: "none", label: "Tanpa BG", type: "none" as const },
  { id: "custom", label: "BG Sendiri", type: "custom" as const },
  { id: "soft-pink", label: "Soft Pink", type: "solid" as const, color: "#fef2f2" },
  { id: "soft-purple", label: "Soft Ungu", type: "solid" as const, color: "#f5f3ff" },
  { id: "soft-blue", label: "Soft Biru", type: "solid" as const, color: "#eff6ff" },
  { id: "soft-mint", label: "Soft Mint", type: "solid" as const, color: "#f0fdf4" },
  { id: "soft-yellow", label: "Soft Kuning", type: "solid" as const, color: "#fefce8" },
  { id: "soft-peach", label: "Soft Peach", type: "solid" as const, color: "#fff7ed" },
  { id: "lavender", label: "Lavender", type: "solid" as const, color: "#faf5ff" },
  { id: "cream", label: "Cream", type: "solid" as const, color: "#fffbeb" },
  { id: "emoji-sunflower", label: "Sunflower", type: "emoji" as const, emoji: "🌻", color: "#fefce8" },
  { id: "emoji-rose", label: "Mawar", type: "emoji" as const, emoji: "🌹", color: "#fef2f2" },
  { id: "emoji-leaf", label: "Daun", type: "emoji" as const, emoji: "🍃", color: "#f0fdf4" },
  { id: "emoji-cloud", label: "Langit", type: "emoji" as const, emoji: "☁️", color: "#eff6ff" },
  { id: "emoji-sakura", label: "Sakura", type: "emoji" as const, emoji: "🌸", color: "#fdf2f8" },
  { id: "emoji-butterfly", label: "Kupu", type: "emoji" as const, emoji: "🦋", color: "#f0f9ff" },
  { id: "emoji-mix", label: "Mix", type: "emoji-mix" as const, color: "#faf5ff" },
];

const MIX_EMOJIS = ["🌸", "🌻", "🌹", "🍃", "☁️", "🦋", "✨", "⭐"];

const LAYOUTS = [
  { id: "2", label: "2 Foto", count: 2, cols: 1, type: "grid" },
  { id: "3", label: "3 Foto", count: 3, cols: 1, type: "grid" },
  { id: "4", label: "4 Foto", count: 4, cols: 2, type: "grid" },
  { id: "6", label: "6 Foto", count: 6, cols: 2, type: "grid" },
  { id: "koran-garut", label: "Koran Garut", count: 1, cols: 1, type: "koran-garut" },
];

const STICKER_PRESETS = ["✨", "💖", "🌈", "⭐", "🦋", "🌸", "💫", "🍓", "🧸", "☁️", "🫧", "💿", "🎀", "🌷", "🍒", "🐰"];

const DUMMY_TESTIMONIALS = [
  { emoji: "💖", name: "Sasa", text: "hasilnya cakep banget, langsung jadi feed IG estetik", rating: 5 },
  { emoji: "🌸", name: "Naya", text: "gampang banget dipake, sekali coba langsung suka", rating: 5 },
  { emoji: "✨", name: "Dinda", text: "favorite banget fitur background emoji-nya, unik!", rating: 4 },
];

const FAQS = [
  {
    q: "Photostrip ini beneran gratis?",
    a: "Iya, 100% gratis tanpa watermark, tanpa login, dan tanpa batasan jumlah download. Kamu bisa pakai sepuasnya.",
  },
  {
    q: "Fotoku aman nggak?",
    a: "Aman banget. Semua proses edit terjadi di browser kamu sendiri. Foto nggak pernah di-upload ke server manapun.",
  },
  {
    q: "Bisa dipakai di HP?",
    a: "Bisa! Web ini responsive, jalan lancar di HP Android, iPhone, tablet, maupun laptop.",
  },
  {
    q: "Hasilnya bisa buat Instagram atau TikTok?",
    a: "Tentu. Kalau kamu pakai background, canvas otomatis jadi kotak 1:1 yang pas buat feed IG. Buat TikTok, tinggal crop atau pakai layout portrait.",
  },
  {
    q: "Kenapa rating dan komentarku hilang?",
    a: "Saat ini rating disimpan di browser kamu (localStorage). Kalau kamu hapus cache browser, rating akan hilang. Kami sedang develop versi online biar tersimpan permanen.",
  },
  {
    q: "Bisa bikin koran juga?",
    a: "Bisa! Pilih layout 'Koran Garut' di menu layout, upload 1 foto, dan hasilnya jadi koran aesthetic ala TikTok.",
  },
];

const GARUT_MASTHEAD = "GARUT";
const GARUT_HEADER_LEFT = "Breaking News";
const GARUT_HEADER_CENTER = "SnapManner";
const GARUT_HEADER_RIGHT = "Special Issue";
const GARUT_INFO_VOL = "VOL. 01";
const GARUT_INFO_CENTER = "ABOUT CITY";
const GARUT_HEADLINE = "Garut: Kota yang Penuh Cerita";
const GARUT_SUBHEADLINE = "Keindahan alam dan budaya yang tak pernah pudar";
const GARUT_BADGE = "PESONA ALAM & BUDAYA";
const GARUT_CAPTION = "Foto: Dokumentasi pribadi · Hak cipta dilindungi";
const GARUT_BODY_1 = "Garut adalah sebuah kabupaten di Jawa Barat yang terkenal dengan keindahan alamnya. Dari pegunungan yang hijau hingga pantai selatan yang eksotis, Garut menawarkan pesona yang tak pernah habis untuk dijelajahi.";
const GARUT_BODY_2 = "Selain alam, Garut juga kaya akan budaya dan kuliner khas. Dodol Garut, domba priangan, dan berbagai kesenian tradisional menjadi bagian tak terpisahkan dari identitas kota ini.";

type Sticker = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
};

type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
};

function isDarkBg(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

function drawPattern(ctx: CanvasRenderingContext2D, pattern: string, color: string, W: number, H: number, scale: number = 1) {
  ctx.save();
  ctx.fillStyle = color;
  if (pattern === "dots") {
    const spacing = 24 * scale;
    const radius = 4 * scale;
    for (let y = 0; y < H; y += spacing) {
      for (let x = 0; x < W; x += spacing) {
        const offsetX = (Math.floor(y / spacing) % 2) * (spacing / 2);
        ctx.beginPath();
        ctx.arc(x + offsetX, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (pattern === "stripes") {
    const stripeW = 16 * scale;
    ctx.lineWidth = stripeW;
    ctx.strokeStyle = color;
    for (let i = -H; i < W + H; i += stripeW * 2) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + H, H);
      ctx.stroke();
    }
  } else if (pattern === "grid") {
    const cell = 20 * scale;
    ctx.lineWidth = 1.5 * scale;
    ctx.strokeStyle = color;
    for (let x = 0; x < W; x += cell) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += cell) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
  } else if (pattern === "hearts") {
    const spacing = 40 * scale;
    const size = 14 * scale;
    for (let y = 20 * scale; y < H; y += spacing) {
      for (let x = 20 * scale; x < W; x += spacing) {
        ctx.font = `${size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("♥", x, y);
      }
    }
  } else if (pattern === "stars") {
    const spacing = 36 * scale;
    const size = 14 * scale;
    for (let y = 18 * scale; y < H; y += spacing) {
      for (let x = 18 * scale; x < W; x += spacing) {
        ctx.font = `${size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("★", x, y);
      }
    }
  }
  ctx.restore();
}

function drawEmojiPattern(ctx: CanvasRenderingContext2D, emoji: string, W: number, H: number, scale: number = 1) {
  const spacing = 70 * scale;
  const size = 32 * scale;
  ctx.save();
  ctx.font = `${size}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let row = 0;
  for (let y = spacing / 2; y < H; y += spacing) {
    const offsetX = (row % 2) * (spacing / 2);
    for (let x = spacing / 2 + offsetX; x < W; x += spacing) {
      ctx.fillText(emoji, x, y);
    }
    row++;
  }
  ctx.restore();
}

function drawMixEmojiPattern(ctx: CanvasRenderingContext2D, W: number, H: number, scale: number = 1) {
  const spacing = 70 * scale;
  const size = 28 * scale;
  ctx.save();
  ctx.font = `${size}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let idx = 0;
  let row = 0;
  for (let y = spacing / 2; y < H; y += spacing) {
    const offsetX = (row % 2) * (spacing / 2);
    for (let x = spacing / 2 + offsetX; x < W; x += spacing) {
      const emoji = MIX_EMOJIS[idx % MIX_EMOJIS.length];
      ctx.fillText(emoji, x, y);
      idx++;
    }
    row++;
  }
  ctx.restore();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function getLayoutSlots(layout: typeof LAYOUTS[number], PADDING: number, GAP: number, PHOTO_SIZE: number) {
  const slots: { x: number; y: number; w: number; h: number }[] = [];
  if (layout.type === "grid") {
    for (let i = 0; i < layout.count; i++) {
      const col = i % layout.cols;
      const row = Math.floor(i / layout.cols);
      slots.push({
        x: PADDING + col * (PHOTO_SIZE + GAP),
        y: PADDING + row * (PHOTO_SIZE + GAP),
        w: PHOTO_SIZE,
        h: PHOTO_SIZE,
      });
    }
  }
  return slots;
}

function renderKoranGarut(ctx: CanvasRenderingContext2D, image: HTMLImageElement | null, bw: boolean) {
  const SCALE = 6;
  const W = 600 * SCALE;
  const H = 850 * SCALE;
  const PADDING = 32 * SCALE;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.canvas.width = W;
  ctx.canvas.height = H;

  const textColor = "#1a1a1a";
  const borderColor = "#1a1a1a";

  ctx.fillStyle = "#f5f1e8";
  ctx.fillRect(0, 0, W, H);

  let y = PADDING;

  ctx.fillStyle = textColor;
  ctx.font = `${11 * SCALE}px "Playfair Display", Georgia, serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(GARUT_HEADER_LEFT, PADDING, y);

  ctx.font = `bold ${22 * SCALE}px "Playfair Display", Georgia, serif`;
  ctx.textAlign = "center";
  ctx.fillText(GARUT_HEADER_CENTER, W / 2, y - 4 * SCALE);

  ctx.font = `${11 * SCALE}px "Playfair Display", Georgia, serif`;
  ctx.textAlign = "right";
  ctx.fillText(GARUT_HEADER_RIGHT, W - PADDING, y);

  y += 30 * SCALE;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1 * SCALE;
  ctx.beginPath();
  ctx.moveTo(PADDING, y);
  ctx.lineTo(W - PADDING, y);
  ctx.stroke();

  y += 20 * SCALE;
  ctx.fillStyle = textColor;
  ctx.font = `900 ${110 * SCALE}px "Playfair Display", Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(GARUT_MASTHEAD, W / 2, y);

  y += 130 * SCALE;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2 * SCALE;
  ctx.beginPath();
  ctx.moveTo(PADDING, y);
  ctx.lineTo(W - PADDING, y);
  ctx.stroke();

  y += 6 * SCALE;
  const infoBarH = 24 * SCALE;
  ctx.fillStyle = textColor;
  ctx.fillRect(PADDING, y, W - PADDING * 2, infoBarH);

  ctx.fillStyle = "#f5f1e8";
  ctx.font = `${11 * SCALE}px "Playfair Display", Georgia, serif`;
  ctx.textBaseline = "middle";

  ctx.textAlign = "left";
  ctx.fillText(GARUT_INFO_VOL, PADDING + 8 * SCALE, y + infoBarH / 2);

  ctx.textAlign = "center";
  ctx.fillText(`↓  ${GARUT_INFO_CENTER}  ↓`, W / 2, y + infoBarH / 2);

  const today = new Date();
  const dateStr = today.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  ctx.textAlign = "right";
  ctx.fillText(dateStr, W - PADDING - 8 * SCALE, y + infoBarH / 2);

  y += infoBarH + 20 * SCALE;
  const photoW = W - PADDING * 2;
  const photoH = 320 * SCALE;
  const photoX = PADDING;
  const photoY = y;

  if (image) {
    const scale = Math.max(photoW / image.naturalWidth, photoH / image.naturalHeight);
    const drawW = image.naturalWidth * scale;
    const drawH = image.naturalHeight * scale;
    const dx = photoX + (photoW - drawW) / 2;
    const dy = photoY + (photoH - drawH) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();
    ctx.filter = bw ? "grayscale(100%) contrast(110%)" : "contrast(105%)";
    ctx.drawImage(image, dx, dy, drawW, drawH);
    ctx.filter = "none";
    ctx.restore();
  } else {
    ctx.fillStyle = "#e0dccf";
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.fillStyle = "#888";
    ctx.font = `${60 * SCALE}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("📸", photoX + photoW / 2, photoY + photoH / 2);
  }

  y = photoY + photoH + 8 * SCALE;
  ctx.fillStyle = textColor;
  ctx.font = `italic ${9 * SCALE}px Georgia, serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(GARUT_CAPTION, PADDING, y);

  y += 20 * SCALE;
  ctx.fillStyle = textColor;
  ctx.font = `900 ${24 * SCALE}px "Playfair Display", Georgia, serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const headlineLines = wrapText(ctx, GARUT_HEADLINE, (W - PADDING * 2) * 0.6);
  let hy = y;
  for (const line of headlineLines) {
    ctx.fillText(line, PADDING, hy);
    hy += 28 * SCALE;
  }

  ctx.font = `italic ${12 * SCALE}px Georgia, serif`;
  ctx.fillStyle = textColor;
  const subLines = wrapText(ctx, GARUT_SUBHEADLINE, (W - PADDING * 2) * 0.6);
  for (const line of subLines) {
    ctx.fillText(line, PADDING, hy);
    hy += 16 * SCALE;
  }

  const badgeW = (W - PADDING * 2) * 0.35;
  const badgeH = 50 * SCALE;
  const badgeX = W - PADDING - badgeW;
  const badgeY = y;

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2 * SCALE;
  ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);

  ctx.fillStyle = textColor;
  ctx.font = `bold ${13 * SCALE}px "Playfair Display", Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const badgeLines = wrapText(ctx, GARUT_BADGE, badgeW - 16 * SCALE);
  const badgeLineH = 16 * SCALE;
  const badgeTotalH = badgeLines.length * badgeLineH;
  let by = badgeY + (badgeH - badgeTotalH) / 2 + badgeLineH / 2;
  for (const line of badgeLines) {
    ctx.fillText(line, badgeX + badgeW / 2, by);
    by += badgeLineH;
  }

  y = Math.max(hy, badgeY + badgeH) + 16 * SCALE;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1 * SCALE;
  ctx.beginPath();
  ctx.moveTo(PADDING, y);
  ctx.lineTo(W - PADDING, y);
  ctx.stroke();

  y += 12 * SCALE;
  const colGap = 16 * SCALE;
  const colW = (W - PADDING * 2 - colGap) / 2;

  ctx.fillStyle = textColor;
  ctx.font = `${9.5 * SCALE}px Georgia, serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const lines1 = wrapText(ctx, GARUT_BODY_1, colW);
  let ly = y;
  for (const line of lines1) {
    ctx.fillText(line, PADDING, ly);
    ly += 12 * SCALE;
  }

  const lines2 = wrapText(ctx, GARUT_BODY_2, colW);
  let ly2 = y;
  for (const line of lines2) {
    ctx.fillText(line, PADDING + colW + colGap, ly2);
    ly2 += 12 * SCALE;
  }

  const footerY = H - PADDING - 16 * SCALE;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1 * SCALE;
  ctx.beginPath();
  ctx.moveTo(PADDING, footerY - 8 * SCALE);
  ctx.lineTo(W - PADDING, footerY - 8 * SCALE);
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.font = `italic ${9 * SCALE}px Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(`© ${today.getFullYear()} ${GARUT_MASTHEAD} · Semua hak dilindungi`, W / 2, footerY);
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const customBgInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [currentFrame, setCurrentFrame] = useState("white");
  const [currentLayout, setCurrentLayout] = useState("3");
  const [status, setStatus] = useState("Upload foto buat mulai");
  const [caption, setCaption] = useState("");
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);
  const [dragging, setDragging] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);
  const [garutBW, setGarutBW] = useState(true);
  const [currentBg, setCurrentBg] = useState("none");
  const [customBgImage, setCustomBgImage] = useState<HTMLImageElement | null>(null);
  const [stripScale, setStripScale] = useState(1);
  const [stripPosition, setStripPosition] = useState<"left" | "center" | "right" | "bottom">("center");

  // ===== REVIEW STATE =====
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // ===== FAQ STATE =====
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const layout = LAYOUTS.find((l) => l.id === currentLayout) || LAYOUTS[1];
  const maxPhotos = layout.count;
  const isGarut = layout.type === "koran-garut";

  // Load reviews dari localStorage saat pertama kali
  useEffect(() => {
    try {
      const stored = localStorage.getItem("photostrip_reviews");
      if (stored) {
        setReviews(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Gagal load reviews:", e);
    }
  }, []);

  // Simpan reviews ke localStorage setiap kali berubah
  useEffect(() => {
    try {
      if (reviews.length > 0) {
        localStorage.setItem("photostrip_reviews", JSON.stringify(reviews));
      }
    } catch (e) {
      console.error("Gagal save reviews:", e);
    }
  }, [reviews]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isGarut) {
      renderKoranGarut(ctx, images[0] || null, garutBW);
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const frame = FRAMES.find((f) => f.id === currentFrame) || FRAMES[0];
    const bgOption = BACKGROUNDS.find((b) => b.id === currentBg) || BACKGROUNDS[0];

    const SCALE = 5;
    const PADDING = 20 * SCALE;
    const GAP = 10 * SCALE;
    const CAPTION_H = caption ? 44 * SCALE : 0;
    const PHOTO_SIZE = (layout.cols === 1 ? 260 : 170) * SCALE;
    const rows = Math.ceil(maxPhotos / layout.cols);

    const gridW = PHOTO_SIZE * layout.cols + GAP * (layout.cols - 1);
    const gridH = PHOTO_SIZE * rows + GAP * (rows - 1);
    const stripW = gridW + PADDING * 2;
    const stripH = PADDING + gridH + PADDING + CAPTION_H;

    // === CANVAS KOTAK kalau ada BG ===
    const isSquare = bgOption.type !== "none";
    let W: number;
    let H: number;

    if (isSquare) {
      const baseSize = Math.max(stripW, stripH);
      W = baseSize * 1.25;
      H = W;
    } else {
      W = stripW;
      H = stripH;
    }

    canvas.width = W;
    canvas.height = H;

    // ===== BACKGROUND =====
    if (bgOption.type === "custom" && customBgImage) {
      const scale = Math.max(W / customBgImage.naturalWidth, H / customBgImage.naturalHeight);
      const drawW = customBgImage.naturalWidth * scale;
      const drawH = customBgImage.naturalHeight * scale;
      const dx = (W - drawW) / 2;
      const dy = (H - drawH) / 2;
      ctx.drawImage(customBgImage, dx, dy, drawW, drawH);
    } else if (bgOption.type === "solid" && bgOption.color) {
      ctx.fillStyle = bgOption.color;
      ctx.fillRect(0, 0, W, H);
    } else if (bgOption.type === "emoji" && bgOption.emoji && bgOption.color) {
      ctx.fillStyle = bgOption.color;
      ctx.fillRect(0, 0, W, H);
      drawEmojiPattern(ctx, bgOption.emoji, W, H, SCALE);
    } else if (bgOption.type === "emoji-mix" && bgOption.color) {
      ctx.fillStyle = bgOption.color;
      ctx.fillRect(0, 0, W, H);
      drawMixEmojiPattern(ctx, W, H, SCALE);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);
    }

    // ===== STRIP (position: left, center, right, bottom) =====
    const finalStripW = stripW * stripScale;
    const finalStripH = stripH * stripScale;

    let stripX: number;
    let stripY: number;

    if (stripPosition === "left") {
      stripX = W * 0.06;
      stripY = (H - finalStripH) / 2;
    } else if (stripPosition === "right") {
      stripX = W - finalStripW - W * 0.06;
      stripY = (H - finalStripH) / 2;
    } else if (stripPosition === "bottom") {
      stripX = (W - finalStripW) / 2;
      stripY = H - finalStripH - H * 0.06;
    } else {
      // center
      stripX = (W - finalStripW) / 2;
      stripY = (H - finalStripH) / 2;
    }

    ctx.save();
    ctx.translate(stripX, stripY);
    ctx.scale(stripScale, stripScale);

    ctx.fillStyle = frame.bg;
    ctx.fillRect(0, 0, stripW, stripH);

    if (frame.pattern && frame.pattern !== "solid" && frame.patternColor) {
      drawPattern(ctx, frame.pattern, frame.patternColor, stripW, stripH, SCALE);
    }

    const slots = getLayoutSlots(layout, PADDING, GAP, PHOTO_SIZE);

    if (images.length === 0) {
      ctx.fillStyle = frame.accent;
      for (const slot of slots) {
        ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
      }
      ctx.font = `bold ${56 * SCALE}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("📸", stripW / 2, stripH / 2);
      ctx.restore();
      return;
    }

    for (let i = 0; i < maxPhotos; i++) {
      const slot = slots[i];
      if (!slot) continue;
      const img = images[i];

      if (img) {
        const scale = Math.max(slot.w / img.naturalWidth, slot.h / img.naturalHeight);
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const dx = slot.x + (slot.w - drawW) / 2;
        const dy = slot.y + (slot.h - drawH) / 2;

        ctx.save();
        ctx.beginPath();
        ctx.rect(slot.x, slot.y, slot.w, slot.h);
        ctx.clip();
        ctx.filter = currentFilter === "none" ? "none" : currentFilter;
        ctx.drawImage(img, dx, dy, drawW, drawH);
        ctx.filter = "none";
        ctx.restore();
      } else {
        ctx.fillStyle = frame.accent;
        ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
        ctx.fillStyle = isDarkBg(frame.accent) ? "#e9d5ff" : frame.bg;
        ctx.font = `bold ${48 * SCALE}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("+", slot.x + slot.w / 2, slot.y + slot.h / 2);
      }
    }

    for (const s of stickers) {
      const size = s.size * stripW;
      ctx.font = `${size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(s.emoji, s.x * stripW, s.y * stripH);
    }

    if (caption) {
      ctx.fillStyle = isDarkBg(frame.bg) ? "#e9d5ff" : "#7c3aed";
      ctx.font = `italic ${26 * SCALE}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(caption, stripW / 2, stripH - CAPTION_H / 2 - 6 * SCALE);
    }

    ctx.restore();
  }, [images, currentFilter, caption, currentFrame, currentLayout, layout, maxPhotos, stickers, isGarut, garutBW, currentBg, customBgImage, stripScale, stripPosition]);

  useEffect(() => {
    if (images.length > maxPhotos) {
      setImages((prev) => prev.slice(0, maxPhotos));
    }
  }, [maxPhotos, images.length]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const remaining = maxPhotos - images.length;
    const toLoad = files.slice(0, remaining);

    toLoad.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImages((prev) => {
            const next = [...prev, img];
            setStatus(
              next.length === maxPhotos
                ? "Siap! Tinggal download"
                : `${next.length}/${maxPhotos} foto · tambahin lagi`
            );
            return next;
          });
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleCustomBgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setCustomBgImage(img);
        setCurrentBg("custom");
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    if (customBgInputRef.current) customBgInputRef.current.value = "";
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `photostrip-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    setTimeout(() => {
      setShowReviewPopup(true);
    }, 800);
  }

  function handleSubmitReview() {
    if (reviewRating === 0) return;

    const newReview: Review = {
      id: Date.now(),
      name: reviewName.trim() || "Anonim",
      text: reviewText.trim() || "Mantap! 👍",
      rating: reviewRating,
      date: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setReviewSubmitted(true);

    setTimeout(() => {
      setShowReviewPopup(false);
      setReviewRating(0);
      setReviewHover(0);
      setReviewName("");
      setReviewText("");
      setReviewSubmitted(false);
    }, 2000);
  }

  function handleReset() {
    setImages([]);
    setCurrentFilter("none");
    setCaption("");
    setCurrentFrame("white");
    setStickers([]);
    setSelectedSticker(null);
    setGarutBW(true);
    setCurrentBg("none");
    setCustomBgImage(null);
    setStripScale(1);
    setStripPosition("center");
    setStatus("Upload foto buat mulai");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleLayoutChange(id: string) {
    setCurrentLayout(id);
    const newLayout = LAYOUTS.find((l) => l.id === id);
    if (newLayout) {
      setStatus(`Layout ${newLayout.label.toLowerCase()} dipilih`);
    }
  }

  function addSticker(emoji: string) {
    const id = Date.now() + Math.random();
    setStickers((prev) => [...prev, { id, emoji, x: 0.5, y: 0.5, size: 0.1 }]);
    setSelectedSticker(id);
  }

  function removeSticker(id: number) {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    if (selectedSticker === id) setSelectedSticker(null);
  }

  function clearStickers() {
    setStickers([]);
    setSelectedSticker(null);
  }

  function updateStickerSize(id: number, size: number) {
    setStickers((prev) => prev.map((s) => (s.id === id ? { ...s, size } : s)));
  }

  function handleStickerPointerDown(e: React.PointerEvent, id: number) {
    e.preventDefault();
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sticker = stickers.find((s) => s.id === id);
    if (!sticker) return;

    const pointerX = (e.clientX - rect.left) / rect.width;
    const pointerY = (e.clientY - rect.top) / rect.height;

    setDragging({ id, offsetX: pointerX - sticker.x, offsetY: pointerY - sticker.y });
    setSelectedSticker(id);
  }

  function handleCanvasPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pointerX = (e.clientX - rect.left) / rect.width;
    const pointerY = (e.clientY - rect.top) / rect.height;

    const newX = Math.max(0, Math.min(1, pointerX - dragging.offsetX));
    const newY = Math.max(0, Math.min(1, pointerY - dragging.offsetY));

    setStickers((prev) => prev.map((s) => (s.id === dragging.id ? { ...s, x: newX, y: newY } : s)));
  }

  function handleCanvasPointerUp() {
    setDragging(null);
  }

  const displayReviews = reviews.length > 0 ? reviews : DUMMY_TESTIMONIALS;
  const avgRating =
    displayReviews.length > 0
      ? (
          displayReviews.reduce((sum, r) => sum + ("rating" in r ? r.rating : 5), 0) /
          displayReviews.length
        ).toFixed(1)
      : "5.0";

  return (
    <main className={`${quicksand.className} min-h-screen relative overflow-hidden bg-[#fafafa] text-zinc-800`}>
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168,85,247,0.12) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-rose-100/60 blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] right-[-150px] w-[500px] h-[500px] rounded-full bg-purple-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[15%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center shadow-lg shadow-rose-200/50">
              <span className="text-white text-sm">📸</span>
            </div>
            <span className={`${space.className} font-bold text-sm tracking-tight text-purple-900`}>
              Photostrip
            </span>
          </div>
          <a
            href="#editor"
            className="text-xs font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-200/50 hover:shadow-xl hover:shadow-rose-300/60 hover:scale-105 transition-all"
          >
            Mulai
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-rose-200/50 to-pink-200/30 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-purple-200/40 to-blue-200/30 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left relative">
            <div className="absolute -top-4 left-0 lg:left-4 text-3xl animate-pulse">✨</div>
            <div className="absolute top-24 right-0 lg:right-10 text-2xl animate-bounce">💖</div>
            <div className="absolute bottom-32 left-10 text-2xl animate-pulse hidden lg:block">🌸</div>

            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-rose-300" />
              <span className={`${space.className} text-[10px] font-bold tracking-[0.25em] uppercase text-rose-500`}>
                Gratis · No Watermark · No Login
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-rose-300 lg:hidden" />
            </div>

            <h1 className={`${space.className} text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8 text-purple-900 relative`}>
              Bikin
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  photostrip
                </span>
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C50 2 100 2 150 6C200 10 250 8 298 4" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fb7185" />
                      <stop offset="0.5" stopColor="#ec4899" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              <span className="italic font-light">versi kamu</span>
            </h1>

            <p className="text-base text-purple-700/80 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed font-medium mt-4">
              Ubah fotomu jadi photostrip atau koran ala TikTok. Pilih layout, atur tampilan, download HD. Semua dari browser.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
              <a
                href="#editor"
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-sm shadow-xl shadow-rose-300/50 hover:shadow-2xl hover:shadow-rose-400/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                Gas bikin sekarang
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#fitur"
                className="px-8 py-4 rounded-full bg-white/80 backdrop-blur text-purple-700 font-bold text-sm shadow-lg shadow-purple-200/50 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Lihat fitur
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-10">
              <div className="text-center lg:text-left">
                <p className={`${space.className} text-2xl font-bold text-purple-900`}>100%</p>
                <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Gratis</p>
              </div>
              <div className="w-px h-8 bg-purple-200" />
              <div className="text-center lg:text-left">
                <p className={`${space.className} text-2xl font-bold text-purple-900`}>HD</p>
                <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Quality</p>
              </div>
              <div className="w-px h-8 bg-purple-200" />
              <div className="text-center lg:text-left">
                <p className={`${space.className} text-2xl font-bold text-purple-900`}>3s</p>
                <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Bikin</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center items-center h-[500px] md:h-[560px]">
            <div className="absolute left-0 md:left-4 top-16 w-32 md:w-44 bg-white rounded-2xl p-2 shadow-2xl shadow-purple-300/50 -rotate-6 border border-white/80 hover:rotate-0 hover:z-20 transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop" alt="Preview 1" className="aspect-square w-full rounded-xl object-cover mb-1.5" />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop" alt="Preview 2" className="aspect-square w-full rounded-xl object-cover mb-1.5" />
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" alt="Preview 3" className="aspect-square w-full rounded-xl object-cover" />
            </div>

            <div className="relative w-44 md:w-56 bg-white rounded-2xl p-2.5 shadow-2xl shadow-purple-400/50 rotate-2 border border-white/80 z-10 hover:rotate-0 transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" alt="Preview utama 1" className="aspect-square w-full rounded-xl object-cover mb-2" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" alt="Preview utama 2" className="aspect-square w-full rounded-xl object-cover mb-2" />
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" alt="Preview utama 3" className="aspect-square w-full rounded-xl object-cover" />
              <div className="mt-2 text-center">
                <p className={`${space.className} text-[10px] font-bold text-purple-700`}>photostrip aesthetic</p>
              </div>
            </div>

            <div className="absolute right-0 md:right-4 top-20 w-32 md:w-44 bg-white rounded-2xl p-2 shadow-2xl shadow-purple-300/50 rotate-6 border border-white/80 hover:rotate-0 hover:z-20 transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop" alt="Preview 4" className="aspect-square w-full rounded-xl object-cover mb-1.5" />
              <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop" alt="Preview 5" className="aspect-square w-full rounded-xl object-cover mb-1.5" />
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop" alt="Preview 6" className="aspect-square w-full rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CARA PAKAI */}
      <section id="cara-pakai" className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 backdrop-blur text-rose-500 text-xs font-bold mb-4 shadow-sm">
              🎯 CARA PAKAI
            </span>
            <h2 className={`${space.className} text-4xl md:text-5xl font-bold leading-tight tracking-tight text-purple-900`}>
              Cuma 3 langkah, langsung jadi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Upload foto", desc: "Pilih 1-6 foto dari galeri kamu", emoji: "📸" },
              { num: "02", title: "Atur tampilan", desc: "Pilih layout, filter, bingkai, stiker", emoji: "🎨" },
              { num: "03", title: "Download HD", desc: "Hasil tajam, siap posting ke medsos", emoji: "⬇️" },
            ].map((step, i) => (
              <div key={i} className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-7 shadow-xl shadow-purple-200/30 hover:shadow-2xl hover:shadow-rose-200/40 hover:-translate-y-1 transition-all border border-white/80">
                <div className={`${space.className} text-6xl font-bold bg-gradient-to-br from-rose-300 to-purple-300 bg-clip-text text-transparent mb-3`}>
                  {step.num}
                </div>
                <div className="text-3xl mb-3">{step.emoji}</div>
                <h3 className={`${space.className} text-lg font-bold mb-2 text-purple-900`}>{step.title}</h3>
                <p className="text-sm text-purple-700/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FITUR */}
      <section id="fitur" className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 backdrop-blur text-pink-500 text-xs font-bold mb-4 shadow-sm">
              ✨ FITUR
            </span>
            <h2 className={`${space.className} text-4xl md:text-5xl font-bold leading-tight tracking-tight text-purple-900`}>
              Semua yang kamu butuhin, tanpa yang gak perlu.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-7 shadow-xl shadow-purple-200/30 hover:shadow-2xl hover:shadow-rose-200/40 hover:-translate-y-1 transition-all border border-white/80">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-200 to-rose-300 flex items-center justify-center mb-4 text-2xl shadow-lg shadow-rose-200/50">📐</div>
              <h3 className={`${space.className} text-lg font-bold mb-2 text-purple-900`}>Layout fleksibel</h3>
              <p className="text-sm text-purple-700/70 leading-relaxed">Pilih dari 2, 3, 4, 6 foto, atau template koran. Semua layout udah disesuaikan biar hasilnya proporsional.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-7 shadow-xl shadow-purple-200/30 hover:shadow-2xl hover:shadow-rose-200/40 hover:-translate-y-1 transition-all border border-white/80">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center mb-4 text-2xl shadow-lg shadow-purple-200/50">🎨</div>
              <h3 className={`${space.className} text-lg font-bold mb-2 text-purple-900`}>Kustomisasi total</h3>
              <p className="text-sm text-purple-700/70 leading-relaxed">Filter, bingkai, background, stiker, caption. Atur sesuai selera, dari minimalis sampe ekspresif.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-7 shadow-xl shadow-purple-200/30 hover:shadow-2xl hover:shadow-rose-200/40 hover:-translate-y-1 transition-all border border-white/80">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center mb-4 text-2xl shadow-lg shadow-blue-200/50">⚡</div>
              <h3 className={`${space.className} text-lg font-bold mb-2 text-purple-900`}>Resolusi tinggi</h3>
              <p className="text-sm text-purple-700/70 leading-relaxed">Hasil download tajam, siap dicetak atau dibagi ke medsos tanpa pecah.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDITOR */}
      <section id="editor" className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 backdrop-blur text-purple-500 text-xs font-bold mb-4 shadow-sm">
              🎨 EDITOR
            </span>
            <h2 className={`${space.className} text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3 text-purple-900`}>
              Bikin photostrip kamu
            </h2>
            <p className="text-sm text-purple-700/70">Pilih layout, upload foto, atur tampilan, download.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="space-y-5 lg:sticky lg:top-24">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-purple-200/30 border border-white/80">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-purple-600">📐 Layout</h3>
                <div className="grid grid-cols-3 gap-2">
                  {LAYOUTS.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => handleLayoutChange(l.id)}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-[10px] font-bold transition-all ${
                        currentLayout === l.id
                          ? "bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50 scale-105"
                          : "bg-white/60 text-purple-700 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <span className="text-base font-bold">{l.count}</span>
                      <span className="text-[9px] leading-tight mt-0.5 text-center">
                        {l.id === "koran-garut" ? "Koran" : "Foto"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {isGarut && (
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-purple-200/30 border border-white/80">
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-purple-600">🎨 Warna Koran</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setGarutBW(true)}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all ${
                        garutBW
                          ? "bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50 scale-105"
                          : "bg-white/60 text-purple-700 hover:bg-white"
                      }`}
                    >
                      🖤 Hitam Putih
                    </button>
                    <button
                      onClick={() => setGarutBW(false)}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all ${
                        !garutBW
                          ? "bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50 scale-105"
                          : "bg-white/60 text-purple-700 hover:bg-white"
                      }`}
                    >
                      ✨ Berwarna
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-purple-200/30 border border-white/80">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-purple-600">
                  📸 Foto ({images.length}/{maxPhotos})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto mb-3">
                  {Array.from({ length: maxPhotos }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-2xl bg-white/60">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-purple-50 flex-shrink-0 flex items-center justify-center">
                        {images[i] ? (
                          <img src={images[i].src} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-purple-300 text-sm">+</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-purple-700">Foto {i + 1}</p>
                        <p className="text-[10px] text-purple-400 truncate">{images[i] ? "Siap" : "Belum diisi"}</p>
                      </div>
                      {images[i] && (
                        <button onClick={() => removePhoto(i)} className="text-purple-300 hover:text-rose-500 text-xs font-bold px-2">✕</button>
                      )}
                    </div>
                  ))}
                </div>
                <label className={`block text-center px-4 py-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-sm cursor-pointer shadow-lg shadow-rose-300/50 hover:shadow-xl hover:scale-105 active:scale-95 transition-all ${images.length >= maxPhotos ? "opacity-40 pointer-events-none" : ""}`}>
                  + Tambah foto
                  <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
                </label>
              </div>

              {!isGarut && (
                <>
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-purple-200/30 border border-white/80">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-purple-600">🌈 Background</h3>
                    <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                      {BACKGROUNDS.map((b) => {
                        const isSelected = currentBg === b.id;
                        const bgStyle =
                          b.type === "none"
                            ? "repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 8px 8px"
                            : b.type === "custom"
                            ? customBgImage
                              ? `url(${customBgImage.src}) center/cover`
                              : "repeating-linear-gradient(45deg, #ddd 0, #ddd 4px, #fff 4px, #fff 8px)"
                            : b.color;
                        return (
                          <button
                            key={b.id}
                            onClick={() => {
                              if (b.type === "custom") {
                                if (customBgImage) {
                                  setCurrentBg("custom");
                                } else {
                                  customBgInputRef.current?.click();
                                }
                              } else {
                                setCurrentBg(b.id);
                              }
                            }}
                            className={`aspect-square rounded-xl transition-all text-lg flex items-center justify-center overflow-hidden ${
                              isSelected ? "ring-2 ring-rose-400 ring-offset-2 scale-105 shadow-lg" : "hover:scale-105 hover:shadow-md"
                            }`}
                            style={{ background: bgStyle, backgroundSize: "cover" }}
                            title={b.label}
                          >
                            {b.type === "emoji" && b.emoji && <span className="text-xl">{b.emoji}</span>}
                            {b.type === "emoji-mix" && <span className="text-xl">✨</span>}
                            {b.type === "none" && <span className="text-xs font-bold text-purple-400">✕</span>}
                            {b.type === "custom" && !customBgImage && <span className="text-xs font-bold text-purple-400">↑</span>}
                          </button>
                        );
                      })}
                    </div>
                    <input ref={customBgInputRef} type="file" accept="image/*" onChange={handleCustomBgUpload} className="hidden" />
                    {customBgImage && (
                      <button
                        onClick={() => {
                          setCustomBgImage(null);
                          if (currentBg === "custom") setCurrentBg("none");
                        }}
                        className="mt-2 w-full text-[10px] text-rose-500 hover:text-rose-700 font-bold py-1"
                      >
                        Hapus background sendiri
                      </button>
                    )}

                    {currentBg !== "none" && (
                      <div className="mt-4 pt-4 border-t border-purple-200 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-purple-700">Posisi Strip</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setStripPosition("left")}
                              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                                stripPosition === "left"
                                  ? "bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50 scale-105"
                                  : "bg-white/60 text-purple-700 hover:bg-white"
                              }`}
                            >
                              ← Kiri
                            </button>
                            <button
                              onClick={() => setStripPosition("center")}
                              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                                stripPosition === "center"
                                  ? "bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50 scale-105"
                                  : "bg-white/60 text-purple-700 hover:bg-white"
                              }`}
                            >
                              ↕ Tengah
                            </button>
                            <button
                              onClick={() => setStripPosition("right")}
                              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                                stripPosition === "right"
                                  ? "bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50 scale-105"
                                  : "bg-white/60 text-purple-700 hover:bg-white"
                              }`}
                            >
                              Kanan →
                            </button>
                            <button
                              onClick={() => setStripPosition("bottom")}
                              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                                stripPosition === "bottom"
                                  ? "bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50 scale-105"
                                  : "bg-white/60 text-purple-700 hover:bg-white"
                              }`}
                            >
                              ↓ Bawah
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-purple-700">Ukuran Strip</span>
                            <span className={`${space.className} text-xs font-bold text-purple-500`}>
                              {Math.round(stripScale * 100)}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0.5"
                            max="1"
                            step="0.01"
                            value={stripScale}
                            onChange={(e) => setStripScale(parseFloat(e.target.value))}
                            className="w-full accent-rose-400"
                          />
                          <div className="flex justify-between text-[10px] text-purple-400 font-bold mt-1">
                            <span>Kecil</span>
                            <span>Besar</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-purple-400 font-medium text-center">
                          Canvas otomatis kotak 1:1 buat IG/TikTok
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-purple-200/30 border border-white/80">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-purple-600">✨ Stiker</h3>
                      {stickers.length > 0 && (
                        <button onClick={clearStickers} className="text-xs text-rose-500 hover:text-rose-700 font-bold">
                          Hapus semua
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-8 gap-1.5">
                      {STICKER_PRESETS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => addSticker(emoji)}
                          className="aspect-square rounded-xl bg-white/60 hover:bg-white text-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    {selectedSticker !== null && (
                      <div className="mt-3 p-3 rounded-2xl bg-white/60">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-purple-700">Stiker terpilih</span>
                          <button onClick={() => removeSticker(selectedSticker)} className="text-xs text-rose-500 hover:text-rose-700 font-bold">
                            Hapus
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-purple-400 font-bold">Kecil</span>
                          <input
                            type="range"
                            min="0.04"
                            max="0.3"
                            step="0.01"
                            value={stickers.find((s) => s.id === selectedSticker)?.size || 0.1}
                            onChange={(e) => updateStickerSize(selectedSticker, parseFloat(e.target.value))}
                            className="flex-1 accent-rose-400"
                          />
                          <span className="text-[10px] text-purple-400 font-bold">Besar</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-purple-200/30 border border-white/80">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-purple-600">🖼️ Bingkai</h3>
                    <div className="grid grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-1">
                      {FRAMES.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setCurrentFrame(f.id)}
                          className={`aspect-square rounded-xl transition-all relative overflow-hidden ${
                            currentFrame === f.id ? "ring-2 ring-rose-400 ring-offset-2 scale-105 shadow-lg z-10" : "hover:scale-105 hover:shadow-md"
                          }`}
                          style={{ background: f.bg }}
                          title={f.label}
                        >
                          {f.pattern === "dots" && <span className="absolute inset-0" style={{ backgroundImage: `radial-gradient(${f.patternColor} 1.5px, transparent 1.5px)`, backgroundSize: "8px 8px" }} />}
                          {f.pattern === "stripes" && <span className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${f.patternColor} 0, ${f.patternColor} 2px, transparent 2px, transparent 6px)` }} />}
                          {f.pattern === "grid" && <span className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${f.patternColor} 1px, transparent 1px), linear-gradient(90deg, ${f.patternColor} 1px, transparent 1px)`, backgroundSize: "6px 6px" }} />}
                          {f.pattern === "hearts" && <span className="absolute inset-0 flex items-center justify-center text-[10px]" style={{ color: f.patternColor }}>♥</span>}
                          {f.pattern === "stars" && <span className="absolute inset-0 flex items-center justify-center text-[10px]" style={{ color: f.patternColor }}>★</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-purple-200/30 border border-white/80">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-purple-600">🎨 Filter</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {FILTERS.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setCurrentFilter(f.value)}
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-xs font-bold transition-all ${
                            currentFilter === f.value
                              ? "bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-300/50 scale-105"
                              : "bg-white/60 text-purple-700 hover:bg-white hover:shadow-md"
                          }`}
                        >
                          <span className="text-lg mb-0.5">{f.emoji}</span>
                          <span className="text-[10px] leading-tight">{f.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-purple-200/30 border border-white/80">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-purple-600">✍️ Caption</h3>
                    <input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Contoh: 2025 vibes"
                      maxLength={30}
                      className="w-full px-4 py-3 rounded-2xl bg-white/80 text-purple-900 text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all font-medium"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-purple-300/30 border border-white/80">
                <div className="relative inline-block w-full">
                  <canvas
                    ref={canvasRef}
                    className="block mx-auto rounded-2xl"
                    style={{ maxWidth: "100%", maxHeight: isGarut ? "85vh" : "70vh", height: "auto" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    onPointerMove={handleCanvasPointerMove}
                    onPointerUp={handleCanvasPointerUp}
                    onPointerLeave={handleCanvasPointerUp}
                  >
                    {!isGarut && stickers.map((s) => (
                      <div
                        key={s.id}
                        onPointerDown={(e) => handleStickerPointerDown(e, s.id)}
                        className={`absolute pointer-events-auto cursor-move select-none ${
                          selectedSticker === s.id ? "ring-2 ring-rose-400 ring-offset-2 rounded" : ""
                        }`}
                        style={{
                          left: `${s.x * 100}%`,
                          top: `${s.y * 100}%`,
                          transform: "translate(-50%, -50%)",
                          lineHeight: 1,
                        }}
                      >
                        <span style={{ fontSize: `clamp(12px, ${s.size * 100}%, 200px)`, display: "block" }}>
                          {s.emoji}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={handleDownload}
                  disabled={images.length === 0}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-sm shadow-xl shadow-rose-300/50 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ⬇️ Download
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3.5 rounded-full bg-white/80 backdrop-blur text-purple-700 font-bold text-sm shadow-lg shadow-purple-200/50 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  🔄 Reset
                </button>
              </div>

              <p className="text-center text-sm text-purple-700/70 mt-4 font-bold">{status}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONI / KATA MEREKA */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 backdrop-blur text-rose-500 text-xs font-bold mb-4 shadow-sm">
              💬 KATA MEREKA
            </span>
            <h2 className={`${space.className} text-4xl md:text-5xl font-bold leading-tight tracking-tight text-purple-900 mb-4`}>
              Udah dipake banyak orang
            </h2>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/70 backdrop-blur border border-white/80 shadow-md">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-lg ${star <= Math.round(Number(avgRating)) ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className={`${space.className} text-sm font-bold text-purple-900`}>{avgRating}</span>
              <span className="text-xs text-purple-500 font-bold">·</span>
              <span className="text-xs text-purple-500 font-bold">{displayReviews.length} rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayReviews.slice(0, 6).map((t, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-purple-200/30 hover:shadow-2xl hover:-translate-y-1 transition-all border border-white/80"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${star <= (t.rating || 5) ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-purple-800 leading-relaxed mb-4 font-medium">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-200 to-purple-200 flex items-center justify-center text-xs font-bold text-purple-700">
                    {t.name[0]}
                  </div>
                  <span className="text-xs font-bold text-purple-700">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 backdrop-blur text-purple-500 text-xs font-bold mb-4 shadow-sm">
              ❓ FAQ
            </span>
            <h2 className={`${space.className} text-4xl md:text-5xl font-bold leading-tight tracking-tight text-purple-900`}>
              Pertanyaan yang sering ditanya
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/80 shadow-lg shadow-purple-200/20 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/50 transition-all"
                  >
                    <span className={`${space.className} text-sm md:text-base font-bold text-purple-900`}>
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-rose-200 to-purple-200 flex items-center justify-center text-purple-700 font-bold text-sm transition-transform ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-purple-700/80 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative px-6 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-rose-200/60 via-pink-200/60 to-purple-200/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl shadow-rose-200/40 border border-white/80">
          <h2 className={`${space.className} text-3xl md:text-5xl font-bold leading-tight tracking-tight text-purple-900 mb-4`}>
            Siap bikin photostrip kamu?
          </h2>
          <p className="text-sm md:text-base text-purple-700/80 mb-8 font-medium">
            Gratis, tanpa login, tanpa watermark. Tinggal upload dan jadi.
          </p>
          <a
            href="#editor"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-sm shadow-xl shadow-rose-300/50 hover:shadow-2xl hover:shadow-rose-400/60 hover:scale-105 active:scale-95 transition-all"
          >
            Gas mulai sekarang
          </a>
        </div>
      </section>

      {/* FOOTER LENGKAP */}
      <footer className="relative px-6 pt-16 pb-8 mt-10 border-t border-white/60 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center shadow-lg shadow-rose-200/50">
                  <span className="text-white text-base">📸</span>
                </div>
                <span className={`${space.className} font-bold text-lg tracking-tight text-purple-900`}>
                  Photostrip
                </span>
              </div>
              <p className="text-sm text-purple-700/70 leading-relaxed font-medium max-w-md mb-5">
                Bikin photostrip atau koran aesthetic langsung dari browser. Gratis, tanpa login, tanpa watermark. Semua proses terjadi di HP kamu sendiri.
              </p>
              <div className="flex gap-2">
                {[
                  { label: "TikTok", emoji: "🎵" },
                  { label: "Instagram", emoji: "📷" },
                  { label: "Twitter", emoji: "🐦" },
                  { label: "YouTube", emoji: "▶️" },
                ].map((sos, i) => (
                  <button
                    key={i}
                    title={sos.label}
                    className="w-10 h-10 rounded-xl bg-white/70 border border-white/80 flex items-center justify-center text-lg shadow-md shadow-purple-200/30 hover:shadow-lg hover:scale-110 transition-all"
                  >
                    {sos.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`${space.className} text-xs font-bold uppercase tracking-widest text-purple-900 mb-4`}>
                Menu
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Mulai Bikin", href: "#editor" },
                  { label: "Fitur", href: "#fitur" },
                  { label: "Cara Pakai", href: "#cara-pakai" },
                  { label: "FAQ", href: "#faq" },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-sm text-purple-700/70 hover:text-purple-900 font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`${space.className} text-xs font-bold uppercase tracking-widest text-purple-900 mb-4`}>
                Bantuan
              </h4>
              <ul className="space-y-2.5">
                {["Cara Pakai", "Tips Biar Hasilnya Bagus", "Laporkan Bug", "Hubungi Kami"].map((label, i) => (
                  <li key={i}>
                    <button className="text-sm text-purple-700/70 hover:text-purple-900 font-medium transition-colors text-left">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-200/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-purple-500">
              © {new Date().getFullYear()} Photostrip · Dibuat dengan 💜 buat kamu
            </p>
            <div className="flex gap-5">
              <button className="text-xs font-bold text-purple-500 hover:text-purple-800 transition-colors">Privacy</button>
              <button className="text-xs font-bold text-purple-500 hover:text-purple-800 transition-colors">Terms</button>
              <button className="text-xs font-bold text-purple-500 hover:text-purple-800 transition-colors">Cookie</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== REVIEW POPUP ===== */}
      {showReviewPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease]"
          onClick={() => !reviewSubmitted && setShowReviewPopup(false)}
        >
          <div
            className="relative bg-white rounded-3xl p-7 md:p-8 shadow-2xl max-w-md w-full border border-white/80 animate-[popIn_0.4s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            {!reviewSubmitted ? (
              <>
                <button
                  onClick={() => setShowReviewPopup(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold transition-all"
                >
                  ✕
                </button>

                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className={`${space.className} text-2xl font-bold text-purple-900 mb-2`}>
                    Gimana hasilnya?
                  </h3>
                  <p className="text-sm text-purple-600 font-medium">
                    Kasih rating dong, biar kami terus improve ✨
                  </p>
                </div>

                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setReviewHover(star)}
                      onMouseLeave={() => setReviewHover(0)}
                      onClick={() => setReviewRating(star)}
                      className="text-5xl transition-all hover:scale-125 active:scale-95"
                    >
                      <span
                        className={
                          star <= (reviewHover || reviewRating)
                            ? "text-yellow-400 drop-shadow-md"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>

                {reviewRating > 0 && (
                  <p className="text-center text-xs font-bold text-purple-500 mb-4">
                    {reviewRating === 5 && "Mantap! 🔥"}
                    {reviewRating === 4 && "Keren! ✨"}
                    {reviewRating === 3 && "Oke lah 👍"}
                    {reviewRating === 2 && "Hmm, kurang 😐"}
                    {reviewRating === 1 && "Maaf ya 😔"}
                  </p>
                )}

                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Nama kamu (opsional)"
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50 text-purple-900 text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all font-medium mb-3"
                />

                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tulis komentar kamu (opsional)"
                  maxLength={150}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50 text-purple-900 text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all font-medium resize-none mb-4"
                />

                <button
                  onClick={handleSubmitReview}
                  disabled={reviewRating === 0}
                  className="w-full px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-sm shadow-xl shadow-rose-300/50 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Kirim Rating ⭐
                </button>

                <p className="text-center text-[10px] text-purple-400 font-medium mt-3">
                  Rating & komentar kamu tersimpan di browser ini
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">💖</div>
                <h3 className={`${space.className} text-2xl font-bold text-purple-900 mb-2`}>
                  Makasih ya!
                </h3>
                <p className="text-sm text-purple-600 font-medium">
                  Rating kamu udah tersimpan ✨
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </main>
  );
}