export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  created_at: string;
  topics?: string[];
}

export const githubProjects: GithubRepo[] = [
  {
    name: "AgenticFinance-RAG",
    description: "Agentic RAG for SEC filings and news synthesis using LangGraph, Gemini 3.0, and PostgreSQL.",
    html_url: "https://github.com/lostmartian/AgenticFinance-RAG",
    language: "Python",
    stargazers_count: 0,
    created_at: "2026-04-26T08:00:17Z",
    topics: []
  },
  {
    name: "hcpassist",
    description: "Healthcare Assistant - AI-powered support for healthcare professionals.",
    html_url: "https://github.com/lostmartian/hcpassist",
    language: "Python",
    stargazers_count: 0,
    created_at: "2026-03-24T06:42:56Z",
    topics: []
  },
  {
    name: "wasmquant",
    description: "High-speed trading strategy backtester that runs entirely in the browser using WASM.",
    html_url: "https://github.com/lostmartian/wasmquant",
    language: "TypeScript",
    stargazers_count: 0,
    created_at: "2026-02-10T07:36:42Z",
    topics: []
  },
  {
    name: "VelocityLOB",
    description: "Self-contained order book simulator implemented in C++20 for high-frequency trading simulations.",
    html_url: "https://github.com/lostmartian/VelocityLOB",
    language: "C++",
    stargazers_count: 0,
    created_at: "2026-02-04T11:05:49Z",
    topics: []
  },
  {
    name: "Building-and-Road-Segmentation-from-Aerial-Images",
    description: "Aerial Image segmentation using different EfficientNet based backbone encoders with UNet on Massachusetts Building and Road dataset.",
    html_url: "https://github.com/lostmartian/Building-and-Road-Segmentation-from-Aerial-Images",
    language: "Jupyter Notebook",
    stargazers_count: 11,
    created_at: "2023-01-01T20:06:15Z",
    topics: ["aerial", "building-segmentation", "efficientnet", "pytorch", "road-segmentation", "segmentation", "unet"]
  },
  {
    name: "crop-recommendation-and-plant-disease-detection",
    description: "Saathi - Crop recommendation using ML and plant disease identification using CNN and transfer-learning approach.",
    html_url: "https://github.com/lostmartian/crop-recommendation-and-plant-disease-detection",
    language: "Jupyter Notebook",
    stargazers_count: 30,
    created_at: "2022-03-06T07:49:53Z",
    topics: ["crop", "machine-learning", "plant-disease-detection", "recommendation"]
  },
  {
    name: "image-quilting-texture-synthesis",
    description: "Implementation for Image Quilting paper by Alexei A. Efros & William T. Freeman.",
    html_url: "https://github.com/lostmartian/image-quilting-texture-synthesis",
    language: "Python",
    stargazers_count: 1,
    created_at: "2021-12-15T09:42:52Z",
    topics: ["image-processing", "opencv"]
  },
  {
    name: "ITIT-3103-Software-Engineering",
    description: "Project made for SE class titled bWall. Made in Flask with bootstrap.",
    html_url: "https://github.com/lostmartian/ITIT-3103-Software-Engineering",
    language: "Python",
    stargazers_count: 0,
    created_at: "2021-09-10T08:23:27Z",
    topics: ["flask", "software-engineering"]
  },
  {
    name: "Conways-game-of-life",
    description: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.",
    html_url: "https://github.com/lostmartian/Conways-game-of-life",
    language: "C++",
    stargazers_count: 0,
    created_at: "2021-06-04T17:17:14Z",
    topics: ["cpp17", "gameoflife"]
  },
  {
    name: "CovidRecognizer",
    description: "Image segmentation and classification for Covid19 lung CT-scans using UNET implemented in Tensorflow and Keras.",
    html_url: "https://github.com/lostmartian/CovidRecognizer",
    language: "Jupyter Notebook",
    stargazers_count: 10,
    created_at: "2020-12-14T07:52:53Z",
    topics: ["deep-learning", "medical-imaging", "segmentation", "unet"]
  },
  {
    name: "LSB-Steganography-using-Pixel-Locator-Sequence-With-AES",
    description: "Improvised LSB Steganography technique using Pixel Locator Sequence with AES. Implementation for paper IEEE 9478162.",
    html_url: "https://github.com/lostmartian/LSB-Steganography-using-Pixel-Locator-Sequence-With-AES",
    language: "Python",
    stargazers_count: 11,
    created_at: "2020-12-02T07:54:27Z",
    topics: ["aes", "cryptography", "steganography"]
  },
  {
    name: "Covid-19-Tracker",
    description: "This is website which displays a realtime graph of covid19 statewise stats in India.",
    html_url: "https://github.com/lostmartian/Covid-19-Tracker",
    language: "JavaScript",
    stargazers_count: 0,
    created_at: "2020-04-26T14:40:33Z",
    topics: []
  }
];
