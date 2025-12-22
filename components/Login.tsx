
import React, { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import { Student } from '../types';

interface LoginProps {
  onLoginSuccess: (user: Student) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [regId, setRegId] = useState('');
  const [roll, setRoll] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regId || !roll) {
      setError('তথ্যগুলো সঠিকভাবে প্রদান করুন');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await studentService.login(regId, roll);
      if (user) {
        onLoginSuccess(user);
      } else {
        setError('রেজিস্ট্রেশন আইডি বা রোল নম্বর শিটে পাওয়া যায়নি।');
      }
    } catch (err: any) {
      setError(err.message || 'সার্ভার সংযোগে সমস্যা! আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[#010409] overflow-hidden relative p-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-indigo-600/20 rounded-[3rem] blur-2xl opacity-50 transition duration-1000"></div>
        
        <div className="relative bg-[#0d1117]/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 right-0 p-6">
            <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></div>
              <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">SEASON 1</span>
            </div>
          </div>

          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl opacity-50"></div>
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 p-[2px] shadow-2xl">
                <div className="w-full h-full bg-[#0d1117] rounded-[1.4rem] flex items-center justify-center overflow-hidden">
                  <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-4.514A9.01 9.01 0 0012 20.354V12m0 0V4m0 0a4 4 0 100 8m0-8a4 4 0 110 8" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-1 leading-tight">ICT OLYMPIAD<br/><span className="text-cyan-500 text-3xl">SEASON 1</span></h1>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase mt-2">STUDENT PORTAL</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Registration ID</label>
              <input
                type="text"
                placeholder="Ex: ICT-S1-2025-0"
                value={regId}
                disabled={loading}
                onChange={(e) => setRegId(e.target.value)}
                className="w-full px-8 py-5 rounded-[1.8rem] bg-[#161b22]/50 border border-white/5 text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700 font-bold text-lg disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Roll Number</label>
              <input
                type="text"
                placeholder="Ex: 198"
                value={roll}
                disabled={loading}
                onChange={(e) => setRoll(e.target.value)}
                className="w-full px-8 py-5 rounded-[1.8rem] bg-[#161b22]/50 border border-white/5 text-white focus:border-indigo-500/50 outline-none transition-all placeholder:text-gray-700 font-bold text-lg disabled:opacity-50"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 text-red-400 p-4 rounded-[1.5rem] text-[11px] font-bold border border-red-500/20 text-center animate-shake flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-[1.8rem] font-black shadow-xl transition-all hover:shadow-cyan-500/20 active:scale-[0.96] disabled:opacity-70 flex items-center justify-center overflow-hidden group"
            >
              {loading ? (
                <div className="flex flex-col items-center">
                   <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-xs uppercase tracking-[0.2em]">Authenticating...</span>
                  </div>
                </div>
              ) : (
                <span className="uppercase tracking-[0.3em] text-sm">Access Portal</span>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
             <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Developed By Jakahriya Ahmed</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Login;
