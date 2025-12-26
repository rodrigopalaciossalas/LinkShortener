import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import api from '../services/api';

const CreateLinkModal = ({ isOpen, onClose, onLinkCreated }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [title, setTitle] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                original_url: originalUrl,
                title: title
            };

            if (customAlias.trim()) {
                payload.short_code = customAlias.trim();
            }

            const response = await api.post('/links/', payload);
            onLinkCreated(response.data);
            onClose(); // Close modal on success
            // Reset form
            setOriginalUrl('');
            setTitle('');
            setCustomAlias('');
        } catch (err) {
            console.error("Failed to create link", err);
            // Display specific message if available
            setError(err.response?.data?.detail || 'Failed to create link. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full max-w-md p-6 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <h2 className="text-xl font-bold text-white mb-4">Create New Link</h2>
                
                {error && (
                    <div className="p-3 mb-4 text-sm text-red-200 rounded-lg bg-red-900/40 border border-red-800/50">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Destination URL"
                        id="originalUrl"
                        type="url"
                        placeholder="https://example.com/long-url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                    />
                    
                    <Input
                        label="Title (Optional)"
                        id="title"
                        type="text"
                        placeholder="My Awesome Link"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div>
                        <label className="block mb-2 text-sm font-medium text-white">Custom Alias (Optional)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500 text-sm">gem.link/</span>
                            </div>
                            <input
                                type="text"
                                className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-20 p-2.5 placeholder-gray-400"
                                placeholder="my-custom-name"
                                value={customAlias}
                                onChange={(e) => setCustomAlias(e.target.value)}
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-400">Leave empty for a random short link.</p>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Link'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLinkModal;
