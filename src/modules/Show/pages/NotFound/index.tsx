import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { routes } from '@/core/presentation/router/routes';

const NotFoundPage: React.FC = () => (
  <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
    {/* Fundo estrelado animado */}
    <div className="absolute inset-0 z-0">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Estrelas */}
        {[...Array(40)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1440}
            cy={Math.random() * 800}
            r={Math.random() * 1.5 + 0.5}
            fill="#fff"
            opacity={Math.random() * 0.7 + 0.3}
          />
        ))}
      </svg>
    </div>
    {/* Planeta principal (com crateras) */}
    <motion.div
      className="absolute top-1/4 left-1/4 z-10"
      animate={{ y: [0, 20, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="planet1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#312e81" />
          </radialGradient>
        </defs>
        <circle cx="55" cy="55" r="50" fill="url(#planet1)" />
        {/* Crateras */}
        <ellipse cx="40" cy="60" rx="8" ry="4" fill="#6366f1" opacity="0.5" />
        <ellipse cx="70" cy="40" rx="5" ry="2.5" fill="#a5b4fc" opacity="0.4" />
        <ellipse cx="60" cy="75" rx="4" ry="2" fill="#818cf8" opacity="0.3" />
      </svg>
    </motion.div>
    {/* Planeta com anel (tipo Saturno) */}
    <motion.div
      className="absolute right-1/5 bottom-1/5 z-10"
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="planet2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e42" />
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="40" rx="28" ry="24" fill="url(#planet2)" />
        {/* Anel */}
        <ellipse
          cx="40"
          cy="45"
          rx="36"
          ry="8"
          fill="none"
          stroke="#f472b6"
          strokeWidth="3"
          opacity="0.5"
          transform="rotate(-15 40 45)"
        />
        {/* Cratera */}
        <ellipse cx="55" cy="50" rx="5" ry="2" fill="#fde68a" opacity="0.5" />
      </svg>
    </motion.div>
    {/* Pequeno planeta azul */}
    <motion.div
      className="absolute top-[70%] left-[60%] z-10"
      animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="planet3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </radialGradient>
        </defs>
        <circle cx="25" cy="25" r="20" fill="url(#planet3)" />
        <ellipse cx="18" cy="30" rx="4" ry="2" fill="#bae6fd" opacity="0.4" />
      </svg>
    </motion.div>
    {/* Novo planeta vermelho */}
    <motion.div
      className="absolute bottom-[15%] left-[15%] z-10"
      animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="planet4" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#b91c1c" />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="24" fill="url(#planet4)" />
        <ellipse cx="38" cy="38" rx="5" ry="2" fill="#fecaca" opacity="0.4" />
      </svg>
    </motion.div>
    {/* Novo planeta verde */}
    <motion.div
      className="absolute top-[10%] right-[10%] z-10"
      animate={{ x: [0, 12, 0], y: [0, -12, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="planet5" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#166534" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="16" fill="url(#planet5)" />
        <ellipse cx="25" cy="25" rx="3" ry="1.5" fill="#bbf7d0" opacity="0.4" />
      </svg>
    </motion.div>
    {/* Conteúdo principal */}
    <div className="relative z-20 flex flex-col items-center">
      <h1 className="text-foreground animate-fade-in mb-2 text-7xl font-extrabold tracking-tight drop-shadow-lg">
        404
      </h1>
      <p className="text-muted-foreground animate-fade-in mb-8 max-w-md text-center text-lg delay-200">
        You seem lost in space.
        <br />
        This page was not found in this universe.
        <br />
      </p>
      <Link
        to={routes.home}
        className="text-background animate-fade-in rounded-lg bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 px-7 py-2 font-semibold shadow-lg transition-transform delay-300 hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
    <style>{`
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      .animate-fade-in { animation: fade-in 1s ease forwards; opacity: 0; }
      .delay-200 { animation-delay: 0.2s; }
      .delay-300 { animation-delay: 0.3s; }
    `}</style>
  </div>
);

export default NotFoundPage;
