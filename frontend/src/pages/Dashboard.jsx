import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import api from '../services/api';

const Dashboard = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                // Mocking data for now until we connect backend list
                // const response = await api.get('/links');
                // setLinks(response.data);
                setLinks([
                    { id: 1, title: 'My Portfolio', short_code: 'portf', original_url: 'https://myportfolio.com', clicks: 124, created_at: '2023-10-24' },
                    { id: 2, title: 'Project Demo', short_code: 'demo-v1', original_url: 'https://github.com/demo/project', clicks: 45, created_at: '2023-11-02' },
                ]); 
            } catch (error) {
                console.error("Failed to fetch links", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900">
            <Sidebar />
            
            <div className="p-4 sm:ml-64">
                <div className="p-8 mt-4 rounded-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                            <p className="text-gray-400 mt-1">Manage your links and view their performance.</p>
                        </div>
                        <div className="w-auto">
                            <Button variant="primary">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Create New Link
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                            <div className="text-gray-400 text-sm font-medium mb-1">Total Clicks</div>
                            <div className="text-3xl font-bold text-white">1,245</div>
                            <div className="text-green-400 text-xs mt-2 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                +12% from last month
                            </div>
                        </div>
                         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                            <div className="text-gray-400 text-sm font-medium mb-1">Active Links</div>
                            <div className="text-3xl font-bold text-white">12</div>
                            <div className="text-gray-500 text-xs mt-2">
                                3 created this week
                            </div>
                        </div>
                         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                            <div className="text-gray-400 text-sm font-medium mb-1">Avg. CTR</div>
                            <div className="text-3xl font-bold text-white">4.8%</div>
                             <div className="text-green-400 text-xs mt-2 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                +2.1% improvement
                            </div>
                        </div>
                    </div>

                    {/* Links List */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
                        <div className="p-6 border-b border-slate-700">
                            <h2 className="text-xl font-bold text-white">Your Links</h2>
                        </div>
                        
                        {loading ? (
                            <div className="p-8 text-center text-gray-400">Loading links...</div>
                        ) : links.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-400">
                                    <thead className="text-xs text-gray-400 uppercase bg-slate-700/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Short Link</th>
                                            <th scope="col" className="px-6 py-3">Original URL</th>
                                            <th scope="col" className="px-6 py-3 text-center">Clicks</th>
                                            <th scope="col" className="px-6 py-3 text-center">Date</th>
                                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {links.map((link) => (
                                            <tr key={link.id} className="bg-slate-800 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-white">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center mr-3">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                                        </div>
                                                        <span className="text-violet-300">gem.Link/{link.short_code}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs truncate">
                                                    {link.original_url}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="bg-slate-700 text-gray-300 py-1 px-3 rounded-full text-xs font-bold">
                                                        {link.clicks}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {link.created_at}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="font-medium text-blue-400 hover:underline mr-3">Edit</button>
                                                    <button className="font-medium text-red-400 hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                             <div className="p-12 text-center">
                                <div className="inline-block p-4 rounded-full bg-slate-700/50 mb-4 text-gray-500">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">No links created yet</h3>
                                <p className="text-gray-400 mb-6">Get started by creating your first short link.</p>
                                <Button variant="primary" className="w-auto">Create Link</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
