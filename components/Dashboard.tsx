import React from 'react';
import { Student } from '../types';

interface DashboardProps {
  student: Student;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ student, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#010409] flex flex-col font-['Inter'] text-gray-300 pb-12">
      <nav className="bg-[#0d1117]/95 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 rounded-lg text-white font-black text-[9px]">ICT</div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-xs text-white uppercase tracking-tight">ICT OLYMPIAD</span>
              <span className="text-[7px] text-cyan-500 font-black tracking-widest uppercase">SEASON 1</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-500 font-black hover:bg-red-500/20 transition-all flex items-center space-x-1.5 border border-red-500/10 text-[10px]"
          >
            <span className="tracking-widest uppercase">Logout</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-6">
        
        {/* Main Profile Header */}
        <div className="bg-[#0d1117] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5 relative">
          <div className="h-24 md:h-40 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 relative">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          </div>
          
          <div className="px-6 md:px-12 pb-8 -mt-12 md:-mt-20 flex flex-col md:flex-row items-center md:items-end md:space-x-8 text-center md:text-left relative z-10">
            <div className="relative shrink-0 mb-4 md:mb-0">
              <div className="w-24 h-32 md:w-44 md:h-56 bg-[#020617] rounded-[40%/50%] p-1 border-2 border-cyan-400 shadow-xl overflow-hidden">
                <img src={student.photoUrl} className="w-full h-full object-cover rounded-[38%/48%]" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0 pb-2">
              <p className="text-cyan-500 font-black text-[10px] uppercase tracking-widest mb-1">{student.registrationId}</p>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-none truncate mb-1">{student.name}</h2>
              <p className="text-sm md:text-xl font-bold text-cyan-400/70 truncate">{student.bnName}</p>
            </div>

            <div className="hidden md:flex space-x-3 pb-2">
                <StatBadge label="Roll" value={student.rollNumber} color="cyan" />
                <StatBadge label="Rank" value={student.rank || 'N/A'} color="blue" />
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <InfoCard icon="🏆" label="National Rank" value={student.rank || 'Not Ranked'} />
           <InfoCard icon="🎯" label="Selection Score" value={student.score || '0.00'} />
           <InfoCard icon="🏫" label="Institution" value={student.school} />
           <InfoCard icon="📚" label="Class/Category" value={`${student.class} - ${student.category}`} />
        </div>

        {/* Participation Rounds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-[#0d1117] p-6 rounded-[2rem] border-2 border-cyan-500/30 shadow-lg flex flex-col items-center text-center space-y-4">
              <div className="text-3xl">📝</div>
              <h4 className="text-lg font-black text-white uppercase">Selection Round</h4>
              <div className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">Selected</div>
              <button className="w-full py-3 bg-cyan-500 text-black rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-400 transition-colors">Start Exam</button>
           </div>
           <RoundLocked title="Semi-Final" />
           <RoundLocked title="Grand Final" />
        </div>
      </main>

      <footer className="mt-auto py-8 text-center text-slate-600 text-[10px] font-black uppercase tracking-widest">
         © 2025 ICT OLYMPIAD PORTAL • DEV: JAKAHRIYA AHMED
      </footer>
    </div>
  );
};

const StatBadge = ({ label, value, color }: any) => (
  <div className={`px-4 py-2 bg-${color}-500/10 border border-${color}-500/20 rounded-2xl`}>
    <p className={`text-[8px] font-black text-${color}-500 uppercase tracking-widest`}>{label}</p>
    <p className="text-lg font-black text-white">{value}</p>
  </div>
);

const InfoCard = ({ icon, label, value }: any) => (
  <div className="bg-[#0d1117] p-5 rounded-[2rem] border border-white/5 shadow-md group hover:border-cyan-500/30 transition-all">
    <div className="text-2xl mb-3">{icon}</div>
    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</p>
    <p className="text-white font-bold leading-tight line-clamp-2">{value}</p>
  </div>
);

const RoundLocked = ({ title }: any) => (
  <div className="bg-[#0d1117] p-6 rounded-[2rem] border border-white/5 shadow-md flex flex-col items-center text-center space-y-4 opacity-50">
    <div className="text-3xl grayscale">🔒</div>
    <h4 className="text-lg font-black text-slate-500 uppercase">{title}</h4>
    <div className="w-full py-3 bg-slate-800/50 text-slate-600 rounded-xl font-black uppercase text-[10px] tracking-widest">Locked</div>
  </div>
);

export default Dashboard;