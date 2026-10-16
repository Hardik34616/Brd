"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { demoBRD, type ProjectStatus } from "@/lib/demo-data";
import { languages, type LanguageCode, type TranslationKey, translate } from "@/lib/i18n/translations";
export type SavedProject = typeof demoBRD & { createdAt: string; updatedAt: string };
type LanguageContextValue = { language: LanguageCode; setLanguage: (language: LanguageCode) => void; t: (key: TranslationKey) => string; languageLabel: string };
type ProjectContextValue = { projects: SavedProject[]; addProject: (project?: Partial<SavedProject>) => SavedProject; getProject: (id: string) => SavedProject | undefined };
const LanguageContext = createContext<LanguageContextValue | null>(null);
const ProjectContext = createContext<ProjectContextValue | null>(null);
export function AppProviders({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [projects, setProjects] = useState<SavedProject[]>([]);
  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("bhashabrd-language") as LanguageCode | null;
    const storedProjects = window.localStorage.getItem("bhashabrd-projects");
    // Client-only persistence is hydrated after the first consistent server render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedLanguage && languages.some((item) => item.code === storedLanguage)) setLanguageState(storedLanguage);
    if (storedProjects) { try { setProjects(JSON.parse(storedProjects) as SavedProject[]); } catch { setProjects([]); } }
  }, []);
  const setLanguage = useCallback((next: LanguageCode) => { setLanguageState(next); window.localStorage.setItem("bhashabrd-language", next); }, []);
  const addProject = useCallback((overrides: Partial<SavedProject> = {}) => { const now = new Date().toISOString(); const project = { ...demoBRD, id: "demo-project", title: "Smart Farming Platform", inputLanguage: languages.find((item) => item.code === language)?.label ?? "English", status: "In Review" as ProjectStatus, readinessScore: 92, createdAt: now, updatedAt: now, ...overrides }; setProjects((current) => { const next = [project, ...current.filter((item) => item.id !== project.id)]; window.localStorage.setItem("bhashabrd-projects", JSON.stringify(next)); return next; }); return project; }, [language]);
  const languageValue = useMemo(() => ({ language, setLanguage, t: (key: TranslationKey) => translate(language, key), languageLabel: languages.find((item) => item.code === language)?.label ?? "English" }), [language, setLanguage]);
  const projectValue = useMemo(() => ({ projects, addProject, getProject: (id: string) => projects.find((project) => project.id === id) }), [projects, addProject]);
  return <LanguageContext.Provider value={languageValue}><ProjectContext.Provider value={projectValue}>{children}</ProjectContext.Provider></LanguageContext.Provider>;
}
export function useLanguage() { const value = useContext(LanguageContext); if (!value) throw new Error("useLanguage must be used within AppProviders"); return value; }
export function useProjects() { const value = useContext(ProjectContext); if (!value) throw new Error("useProjects must be used within AppProviders"); return value; }
