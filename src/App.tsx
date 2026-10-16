import React, { useState, useEffect } from 'react';
import { 
  PersonaId, 
  InterestId, 
  PaceId, 
  Language, 
  ExhibitMode, 
  ExhibitItem 
} from './types/expo';
import { generateCuratedJourney, ALL_AREA1_EXHIBITS } from './data/exhibitionData';
import { Header } from './components/Header';
import { OnboardingScreen } from './components/OnboardingScreen';
import { MainDashboard } from './components/MainDashboard';
import { ExhibitModal } from './components/ExhibitModal';
import { PostVisitScreen } from './components/PostVisitScreen';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'dashboard' | 'post_visit'>('onboarding');
  const [language, setLanguage] = useState<Language>('zh'); // default to Chinese as per Taiwan Design Expo context, with easy 1-click EN toggle
  const [selectedPersona, setSelectedPersona] = useState<PersonaId>('first_timer');
  const [selectedInterest, setSelectedInterest] = useState<InterestId>('local_culture');
  const [selectedPace, setSelectedPace] = useState<PaceId>('moderate');
  const [exhibitMode, setExhibitMode] = useState<ExhibitMode>('highlights');

  // Saved insights, visited exhibits & micro-poll state
  const [savedInsightIds, setSavedInsightIds] = useState<string[]>(['exhibit_a1']);
  const [visitedExhibitIds, setVisitedExhibitIds] = useState<string[]>(['exhibit_a1']);
  const [pollAnswers, setPollAnswers] = useState<Record<string, string>>({
    exhibit_a1: 'water',
  });

  // Modal & Audio player state
  const [selectedExhibitModal, setSelectedExhibitModal] = useState<ExhibitItem | null>(null);
  const [activeAudioExhibitId, setActiveAudioExhibitId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Compute the tailored curated journey dynamically
  const journey = generateCuratedJourney(selectedPersona, selectedInterest, selectedPace);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));
  };

  const handleToggleVisited = (exhibitId: string) => {
    setVisitedExhibitIds(prev => 
      prev.includes(exhibitId) ? prev.filter(id => id !== exhibitId) : [...prev, exhibitId]
    );
  };

  const handleMarkVisited = (exhibitId: string) => {
    setVisitedExhibitIds(prev => prev.includes(exhibitId) ? prev : [...prev, exhibitId]);
  };

  const handleToggleSaveInsight = (exhibitId: string) => {
    setSavedInsightIds(prev => {
      const exists = prev.includes(exhibitId);
      if (!exists) {
        handleMarkVisited(exhibitId);
        return [...prev, exhibitId];
      }
      return prev.filter(id => id !== exhibitId);
    });
  };

  const handleSelectExhibit = (exhibit: ExhibitItem) => {
    setSelectedExhibitModal(exhibit);
    handleMarkVisited(exhibit.id);
  };

  const handleVotePoll = (exhibitId: string, optionId: string) => {
    setPollAnswers(prev => ({ ...prev, [exhibitId]: optionId }));
  };

  const handleToggleAudio = (exhibitId: string) => {
    if (activeAudioExhibitId === exhibitId) {
      setIsPlayingAudio(prev => !prev);
    } else {
      setActiveAudioExhibitId(exhibitId);
      setIsPlayingAudio(true);
    }
  };

  const handleStopAudio = () => {
    setIsPlayingAudio(false);
    setActiveAudioExhibitId(null);
  };

  const activeAudioExhibit = ALL_AREA1_EXHIBITS.find(ex => ex.id === activeAudioExhibitId) || null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-[#D9532F]/20 selection:text-stone-900 flex flex-col">
      {/* Top Bar Contract (Wordmark · Links · CTA) */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        selectedPersonaId={selectedPersona}
        savedInsightsCount={savedInsightIds.length}
      />

      {/* Screen Views */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'onboarding' && (
          <OnboardingScreen
            language={language}
            selectedPersona={selectedPersona}
            selectedInterest={selectedInterest}
            selectedPace={selectedPace}
            onSelectPersona={setSelectedPersona}
            onSelectInterest={setSelectedInterest}
            onSelectPace={setSelectedPace}
            onGenerate={() => {
              setCurrentScreen('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'dashboard' && (
          <MainDashboard
            journey={journey}
            language={language}
            exhibitMode={exhibitMode}
            onToggleExhibitMode={setExhibitMode}
            savedInsightIds={savedInsightIds}
            onToggleSaveInsight={handleToggleSaveInsight}
            visitedIds={visitedExhibitIds}
            onToggleVisited={handleToggleVisited}
            onSelectExhibit={handleSelectExhibit}
            onNavigateToPostVisit={() => {
              setCurrentScreen('post_visit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReCurate={() => setCurrentScreen('onboarding')}
            activeAudioExhibitId={activeAudioExhibitId}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={handleToggleAudio}
          />
        )}

        {currentScreen === 'post_visit' && (
          <PostVisitScreen
            journey={journey}
            language={language}
            savedInsightIds={savedInsightIds}
            visitedExhibitIds={visitedExhibitIds}
            onBackToDashboard={() => {
              setCurrentScreen('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRestartJourney={() => {
              setCurrentScreen('onboarding');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Contextual Exhibit Interpretation Modal */}
      {selectedExhibitModal && (
        <ExhibitModal
          exhibit={selectedExhibitModal}
          onClose={() => setSelectedExhibitModal(null)}
          language={language}
          onToggleLanguage={toggleLanguage}
          selectedPersonaId={selectedPersona}
          isSaved={savedInsightIds.includes(selectedExhibitModal.id)}
          onToggleSave={handleToggleSaveInsight}
          pollAnswer={pollAnswers[selectedExhibitModal.id]}
          onVotePoll={handleVotePoll}
          isPlayingAudio={activeAudioExhibitId === selectedExhibitModal.id && isPlayingAudio}
          onToggleAudio={handleToggleAudio}
        />
      )}

      {/* Floating Mini Audio Player when audio is active and modal is closed */}
      {!selectedExhibitModal && activeAudioExhibit && isPlayingAudio && (
        <AudioPlayerFloating
          exhibit={activeAudioExhibit}
          isPlaying={isPlayingAudio}
          onTogglePlay={() => setIsPlayingAudio(prev => !prev)}
          onClose={handleStopAudio}
          language={language}
          onOpenModal={() => setSelectedExhibitModal(activeAudioExhibit)}
        />
      )}
    </div>
  );
}
