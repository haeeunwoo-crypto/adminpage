import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  BarChart3, 
  Zap, 
  Settings, 
  ChevronRight, 
  Search, 
  Bell, 
  Clock, 
  FileText, 
  Target,
  ExternalLink,
  MessageSquare,
  RefreshCcw,
  ArrowUpRight,
  CreditCard,
  Briefcase,
  TrendingUp,
  Filter,
  UserCheck,
  GraduationCap,
  Layers,
  Megaphone,
  MessageCircle,
  Plus
} from 'lucide-react';

// --- 확장된 Mock Data ---
const PROGRAMS = [
  { id: 'p1', name: "KDT 서비스 기획자 양성 5기", manager: "김커널", type: "취준생", mode: "오프라인", period: "2024.01-2024.06" },
  { id: 'p2', name: "직무 스킬업: 데이터 분석 실무", manager: "이성장", type: "재직자", mode: "온라인", period: "2024.03-2024.04" },
  { id: 'p3', name: "백엔드 개발자 부트캠프 2기", manager: "박운영", type: "취준생", mode: "하이브리드", period: "2024.02-2024.08" },
];

const ANNOUNCEMENTS = [
  { id: 1, programId: 'p1', title: "[필독] 오프라인 출석 체크 방식 변경 안내", date: "2024.03.20", author: "김커널", views: 42, priority: "high" },
  { id: 2, programId: 'all', title: "커널 아카데미 시스템 서버 점검 공지", date: "2024.03.18", author: "SuperAdmin", views: 128, priority: "normal" },
  { id: 3, programId: 'p2', title: "데이터 분석 실무 과제 가이드 배포", date: "2024.03.15", author: "이성장", views: 35, priority: "normal" },
];

const INQUIRIES = [
  { id: 1, programId: 'p1', name: "강민준", category: "결제/행정", title: "내일배움카드 결제 오류 건", date: "2024.03.21", status: "pending" },
  { id: 2, programId: 'p1', name: "송지효", category: "출결", title: "병가로 인한 출석 불인정 문의", date: "2024.03.20", status: "answered" },
  { id: 3, programId: 'p2', name: "이재용", category: "학습/과제", title: "파이썬 라이브러리 설치 오류", date: "2024.03.19", status: "pending" },
];

const STAFF_DATA = [
  { id: 1, name: "정박사", role: "강사", expert: "서비스 기획", programId: "p1", rating: 4.9, status: "강의중" },
  { id: 2, name: "최멘토", role: "멘토", expert: "데이터 분석", programId: "p2", rating: 4.8, status: "대기" },
  { id: 3, name: "강튜터", role: "튜터", expert: "자바스크립트", programId: "p3", rating: 4.7, status: "강의중" },
];

const ONBOARDING_DATA = [
  { id: 1, programId: "p1", name: "강민준", step: "결제확인", card: "1234-****-****", payStatus: "완료", hrdStatus: "대기", autoMsg: "발송완료" },
  { id: 2, programId: "p1", name: "송지효", step: "카드확인", card: "미등록", payStatus: "미결제", hrdStatus: "미등록", autoMsg: "독촉필요" },
  { id: 3, programId: "p2", name: "이재용", step: "행정등록", card: "N/A(재직자)", payStatus: "완료", hrdStatus: "완료", autoMsg: "안내완료" },
];

