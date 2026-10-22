import { ScamAnalysisResult } from '../types';

const STORAGE_KEY = 'scamshield_history_v1';
const SETTINGS_KEY = 'scamshield_settings_v1';

export interface AppSettings {
  saveHistory: boolean;
  theme: 'dark' | 'system';
}

const defaultSettings: AppSettings = {
  saveHistory: true,
  theme: 'dark',
};

export function getSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
}

export function getHistory(): ScamAnalysisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load history:', err);
    return [];
  }
}

export function saveToHistory(result: ScamAnalysisResult): void {
  const settings = getSettings();
  if (!settings.saveHistory) return;

  try {
    const current = getHistory();
    // Prepend to show latest first, keep up to 100 entries
    const updated = [result, ...current.filter(item => item.referenceId !== result.referenceId)].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to history:', err);
  }
}

export function deleteHistoryItem(referenceId: string): ScamAnalysisResult[] {
  try {
    const current = getHistory();
    const updated = current.filter(item => item.referenceId !== referenceId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete history item:', err);
    return [];
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}

export function exportHistoryAsJson(): void {
  try {
    const data = getHistory();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scamshield_history_export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export history:', err);
  }
}
