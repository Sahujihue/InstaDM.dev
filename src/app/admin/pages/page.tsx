'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { INITIAL_CMS_PAGES } from '@/lib/data';
import { CmsPage } from '@/types';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Save, 
  Eye, 
  Clock, 
  Tag, 
  Globe, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminPagesManager() {
  const [pages, setPages] = useState<CmsPage[]>(INITIAL_CMS_PAGES);
  const [search, setSearch] = useState('');
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<CmsPage | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New page draft
  const [newPage, setNewPage] = useState<Partial<CmsPage>>({
    title: '',
    slug: '',
    category: 'custom',
    summary: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    published: true,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('instadm_cms_pages');
      if (saved) {
        setPages(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const savePagesList = (updated: CmsPage[]) => {
    setPages(updated);
    try {
      localStorage.setItem('instadm_cms_pages', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter pages
  const filtered = pages.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
  });

  // Handle Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    const updated = pages.map((p) =>
      p.id === editingPage.id
        ? {
            ...editingPage,
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          }
        : p
    );
    savePagesList(updated);
    setEditingPage(null);
    showToast(`Page "${editingPage.title}" successfully updated!`);
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch {}
  };

  // Handle Create Page
  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPage.title || !newPage.slug) return;

    const cleanSlug = newPage.slug.toLowerCase().replace(/[^a-z0-9-_]/g, '');
    const created: CmsPage = {
      id: `page-${Date.now()}`,
      slug: cleanSlug,
      title: newPage.title,
      category: newPage.category || 'custom',
      summary: newPage.summary || '',
      content: newPage.content || 'Content coming soon...',
      metaTitle: newPage.metaTitle || `${newPage.title} | InstaDM`,
      metaDescription: newPage.metaDescription || newPage.summary || '',
      metaKeywords: newPage.metaKeywords || '',
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      published: newPage.published ?? true
    };

    const updated = [...pages, created];
    savePagesList(updated);
    setIsCreateOpen(false);
    setNewPage({
      title: '',
      slug: '',
      category: 'custom',
      summary: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      published: true
    });
    showToast(`New page "${created.title}" published!`);
    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {}
  };

  // Handle Delete Page
  const handleConfirmDelete = () => {
    if (!pageToDelete) return;
    const updated = pages.filter((p) => p.id !== pageToDelete.id);
    savePagesList(updated);
    showToast(`Page "${pageToDelete.title}" deleted.`);
    setPageToDelete(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            Content Management System (CMS)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pages, Legal &amp; Policy Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit content for Privacy Policy, Terms, About, Refund, and Contact, or create new custom SEO pages.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pages by title or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filtered.length} total pages</span>
      </div>

      {/* Pages Grid / Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">Page Name &amp; URL</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">SEO Meta Title</th>
                <th className="py-4 px-6">Last Updated</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => {
                const liveUrl = p.slug === 'privacy' || p.slug === 'terms' || p.slug === 'refund' || p.slug === 'about' || p.slug === 'contact' || p.slug === 'disclaimer'
                  ? `/${p.slug}`
                  : `/p/${p.slug}`;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">{p.title}</span>
                          <span className="text-[11px] font-mono text-purple-600 font-semibold">{liveUrl}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      {p.published ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-bold text-[10px] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 max-w-xs">
                      <span className="text-slate-700 font-medium truncate block">{p.metaTitle || '—'}</span>
                    </td>

                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {p.lastUpdated}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <Link
                          href={liveUrl}
                          target="_blank"
                          title="View Live Page"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setEditingPage({ ...p })}
                          title="Edit Page Content"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPageToDelete(p)}
                          title="Delete Page"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT PAGE MODAL */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Edit Page: {editingPage.title}</h3>
                  <p className="text-xs text-purple-600 font-mono">/{editingPage.slug}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    required
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingPage.category}
                    onChange={(e) => setEditingPage({ ...editingPage, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none uppercase font-semibold text-slate-700"
                  >
                    <option value="legal">Legal Policy</option>
                    <option value="company">Company</option>
                    <option value="support">Support</option>
                    <option value="custom">Custom Page</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingPage.published}
                      onChange={(e) => setEditingPage({ ...editingPage, published: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span>Publish Page Live</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Summary / Lead Paragraph</label>
                <input
                  type="text"
                  value={editingPage.summary}
                  onChange={(e) => setEditingPage({ ...editingPage, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              {/* Page Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Page Body Content (Markdown Supported)</label>
                <textarea
                  rows={8}
                  required
                  value={editingPage.content}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              {/* SEO Meta Fields */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900 block">SEO Meta Configuration</span>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">SEO Meta Title Tag</label>
                  <input
                    type="text"
                    value={editingPage.metaTitle}
                    onChange={(e) => setEditingPage({ ...editingPage, metaTitle: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={editingPage.metaDescription}
                    onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">SEO Keywords</label>
                  <input
                    type="text"
                    value={editingPage.metaKeywords}
                    onChange={(e) => setEditingPage({ ...editingPage, metaKeywords: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW PAGE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Create New Custom Page</h3>
                  <p className="text-xs text-slate-400">Publish a new URL e.g. /p/security or /p/gdpr</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Platform Security &amp; Compliance"
                    value={newPage.title}
                    onChange={(e) => {
                      const t = e.target.value;
                      const genSlug = t.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                      setNewPage({ ...newPage, title: t, slug: newPage.slug ? newPage.slug : genSlug });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">/p/</span>
                    <input
                      type="text"
                      required
                      placeholder="security-compliance"
                      value={newPage.slug}
                      onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newPage.category}
                    onChange={(e) => setNewPage({ ...newPage, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none uppercase font-semibold text-slate-700"
                  >
                    <option value="custom">Custom Page</option>
                    <option value="legal">Legal Policy</option>
                    <option value="company">Company</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={newPage.published}
                      onChange={(e) => setNewPage({ ...newPage, published: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span>Publish Immediately</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Summary / Lead Paragraph</label>
                <input
                  type="text"
                  placeholder="Short introductory summary for this page..."
                  value={newPage.summary}
                  onChange={(e) => setNewPage({ ...newPage, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Page Body Content (Markdown)</label>
                <textarea
                  rows={8}
                  required
                  placeholder="Write page content in markdown format..."
                  value={newPage.content}
                  onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              {/* SEO Meta Fields */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900 block">SEO Meta Configuration</span>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">SEO Meta Title Tag</label>
                  <input
                    type="text"
                    placeholder="Page Title | InstaDM"
                    value={newPage.metaTitle}
                    onChange={(e) => setNewPage({ ...newPage, metaTitle: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">SEO Meta Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description for search engines..."
                    value={newPage.metaDescription}
                    onChange={(e) => setNewPage({ ...newPage, metaDescription: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">SEO Keywords</label>
                  <input
                    type="text"
                    placeholder="comma, separated, keywords"
                    value={newPage.metaKeywords}
                    onChange={(e) => setNewPage({ ...newPage, metaKeywords: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Publish Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {pageToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-lg">Delete Page?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to permanently delete the page <strong className="text-slate-800">&quot;{pageToDelete.title}&quot;</strong> ({pageToDelete.slug})?
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPageToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