const ATTENDANCE_DATA = [
  { id: 101, programId: "p1", name: "김철수", type: "온라인", status: "출석", assignment: "제출", autoNudge: "N/A" },
  { id: 102, programId: "p1", name: "이영희", type: "오프라인", status: "지각", assignment: "미제출", autoNudge: "14:00 발송예정" },
  { id: 103, programId: "p2", name: "박지성", type: "온라인", status: "결석", assignment: "미제출", autoNudge: "즉시발송" },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('onboarding'); 
  const [commSubTab, setCommSubTab] = useState('announcement'); // announcement, inquiry
  const [filters, setFilters] = useState({
    program: 'all',
    manager: 'all',
    mode: 'all'
  });

  // 필터링 로직
  const filteredAnnouncements = useMemo(() => {
    return ANNOUNCEMENTS.filter(item => filters.program === 'all' || item.programId === filters.program || item.programId === 'all');
  }, [filters.program]);

  const filteredInquiries = useMemo(() => {
    return INQUIRIES.filter(item => filters.program === 'all' || item.programId === filters.program);
  }, [filters.program]);

  const filteredOnboarding = useMemo(() => {
    return ONBOARDING_DATA.filter(item => (filters.program === 'all' || item.programId === filters.program));
  }, [filters.program]);

  const filteredStaff = useMemo(() => {
    return STAFF_DATA.filter(item => (filters.program === 'all' || item.programId === filters.program));
  }, [filters.program]);

  // Sidebar Component
  const Sidebar = () => (
    <div className="w-64 bg-[#0F172A] text-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10C5 10 15 5 20 15C25 25 35 30 35 30" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round"/>
                <path d="M5 30C5 30 15 35 20 25C25 15 35 10 35 10" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round"/>
            </svg>
        </div>
        <span className="font-bold text-xl tracking-tight">Kernel Academy</span>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto">
        <p className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operation</p>
        <button onClick={() => setActiveTab('onboarding')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'onboarding' ? 'bg-[#F43F5E] text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}>
          <CreditCard size={18} />
          <span className="font-medium">모집 및 온보딩</span>
        </button>
        <button onClick={() => setActiveTab('learning')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'learning' ? 'bg-[#F43F5E] text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}>
          <Calendar size={18} />
          <span className="font-medium">출결 및 학습케어</span>
        </button>

        <p className="px-4 py-2 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resources</p>
        <button onClick={() => setActiveTab('staff')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'staff' ? 'bg-[#F43F5E] text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}>
          <UserCheck size={18} />
          <span className="font-medium">강사 및 멘토 관리</span>
        </button>
        <button onClick={() => setActiveTab('communication')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'communication' ? 'bg-[#F43F5E] text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}>
          <MessageCircle size={18} />
          <span className="font-medium">소통 및 지원 관리</span>
        </button>

        <p className="px-4 py-2 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Outcome</p>
        <button onClick={() => setActiveTab('career')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'career' ? 'bg-[#F43F5E] text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}>
          <Briefcase size={18} />
          <span className="font-medium">커리어 매칭</span>
        </button>
      </nav>

      <div className="p-6 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-rose-400 font-bold border border-slate-600">AD</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate text-slate-200">통합 어드민</p>
            <p className="text-[10px] text-slate-500">Super Admin Mode</p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Page Communication: Announcement & Inquiry ---
  const CommunicationPage = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">소통 및 지원 관리</h2>
          <p className="text-sm text-slate-500">수강생 공지 게시 및 1:1 문의 답변을 통합 관리합니다.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setCommSubTab('announcement')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${commSubTab === 'announcement' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400'}`}
          >
            공지사항 관리
          </button>
          <button 
            onClick={() => setCommSubTab('inquiry')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${commSubTab === 'inquiry' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400'}`}
          >
            1:1 문의 답변
          </button>
        </div>
      </header>

      {commSubTab === 'announcement' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold flex items-center gap-2 text-slate-700">
              <Megaphone size={18} className="text-rose-500" />
              게시된 공지 리스트
            </h3>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800">
              <Plus size={14} /> 새 공지사항 작성
            </button>
          </div>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-8 py-5">제목</th>
                  <th className="px-8 py-5">대상 프로그램</th>
                  <th className="px-8 py-5">작성자</th>
                  <th className="px-8 py-5">날짜</th>
                  <th className="px-8 py-5 text-center">조회수</th>
                  <th className="px-8 py-5">액션</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {filteredAnnouncements.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        {item.priority === 'high' && <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">중요</span>}
                        <span className="font-bold text-slate-700 group-hover:text-rose-600 transition-colors cursor-pointer">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-500">
                      {item.programId === 'all' ? '전체 공지' : PROGRAMS.find(p => p.id === item.programId)?.name}
                    </td>
                    <td className="px-8 py-5 text-slate-600">{item.author}</td>
                    <td className="px-8 py-5 text-slate-400">{item.date}</td>
                    <td className="px-8 py-5 text-center font-mono text-slate-400">{item.views}</td>
                    <td className="px-8 py-5">
                      <button className="text-slate-400 hover:text-slate-900 font-medium">수정</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold flex items-center gap-2 text-slate-700">
              <MessageCircle size={18} className="text-rose-500" />
              문의 및 상담 대기열
            </h3>
            <div className="flex gap-2">
              <span className="text-xs bg-rose-50 text-rose-600 px-3 py-1 rounded-full font-bold">미답변 {filteredInquiries.filter(i => i.status === 'pending').length}건</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredInquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-rose-100 transition-all">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${inquiry.status === 'pending' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                    {inquiry.status === 'pending' ? <Clock size={24} /> : <CheckCircle size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{inquiry.category}</span>
                      <span className="text-xs text-slate-400">{inquiry.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-800">{inquiry.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">수강생: {inquiry.name} | {PROGRAMS.find(p => p.id === inquiry.programId)?.name}</p>
                  </div>
                </div>
                <button className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${inquiry.status === 'pending' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 hover:scale-105' : 'bg-slate-100 text-slate-400'}`}>
                  {inquiry.status === 'pending' ? '답변하기' : '답변수정'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      <Sidebar />
      <main className="pl-64 pr-10 py-10 ml-auto max-w-7xl">
        {/* Top Filter Section (Consistent Across Pages) */}
        <div className="space-y-6 mb-10 sticky top-6 z-40">
          <div className="flex justify-between items-center bg-white/60 backdrop-blur-md p-4 rounded-[2rem] border border-white/40 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative w-72 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="수강생, 공지, 문의 검색..." className="w-full bg-slate-100/50 border-none rounded-2xl py-2 pl-11 pr-4 outline-none text-sm" />
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 rounded-xl">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">OS v2.0</span>
                <span className="text-xs font-bold text-rose-700">관리 모듈 실시간 연동 중</span>
              </div>
            </div>
            <div className="flex items-center gap-4 px-2">
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl"><Bell size={20} /></button>
              <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center font-bold text-white shadow-lg border-2 border-white">K</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
            <div className="flex items-center gap-2 px-3 text-slate-400 border-r border-slate-100 mr-2">
              <Filter size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Global Filters</span>
            </div>
            <div className="flex items-center gap-4 flex-1">
              <div className="flex flex-col">
                <label className="text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Program</label>
                <select 
                  className="text-xs font-bold bg-slate-50 border-none rounded-lg px-3 py-2 outline-none min-w-[200px]"
                  value={filters.program}
                  onChange={(e) => setFilters({...filters, program: e.target.value})}
                >
                  <option value="all">전체 프로그램</option>
                  {PROGRAMS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">Manager</label>
                <select className="text-xs font-bold bg-slate-50 border-none rounded-lg px-3 py-2 outline-none">
                  <option value="all">전체 담당자</option>
                  {[...new Set(PROGRAMS.map(p => p.manager))].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area Rendering */}
        {activeTab === 'onboarding' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "필터링된 지원자", val: filteredOnboarding.length, color: "slate", icon: <Users size={16}/> },
                { label: "카드 미등록", val: filteredOnboarding.filter(d => d.card === '미등록').length, color: "rose", icon: <CreditCard size={16}/> },
                { label: "PG 입금 완료", val: filteredOnboarding.filter(d => d.payStatus === '완료').length, color: "emerald", icon: <CheckCircle size={16}/> },
                { label: "운영 담당자", val: filters.program === 'all' ? "통합 관리" : PROGRAMS.find(p => p.id === filters.program).manager, color: "slate", icon: <UserCheck size={16}/> },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</p>
                    <div className="text-slate-300">{stat.icon}</div>
                  </div>
                  <p className={`text-2xl font-black text-${stat.color}-600`}>{stat.val}{typeof stat.val === 'number' ? '명' : ''}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  <Layers size={20} className="text-rose-500" />
                  프로세스 자동화 리스트
                </h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-8 py-5">이름</th>
                    <th className="px-8 py-5">프로그램</th>
                    <th className="px-8 py-5">결제상태</th>
                    <th className="px-8 py-5">고용24 연동</th>
                    <th className="px-8 py-5">AI Nudge</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50">
                  {filteredOnboarding.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5 font-bold text-slate-700">{item.name}</td>
                      <td className="px-8 py-5">
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {PROGRAMS.find(p => p.id === item.programId)?.name}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.payStatus === '완료' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span className="font-medium">{item.payStatus}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${item.hrdStatus === '완료' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          {item.hrdStatus}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-bold text-rose-500 cursor-pointer hover:underline">{item.autoMsg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-2xl font-bold">Instructor Hub</h2>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800">신규 강사진 등록</button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {filteredStaff.map(staff => (
                <div key={staff.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <GraduationCap className="text-rose-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{staff.name}</h4>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{staff.role} | {staff.expert}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-rose-500">★ {staff.rating}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-50">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">배정 프로그램</span>
                      <span className="font-medium text-slate-700">{PROGRAMS.find(p => p.id === staff.programId)?.name}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-slate-50 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-slate-100">계약 확인</button>
                    <button className="flex-1 py-2 bg-rose-50 rounded-xl text-[11px] font-bold text-rose-500 hover:bg-rose-100">메시지</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'communication' && <CommunicationPage />}
        
        {/* Placeholder for other tabs */}
        {(activeTab === 'learning' || activeTab === 'career') && (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[4rem] border border-dashed border-slate-200">
            <Layers size={48} className="text-slate-200 mb-4" />
            <h3 className="font-bold text-slate-400 italic">"{activeTab.toUpperCase()}" 모듈 분석 중...</h3>
            <p className="text-xs text-slate-300 mt-2">필터링된 데이터에 따라 동적 UI가 렌더링됩니다.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
