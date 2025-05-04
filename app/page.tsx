"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, Copy, ExternalLink, LineChart, Rocket } from "lucide-react"

export default function Page() {
  const tradingViewChartRef = useRef<HTMLDivElement>(null);
  const tradingViewTechAnalysisRef = useRef<HTMLDivElement>(null);
  const tradingViewCryptoTickerRef = useRef<HTMLDivElement>(null);
  const tradingViewStockTickerRef = useRef<HTMLDivElement>(null);
  const twitterTimelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load TradingView widgets
    const loadTradingViewWidgets = () => {
      // Load TradingView Chart
      if (tradingViewChartRef.current) {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.TradingView) {
            // @ts-ignore
            new window.TradingView.widget({
              "width": "100%",
              "height": 500,
              "symbol": "COINBASE:SOLUSD",
              "interval": "D",
              "timezone": "Etc/UTC",
              "theme": "dark",
              "style": "1",
              "locale": "en",
              "toolbar_bg": "#f1f3f6",
              "enable_publishing": false,
              "allow_symbol_change": true,
              "container_id": "tradingview_chart"
            });
          }
        };
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }
    };

    // Load TradingView Crypto Ticker
    const loadCryptoTicker = () => {
      if (tradingViewCryptoTickerRef.current) {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          "symbols": [
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            },
            {
              "proName": "COINBASE:SOLUSD",
              "title": "Solana"
            },
            {
              "proName": "BITSTAMP:XRPUSD",
              "title": "XRP"
            },
            {
              "proName": "BINANCE:BNBUSD",
              "title": "BNB"
            },
            {
              "proName": "COINBASE:DOGEUSD",
              "title": "Dogecoin"
            },
            {
              "proName": "BINANCE:AVAXUSD",
              "title": "Avalanche"
            },
            {
              "proName": "COINBASE:ADAUSD",
              "title": "Cardano"
            },
            {
              "proName": "BINANCE:DOTUSD",
              "title": "Polkadot"
            },
            {
              "proName": "COINBASE:LINKUSD",
              "title": "Chainlink"
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": true,
          "displayMode": "adaptive",
          "locale": "en"
        });
        tradingViewCryptoTickerRef.current.appendChild(script);
        return () => {
          if (tradingViewCryptoTickerRef.current && tradingViewCryptoTickerRef.current.contains(script)) {
            tradingViewCryptoTickerRef.current.removeChild(script);
          }
        };
      }
    };

    // Load TradingView Stock Ticker
    const loadStockTicker = () => {
      if (tradingViewStockTickerRef.current) {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          "symbols": [
            {
              "proName": "NASDAQ:AAPL",
              "title": "Apple"
            },
            {
              "proName": "NASDAQ:MSFT",
              "title": "Microsoft"
            },
            {
              "proName": "NASDAQ:GOOGL",
              "title": "Google"
            },
            {
              "proName": "NASDAQ:NVDA",
              "title": "NVIDIA"
            },
            {
              "proName": "NASDAQ:MSTR",
              "title": "MicroStrategy"
            },
            {
              "proName": "FOREXCOM:SPX500",
              "title": "S&P 500"
            },
            {
              "proName": "NASDAQ:NDX",
              "title": "NASDAQ 100"
            },
            {
              "proName": "NASDAQ:NFLX",
              "title": "Netflix"
            },
            {
              "proName": "NASDAQ:TSLA",
              "title": "Tesla"
            },
            {
              "proName": "NASDAQ:META",
              "title": "Meta"
            },
            {
              "proName": "NASDAQ:AMZN",
              "title": "Amazon"
            },
            {
              "proName": "NASDAQ:COIN",
              "title": "Coinbase"
            },
            {
              "proName": "NASDAQ:AMD",
              "title": "AMD"
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": true,
          "displayMode": "adaptive",
          "locale": "en"
        });
        tradingViewStockTickerRef.current.appendChild(script);
        return () => {
          if (tradingViewStockTickerRef.current && tradingViewStockTickerRef.current.contains(script)) {
            tradingViewStockTickerRef.current.removeChild(script);
          }
        };
      }
    };

    // Load TradingView Technical Analysis
    const loadTechnicalAnalysis = () => {
      if (tradingViewTechAnalysisRef.current) {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          "interval": "1D",
          "width": "100%",
          "isTransparent": true,
          "height": "450",
          "symbol": "COINBASE:SOLUSD",
          "showIntervalTabs": true,
          "locale": "en",
          "colorTheme": "dark"
        });
        tradingViewTechAnalysisRef.current.appendChild(script);
        return () => {
          if (tradingViewTechAnalysisRef.current && tradingViewTechAnalysisRef.current.contains(script)) {
            tradingViewTechAnalysisRef.current.removeChild(script);
          }
        };
      }
    };

    // Load Twitter widget
    const loadTwitterWidget = () => {
      if (twitterTimelineRef.current) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
        
        return () => {
          document.body.removeChild(script);
        };
      }
    };

    const cleanupFunctions = [
      loadTradingViewWidgets(),
      loadCryptoTicker(),
      loadStockTicker(),
      loadTechnicalAnalysis(),
      loadTwitterWidget()
    ].filter(Boolean);

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup && cleanup());
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("DFUhdc8YXzeENeGaSJrus5yYfKsq978oCcxfqgJnQ5ap");
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Cyber grid background */}
      <div className="cyber-grid"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-blue-500/50 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="nasdaq-logo">
              <svg width="40" height="12" viewBox="0 0 106 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M26.6726 0L18.8675 21.4961C18.6759 22.0265 18.1921 22.4138 17.612 22.4724V22.4851H25.8619C26.5089 22.4851 27.0616 22.0729 27.269 21.4961L35.0742 0H26.6726ZM16.9409 22.1567C17.4173 22.1567 17.8374 21.9203 18.0943 21.5593C18.1212 21.5218 18.2149 21.3899 18.2801 21.2099L21.1433 13.3225L19.4688 8.71643C19.255 8.20506 18.7502 7.84567 18.1622 7.84567C17.6863 7.84567 17.2657 8.08157 17.0088 8.44306C16.982 8.48001 16.8704 8.64835 16.823 8.79242L13.9609 16.6767L15.6423 21.3012C15.8602 21.8042 16.3587 22.1567 16.9409 22.1567ZM9.21221 7.51601H17.5522V7.52076C16.9326 7.54662 16.4077 7.94611 16.2066 8.50445L8.40206 30H0L7.80458 8.50445C8.01304 7.92764 8.56472 7.51601 9.21221 7.51601Z" fill="#0090BA"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M78.1281 22.8256C74.5111 22.8256 72.2639 20.7247 72.2639 17.3409C72.2639 13.8246 74.3374 11.6398 77.6759 11.6398L77.9581 11.6382C78.3755 11.6382 78.9524 11.6514 79.74 11.7517V7.50928H82.102V22.4441C82.102 22.4441 79.8589 22.8256 78.1281 22.8256ZM78.1076 13.5027C75.8219 13.5027 74.7106 14.7392 74.7106 17.2823C74.7106 19.5643 76.0503 20.9817 78.206 20.9817C78.6198 20.9817 79.0941 20.9559 79.74 20.8989V13.6537C79.0935 13.5508 78.5745 13.5027 78.1076 13.5027Z" fill="#FFF"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M45.8108 22.485L39.4365 11.3324L39.4349 22.485H37.214V8.36816H40.3225L46.6968 19.421L46.6941 8.36816H48.9435V22.485H45.8108Z" fill="#FFF"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M66.1111 22.7014C65.0383 22.7014 63.9186 22.5811 62.5857 22.3241L62.4441 22.2961V20.324L62.6552 20.3704C63.8286 20.6206 64.843 20.8369 65.8563 20.8369C66.677 20.8369 68.5858 20.706 68.5858 19.4975C68.5858 18.4827 67.2666 18.2289 66.2064 18.0257L66.1401 18.0125C65.9432 17.9735 65.7568 17.9365 65.5973 17.8964C64.0434 17.4916 62.3857 16.8847 62.3857 14.7965C62.3857 12.7605 63.9939 11.5927 66.7975 11.5927C68.1425 11.5927 69.1195 11.7383 69.9039 11.8555L70.2877 11.913V13.8244L70.0829 13.7891C69.1948 13.6249 68.1541 13.4566 67.1513 13.4566C66.04 13.4566 64.7161 13.6651 64.7161 14.6588C64.7161 15.482 65.7979 15.7179 67.0507 15.9908C68.8011 16.3728 70.9736 16.8483 70.9736 19.2426C70.9736 21.4406 69.2011 22.7014 66.1111 22.7014Z" fill="#FFF"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M88.7257 22.7014C86.2811 22.7014 84.0196 22.2708 84.0196 19.1445C84.0196 15.7427 87.5176 15.7427 89.608 15.7427C89.817 15.7427 90.7993 15.7876 91.102 15.8013C91.0993 13.893 91.0735 13.4376 88.313 13.4376C87.2186 13.4376 86.0026 13.6556 84.9298 13.8476L84.725 13.8846V11.9995L84.865 11.971C86.1079 11.7167 87.3065 11.5927 88.5289 11.5927C91.2046 11.5927 93.4719 11.8634 93.4719 15.1902V22.4476L93.3087 22.4644C91.4557 22.6729 89.9833 22.7014 88.7257 22.7014ZM89.5485 17.4251C87.5334 17.4251 86.2848 17.7223 86.2848 19.2025C86.2848 20.915 87.8788 21.058 89.3727 21.058C89.9323 21.058 90.9362 20.9868 91.2431 20.9636V17.4832C90.8098 17.4668 89.6849 17.4251 89.5485 17.4251Z" fill="#FFF"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M55.6178 22.7014C53.1731 22.7014 50.9117 22.2708 50.9117 19.1445C50.9117 15.7427 54.4097 15.7427 56.5001 15.7427C56.7085 15.7427 57.6913 15.7876 57.994 15.8013C57.9914 13.893 57.9656 13.4376 55.2051 13.4376C54.1107 13.4376 52.8952 13.6556 51.8218 13.8476L51.6171 13.8846V11.9995L51.7571 11.971C53.0005 11.7167 54.1986 11.5927 55.4209 11.5927C58.0967 11.5927 60.3639 11.8634 60.3639 15.1902V22.4476L60.2007 22.4644C58.3478 22.6729 56.8754 22.7014 55.6178 22.7014ZM56.4406 17.4251C54.4255 17.4251 53.1768 17.7223 53.1768 19.2025C53.1768 20.915 54.7708 21.058 56.2648 21.058C56.8243 21.058 57.8282 20.9868 58.1351 20.9636V17.4832C57.7019 17.4668 56.5769 17.4251 56.4406 17.4251Z" fill="#FFF"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M102.868 27.2799V22.6501C101.946 22.7799 101.456 22.7799 101.061 22.7799C100.127 22.7799 99.0893 22.5762 98.2844 22.2342C96.4867 21.4859 95.4134 19.5808 95.4134 17.1374C95.4134 15.9157 95.7098 13.6861 97.6938 12.4844C98.6871 11.8881 99.8642 11.6332 101.63 11.6332C102.264 11.6332 103.118 11.6823 103.943 11.7303L105.283 11.7994V26.2081L102.868 27.2799ZM101.453 13.4966C99.0572 13.4966 97.8412 14.7215 97.8412 17.1374C97.8412 20.2447 99.6558 20.897 101.179 20.897C101.549 20.897 101.967 20.897 102.89 20.7803V13.5636C102.167 13.5145 101.835 13.4966 101.453 13.4966Z" fill="#FFF"></path>
              </svg>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              $NASDAQ
            </div>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li><Link href="#" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="#analysis" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Analysis</Link></li>
              <li><Link href="#buy" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">How to Buy</Link></li>
              <li><Link href="#roadmap" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Roadmap</Link></li>
              <li><Link href="#about" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">About</Link></li>
            </ul>
          </nav>
          
          <Button variant="outline" size="sm" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      </header>

      {/* TradingView Crypto Ticker Tape Widget */}
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
        <div ref={tradingViewCryptoTickerRef}></div>
      </div>

      {/* TradingView Stock Ticker Tape Widget */}
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
        <div ref={tradingViewStockTickerRef}></div>
      </div>

      {/* Banner Section */}
      <section className="w-full bg-black py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* First Banner - Full Width on Mobile, 2/3 Width on Desktop */}
            <div className="md:col-span-2 rounded-lg overflow-hidden">
              <img 
                src="/images/nasdaq-eliza-banner.jpg" 
                alt="NASDAQ ELIZA OS Banner" 
                className="w-full h-auto object-cover" 
              />
            </div>
            
            {/* Second Banner - Full Width on Mobile, 1/3 Width on Desktop */}
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/images/nasdaq-ai-character.png" 
                alt="NASDAQ AI Character" 
                className="w-full h-auto object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,144,186,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/30">
                Crypto's #1 Technical Analysis AI
              </Badge>
              
              <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl">
                <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">$NASDAQ</span>
              </h1>
              
              <p className="mb-8 text-lg text-gray-400 md:text-xl">
                Revolutionizing crypto trading with AI-powered technical analysis and market predictions
              </p>
              
              <div className="mb-10 flex flex-wrap justify-center gap-3">
                <Link 
                  href="https://t.me/NASDAQSOLANAA" 
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-500/20 border border-blue-500/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                  </svg>
                  Telegram
                </Link>
                
                <Link 
                  href="https://x.com/sol_nasdaq" 
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-500/20 border border-blue-500/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                  </svg>
                  X
                </Link>
                
                <Link 
                  href="https://dexscreener.com/solana/bn6sszjtv1f2leodncasresxvc5pcabyvrhuesy1tkrd" 
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-500/20 border border-blue-500/30"
                >
                  <Image src="https://dexscreener.com/favicon.ico" alt="DexScreener" width={16} height={16} className="h-4 w-4" />
                  DexScreener
                </Link>

                <Link 
                  href="https://auto.fun/token/DFUhdc8YXzeENeGaSJrus5yYfKsq978oCcxfqgJnQ5ap" 
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-500/20 border border-blue-500/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M10 16l4-8 4 8H10z"/>
                  </svg>
                  AUTO.FUN
                </Link>

                <Link 
                  href="https://coinmarketcap.com/dexscan/solana/Bn6ssZJTv1f2LeoDncaSRESXvc5pcABYVRHuesY1TKRd/" 
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-500/20 border border-blue-500/30"
                >
                  <Image src="https://coinmarketcap.com/favicon.ico" alt="CoinMarketCap" width={16} height={16} className="h-4 w-4" />
                  CMC
                </Link>
              </div>
              
              {/* Live Chart */}
              <div className="mx-auto mb-10 max-w-4xl w-full rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 backdrop-blur-sm">
                <p className="mb-2 text-xl font-semibold text-blue-400">Live Chart:</p>
                <div className="aspect-video w-full rounded-lg overflow-hidden" style={{ height: "400px" }}>
                  <iframe 
                    height="100%" 
                    width="100%" 
                    id="geckoterminal-embed" 
                    title="GeckoTerminal Embed" 
                    src="https://www.geckoterminal.com/solana/pools/Bn6ssZJTv1f2LeoDncaSRESXvc5pcABYVRHuesY1TKRd?embed=1&info=0&swaps=0&grayscale=0&light_chart=0&chart_type=price&resolution=1h" 
                    frameBorder="0" 
                    allow="clipboard-write" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              
              <div className="mx-auto mb-10 max-w-lg rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 backdrop-blur-sm">
                <p className="mb-2 text-xs text-gray-400">Contract Address:</p>
                <div className="flex items-center justify-center">
                  <code className="mr-2 rounded bg-black/50 px-3 py-1 text-sm font-mono text-blue-400">
                    DFUhdc8YXzeENeGaSJrus5yYfKsq978oCcxfqgJnQ5ap
                  </code>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy contract address</span>
                  </Button>
                </div>
              </div>
              
              <Link 
                href="#buy"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                Buy $NASDAQ Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Animated gradient orbs */}
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        </section>

        {/* Analysis Section */}
        <section id="analysis" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                AI-Powered <span className="text-blue-400">Analysis</span>
              </h2>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            
            <div className="mb-12 overflow-hidden rounded-xl border border-blue-500/20 bg-black/50 backdrop-blur-sm">
              <div className="border-b border-blue-500/20 bg-black/80 p-4">
                <h3 className="text-xl font-bold text-blue-400">Live Market Chart</h3>
              </div>
              <div className="aspect-video w-full bg-black">
                <div id="tradingview_chart" ref={tradingViewChartRef} style={{ height: "500px" }}></div>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-xl border border-blue-500/20 bg-black/50 backdrop-blur-sm">
              <div className="border-b border-blue-500/20 bg-black/80 p-4">
                <h3 className="text-xl font-bold text-blue-400">Technical Analysis</h3>
              </div>
              <div className="w-full bg-black">
                <div className="tradingview-widget-container">
                  <div className="tradingview-widget-container__widget"></div>
                  <div ref={tradingViewTechAnalysisRef}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Terminal Section */}
        <section id="terminal" className="py-20 bg-gradient-to-b from-black to-black/95">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                AI <span className="text-blue-400">Terminal</span>
              </h2>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-blue-500/30 bg-[#0D1117] shadow-2xl">
              <div className="flex items-center justify-between border-b border-blue-500/20 bg-[#161B22] px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="text-sm text-gray-400">$NASDAQ Terminal v1.0</div>
                <div className="w-16"></div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Badge className="mb-6 bg-blue-900/30 text-blue-400 border-blue-500/30">
                  COMING SOON
                </Badge>
                
                <h3 className="mb-4 text-2xl font-bold text-white">Terminal Under Development</h3>
                
                <p className="mb-8 max-w-lg text-gray-400">
                  Our AI-powered technical analysis terminal is being moved from local to server deployment.
                  Stay tuned for the official launch with advanced features and real-time insights!
                </p>
                
                <div className="text-center">
                  <p className="mb-4 text-gray-500">For immediate technical analysis access:</p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link 
                      href="https://t.me/NASDAQSOLANAA" 
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                      </svg>
                      Join our Telegram
                    </Link>
                    
                    <Link 
                      href="https://x.com/sol_nasdaq" 
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                      </svg>
                      Follow on X
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Buy Section */}
        <section id="buy" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                How to <span className="text-blue-400">Buy</span>
              </h2>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            
            <div className="mb-16 grid gap-8 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-xl bg-white p-8 text-center text-black transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100 opacity-50 transition-all group-hover:scale-150"></div>
                <div className="relative">
                  <h3 className="mb-3 text-3xl font-bold">Step 1</h3>
                  <p className="mb-8 text-lg">Create any wallet of your choice, we recommend Phantom.</p>
                  <Image src="https://phantom.app/favicon.ico" alt="Phantom Wallet" width={96} height={96} className="mx-auto" />
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl bg-white p-8 text-center text-black transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100 opacity-50 transition-all group-hover:scale-150"></div>
                <div className="relative">
                  <h3 className="mb-3 text-3xl font-bold">Step 2</h3>
                  <p className="mb-8 text-lg">Fund your wallet with Solana, you can buy Solana from an exchange.</p>
                  <Image src="https://solana.com/favicon.ico" alt="Solana" width={96} height={96} className="mx-auto" />
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl bg-white p-8 text-center text-black transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100 opacity-50 transition-all group-hover:scale-150"></div>
                <div className="relative">
                  <h3 className="mb-3 text-3xl font-bold">Step 3</h3>
                  <p className="mb-8 text-lg">Head to Jupiter & paste our Contract Address, and swap your Solana to our token.</p>
                  <Image src="https://jup.ag/favicon.ico" alt="Jupiter" width={96} height={96} className="mx-auto" />
                </div>
              </div>
            </div>
            
            <div className="text-center flex flex-wrap justify-center gap-4">
              <Link 
                href="https://jup.ag/swap/SOL-DFUhdc8YXzeENeGaSJrus5yYfKsq978oCcxfqgJnQ5ap" 
                target="_blank"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                <Rocket className="h-5 w-5" />
                Buy on Jupiter
              </Link>
              
              <Link 
                href="https://raydium.io/swap/?inputMint=sol&outputMint=DFUhdc8YXzeENeGaSJrus5yYfKsq978oCcxfqgJnQ5ap" 
                target="_blank"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-base font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Buy on Raydium
              </Link>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section id="social" className="py-20 bg-gradient-to-b from-black/95 to-black">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Connect With <span className="text-blue-400">Us</span>
              </h2>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            
            <div className="mb-12 flex justify-center gap-6">
              <Link 
                href="https://t.me/NASDAQSOLANAA" 
                target="_blank"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 border border-blue-500/30 transition-all hover:scale-110 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="h-8 w-8 text-white">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://x.com/sol_nasdaq" 
                target="_blank"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 border border-blue-500/30 transition-all hover:scale-110 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="h-7 w-7 text-white">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                </svg>
              </Link>
            </div>
            
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-blue-500/20 bg-black/50 backdrop-blur-sm">
              <div className="border-b border-blue-500/20 bg-black/80 p-4">
                <h3 className="text-xl font-bold text-blue-400">X Posts by $NASDAQ</h3>
              </div>
              <div className="twitter-widget-container w-full h-[600px] bg-black/80 p-4">
                <div id="twitter-timeline-container" ref={twitterTimelineRef} className="h-full">
                  {/* Twitter widget will be loaded here via useEffect */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Our <span className="text-blue-400">Partners</span>
              </h2>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            
            <div className="mx-auto max-w-4xl">
              <Card className="mb-8 border-blue-500/20 bg-black/50 backdrop-blur-sm hover:border-blue-500/40">
                <CardContent className="p-6">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-blue-400">Eliza OS</h3>
                      <p className="text-gray-300">The Operating System for AI Agents</p>
                    </div>
                    <Link href="https://www.elizaos.ai/" target="_blank">
                      <Image src="https://www.elizaos.ai/favicon.ico" alt="Eliza OS" width={64} height={64} className="rounded-lg" />
                    </Link>
                  </div>
                  <p className="mt-4 text-gray-400">
                    $NASDAQ technical analysis is powered by Eliza OS, providing cutting-edge AI capabilities to deliver accurate market predictions.
                  </p>
                  <div className="mt-4">
                    <Link 
                      href="https://www.elizaos.ai/" 
                      target="_blank"
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300"
                    >
                      Visit Eliza OS <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm hover:border-blue-500/40">
                  <CardContent className="p-6">
                    <h4 className="mb-4 text-lg font-semibold text-blue-300">Key Features</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Platform Integration
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Flexible Model Support
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Character System
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Multi-Agent Architecture
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Memory Management
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm hover:border-blue-500/40">
                  <CardContent className="p-6">
                    <h4 className="mb-4 text-lg font-semibold text-blue-300">Use Cases</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-blue-400" />
                        AI Assistants
                      </li>
                      <li className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-blue-400" />
                        Market Analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Social Media Personas
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                          <path d="M18 16.98h-5.99c-1.66 0-3.01-1.34-3.01-3s1.34-3 3.01-3H18"></path>
                          <path d="M6 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                        </svg>
                        Knowledge Workers
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Interactive Characters
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 border-blue-500/30 bg-blue-900/20 backdrop-blur-sm hover:border-blue-500/50">
                <CardContent className="p-6">
                  <h4 className="mb-4 text-lg font-semibold text-blue-300">$NASDAQ Implementation</h4>
                  <p className="text-gray-300">
                    Our technical analysis capabilities are built on ElizaOS's core features, enabling our AI to process market data,
                    identify patterns, and generate accurate predictions with unprecedented precision. The framework's ability to handle
                    complex data streams and maintain context awareness makes it the perfect foundation for our financial analysis tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-20 bg-gradient-to-b from-black to-black/95">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                <span className="text-blue-400">Roadmap</span>
              </h2>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            
            <div className="mx-auto max-w-4xl">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 ml-6 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500/50 to-blue-500/20 md:ml-8"></div>
                
                <div className="relative mb-12 pl-12 md:pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-500 bg-black">
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  </div>
                  <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:translate-x-2">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-2xl font-bold text-blue-400">Q1 2025: Launch</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Token Launch on Solana
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Website Launch
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Community Building
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          DEX Listings
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="relative mb-12 pl-12 md:pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-500 bg-black">
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  </div>
                  <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:translate-x-2">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-2xl font-bold text-blue-400">Q2 2025: Growth</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          AI Terminal Launch
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          CEX Listings
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Marketing Expansion
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative pl-12 md:pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-500/50 bg-black">
                    <div className="h-4 w-4 rounded-full bg-blue-500/50"></div>
                  </div>
                  <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:translate-x-2">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-2xl font-bold text-blue-400">Q3 2025: Expansion</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Advanced Trading Features
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Partnership Announcements
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Community Governance
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Mobile App Development
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative pl-12 md:pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-500/20 bg-black">
                    <div className="h-4 w-4 rounded-full bg-blue-500/20"></div>
                  </div>
                  <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:translate-x-2">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-2xl font-bold text-blue-400">Q4 2025: Evolution</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Cross-Chain Integration
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Institutional Partnerships
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          DAO Governance
                        </li>
                        <li className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Staking and Rewards
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gradient-to-b from-black/95 to-black">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                About <span className="text-blue-400">$NASDAQ</span>
              </h2>
              <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            
            <div className="mx-auto max-w-4xl bg-blue-900/20 rounded-xl border border-blue-500/30 p-8 shadow-lg backdrop-blur-sm">
              <p className="mb-6 text-xl text-gray-300 leading-relaxed">
                $NASDAQ is the first AI-powered technical analysis token on Solana, bringing professional-grade market insights to everyone. 
                Our mission is to democratize financial intelligence by combining cutting-edge AI with blockchain technology.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                The $NASDAQ token powers our ecosystem, providing holders with access to premium features and governance rights 
                as we build the future of decentralized financial intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="border-t border-blue-500/30 bg-black py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="col-span-1">
                <div className="flex items-center gap-3">
                  <div className="nasdaq-logo">
                    <svg width="32" height="10" viewBox="0 0 106 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M26.6726 0L18.8675 21.4961C18.6759 22.0265 18.1921 22.4138 17.612 22.4724V22.4851H25.8619C26.5089 22.4851 27.0616 22.0729 27.269 21.4961L35.0742 0H26.6726Z" fill="#0090BA"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M16.9409 22.1567C17.4173 22.1567 17.8374 21.9203 18.0943 21.5593C18.1212 21.5218 18.2149 21.3899 18.2801 21.2099L21.1433 13.3225L19.4688 8.71643C19.255 8.20506 18.7502 7.84567 18.1622 7.84567C17.6863 7.84567 17.2657 8.08157 17.0088 8.44306C16.982 8.48001 16.8704 8.64835 16.823 8.79242L13.9609 16.6767L15.6423 21.3012C15.8602 21.8042 16.3587 22.1567 16.9409 22.1567ZM9.21221 7.51601H17.5522V7.52076C16.9326 7.54662 16.4077 7.94611 16.2066 8.50445L8.40206 30H0L7.80458 8.50445C8.01304 7.92764 8.56472 7.51601 9.21221 7.51601Z" fill="#0090BA"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M78.1281 22.8256C74.5111 22.8256 72.2639 20.7247 72.2639 17.3409C72.2639 13.8246 74.3374 11.6398 77.6759 11.6398L77.9581 11.6382C78.3755 11.6382 78.9524 11.6514 79.74 11.7517V7.50928H82.102V22.4441C82.102 22.4441 79.8589 22.8256 78.1281 22.8256Z" fill="#FFF"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M45.8108 22.485L39.4365 11.3324L39.4349 22.485H37.214V8.36816H40.3225L46.6968 19.421L46.6941 8.36816H48.9435V22.485H45.8108Z" fill="#FFF"></path>
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-blue-400">$NASDAQ</div>
                </div>
                <p className="mt-4 text-sm text-gray-400">© 2024 $NASDAQ. All rights reserved.</p>
                <p className="mt-2 text-sm text-gray-400">
                  Contract: DFUhdc8YXzeENeGaSJrus5yYfKsq978oCcxfqgJnQ5ap
                </p>
              </div>

              <div className="col-span-1">
                <h3 className="mb-4 text-lg font-bold text-white">Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#analysis" className="text-gray-400 hover:text-blue-400 transition-colors">
                      Analysis
                    </Link>
                  </li>
                  <li>
                    <Link href="#buy" className="text-gray-400 hover:text-blue-400 transition-colors">
                      How to Buy
                    </Link>
                  </li>
                  <li>
                    <Link href="#roadmap" className="text-gray-400 hover:text-blue-400 transition-colors">
                      Roadmap
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <h3 className="mb-4 text-lg font-bold text-white">Social</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="https://t.me/NASDAQSOLANAA" 
                      target="_blank"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Telegram
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://x.com/sol_nasdaq" 
                      target="_blank"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      X
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <h3 className="mb-4 text-lg font-bold text-white">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="https://dexscreener.com/solana/bn6sszjtv1f2leodncasresxvc5pcabyvrhuesy1tkrd"
                      target="_blank" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      DexScreener
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://coinmarketcap.com/dexscan/solana/Bn6ssZJTv1f2LeoDncaSRESXvc5pcABYVRHuesY1TKRd/"
                      target="_blank"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      CoinMarketCap
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://auto.fun/token/DFUhdc8YXzeENeGaSJrus5yYfKsq978oCcxfqgJnQ5ap"
                      target="_blank"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      AUTO.FUN
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

