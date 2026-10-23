import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Building2 } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: { username: string; name: string; designation: string }) => void;
  language: 'gu' | 'en';
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, language }) => {
  const [username, setUsername] = useState('superior');
  const [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      // Validate credentials: username "superior", password "1234"
      const cleanUser = username.trim().toLowerCase();
      if ((cleanUser === 'superior' || cleanUser === 'admin') && password === '1234') {
        onLoginSuccess({
          username: 'superior',
          name: 'Shardaben Shah',
          designation: 'CDPO / Program Superior (Anand)',
        });
      } else {
        setError(
          language === 'gu'
            ? 'અમાન્ય વપરાશકર્તા નામ અથવા પાસવર્ડ! (Username: superior, Password: 1234 વાપરો)'
            : 'Invalid username or password! (Please use Username: superior, Password: 1234)'
        );
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col justify-between selection:bg-[#F27A1A] selection:text-white">
      {/* Top Govt Bar */}
      <div className="bg-[#072B1E] text-white py-2 px-4 border-b border-[#0B6E4F]/40 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-semibold text-emerald-200/80">
            {language === 'gu'
              ? 'ગુજરાત સરકાર • મહિલા અને બાળ વિકાસ વિભાગ (WCDD)'
              : 'GOVERNMENT OF GUJARAT • WOMEN & CHILD DEVELOPMENT DEPARTMENT'}
          </span>
          <span className="font-mono text-[11px] text-[#74BF44] hidden sm:inline">
            ICDS ANAND DISTRICT
          </span>
        </div>
      </div>

      {/* Main Login Card Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
          {/* Brand Header */}
          <div className="bg-gradient-to-b from-[#072B1E] to-[#0A3828] text-white p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white p-2 shadow-lg border-2 border-[#74BF44] flex items-center justify-center mb-3">
              <img
                src="/poshan-setu-logo.svg"
                alt="Poshan Setu Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/poshan-logo.png';
                }}
              />
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight">
              <span className="text-[#F27A1A]">Poshan</span>
              <span className="text-[#74BF44]">Setu</span>
            </h2>
            <p className="text-xs text-emerald-200/90 font-medium mt-1">
              {language === 'gu'
                ? 'સુપરવાઇઝર મોનિટરિંગ પોર્ટલ લૉગિન'
                : 'Superior Monitoring Portal Login'}
            </p>
            <p className="text-[11px] text-emerald-100/60 mt-0.5">
              Child Development Project Officer (CDPO)
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Quick Demo Hint */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-[#0B6E4F] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#0B6E4F]" />
              <div>
                <strong>Authorized Superior Access:</strong>
                <div className="mt-0.5">
                  Username: <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">superior</code> • Password: <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">1234</code>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'gu' ? 'સુપરવાઇઝર વપરાશકર્તા નામ (Username)' : 'Superior Username'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="superior"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B6E4F]/20 focus:border-[#0B6E4F] transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'gu' ? 'પાસવર્ડ (Password)' : 'Security Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B6E4F]/20 focus:border-[#0B6E4F] transition-all bg-slate-50/50 focus:bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-xl bg-[#F27A1A] hover:bg-[#d9670d] text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-60"
              >
                <span>{isLoading ? 'Authenticating...' : (language === 'gu' ? 'પોર્ટલમાં પ્રવેશ કરો' : 'Login to Superior Portal')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="bg-slate-50 p-4 border-t border-slate-100 text-center text-[11px] text-slate-500">
            PoshanSetu CDPO Monitoring System • Anand District Administration
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white py-3 border-t border-slate-200 text-center text-xs text-slate-500">
        Certified WCDD Gujarat Online Portal • 2026
      </div>
    </div>
  );
};
