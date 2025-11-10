import React, { useState, useMemo } from 'react';
import { useTranslations } from '../contexts/LanguageContext';
import { generateCropPlan } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { PlannerIcon } from './IconComponents';

interface PlanSection {
    title: string;
    content: string;
}

const Planner: React.FC = () => {
    const { t, language } = useTranslations();
    const [crop, setCrop] = useState('');
    const [season, setSeason] = useState('');
    const [landSize, setLandSize] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [planResult, setPlanResult] = useState('');
    const [error, setError] = useState('');

    const handleGeneratePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setPlanResult('');
        setError('');
        try {
            const result = await generateCropPlan({ crop, season, landSize, location }, language);
            setPlanResult(result);
        } catch (err) {
            setError('Failed to generate plan. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const planSections = useMemo<PlanSection[]>(() => {
        if (!planResult) return [];
        return planResult.split('### ').slice(1).map(section => {
            const parts = section.split('\n');
            const title = parts[0].trim();
            const content = parts.slice(1).join('\n').trim();
            return { title, content };
        });
    }, [planResult]);

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-bold text-[#0F172A]">{t('planner_title')}</h3>
                <p className="mt-2 text-sm text-gray-600">{t('planner_description')}</p>
                <form onSubmit={handleGeneratePlan} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="crop" className="block text-sm font-medium text-gray-700">{t('planner_form_crop')}</label>
                        <input type="text" id="crop" value={crop} onChange={e => setCrop(e.target.value)} required className="mt-1 input-field" placeholder={t('planner_form_crop_placeholder')} />
                    </div>
                    <div>
                        <label htmlFor="season" className="block text-sm font-medium text-gray-700">{t('planner_form_season')}</label>
                        <input type="text" id="season" value={season} onChange={e => setSeason(e.target.value)} required className="mt-1 input-field" placeholder={t('planner_form_season_placeholder')} />
                    </div>
                    <div>
                        <label htmlFor="landSize" className="block text-sm font-medium text-gray-700">{t('planner_form_land_size')}</label>
                        <input type="text" id="landSize" value={landSize} onChange={e => setLandSize(e.target.value)} required className="mt-1 input-field" placeholder={t('planner_form_land_size_placeholder')} />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('planner_form_location')}</label>
                        <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 input-field" placeholder={t('planner_form_location_placeholder')} />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center bg-[#1F7A6B] text-white py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium hover:bg-teal-800 transition-colors disabled:bg-gray-400">
                            {isLoading ? (
                                <>
                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t('planner_loading')}
                                </>
                            ) : (
                                t('planner_form_button')
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="mt-8">
                {isLoading && (
                    <div className="text-center text-gray-500">
                       <p>{t('planner_loading')}</p>
                    </div>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!isLoading && !planResult && (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                        <PlannerIcon className="mx-auto w-12 h-12 text-gray-300" />
                        <p className="mt-4 text-gray-500">{t('planner_initial_prompt')}</p>
                    </div>
                )}

                {planSections.length > 0 && (
                    <div className="space-y-4">
                        {planSections.map((section, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-md transition-all hover:shadow-lg">
                                 <h4 className="text-lg font-semibold text-[#1F7A6B]">{section.title}</h4>
                                 <div className="prose prose-sm mt-2 max-w-none text-gray-700 prose-ul:list-disc prose-li:ml-4">
                                     <ReactMarkdown>{section.content}</ReactMarkdown>
                                 </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <style>{`
                .input-field {
                    display: block;
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    background-color: #F7FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 0.5rem;
                    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                }
                .input-field:focus {
                    outline: none;
                    --tw-ring-color: #1F7A6B;
                    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                }
            `}</style>
        </div>
    );
};

export default Planner;
