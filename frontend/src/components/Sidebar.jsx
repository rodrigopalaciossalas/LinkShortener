import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        )},
        { name: 'Analytics', path: '/analytics', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
        )},
        { name: 'Settings', path: '/settings', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        )},
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-slate-900 border-r border-slate-800" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-slate-900 flex flex-col">
                <div className="flex items-center pl-2.5 mb-8 mt-2">
                    <div className="w-8 h-8 mr-3 bg-gradient-to-br from-violet-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/30">
                        L
                    </div>
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">LinkShortener</span>
                </div>
                
                <ul className="space-y-2 font-medium flex-1">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link to={item.path} className={`flex items-center p-2 rounded-lg group transition-colors duration-200 ${location.pathname === item.path ? 'bg-slate-800 text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}>
                                {item.icon}
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="pt-4 mt-4 space-y-2 border-t border-slate-700">
                     <button onClick={handleLogout} className="flex items-center w-full p-2 text-gray-400 transition duration-75 rounded-lg hover:bg-slate-800 hover:text-white group">
                        <svg className="flex-shrink-0 w-5 h-5 transition duration-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span className="ml-3">Sign Out</span>
                    </button>
                    
                    <div className="flex items-center p-2 mt-4 space-x-3 rounded-lg bg-slate-800/50">
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold border border-violet-500/30">
                            U
                        </div>
                        <div>
                             <div className="text-sm font-medium text-white">User Account</div>
                             <div className="text-xs text-gray-400">Pro Plan</div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
