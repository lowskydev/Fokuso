// src/components/pages/FlashcardPage.jsx
"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  BookOpen,
  Target,
  TrendingUp,
  Plus,
  Play,
  BarChart3,
  Calendar,
  Zap,
} from "lucide-react";
import useFlashcardStore from "@/store/useFlashcardStore";
import { toast } from "sonner";
// Import the new CreateDeckModal component at the top
import { CreateDeckModal } from "@/components/flashcards/CreateDeckModal";

function FlashcardsPage() {
  const navigate = useNavigate();

  const {
    decks,
    flashcards,
    isLoading,
    error,
    reviewsToday,
    dailyStats,
    fetchDecks,
    fetchFlashcards,
    fetchTodayStats,
    createDeck,
    clearError,
  } = useFlashcardStore();

  // Local state for creating decks
  // const [isCreatingDeck, setIsCreatingDeck] = useState(false)

  useEffect(() => {
    // Fetch decks, flashcards, and today's stats when component mounts
    fetchDecks();
    fetchFlashcards();
    fetchTodayStats();
  }, [fetchDecks, fetchFlashcards, fetchTodayStats]);

  useEffect(() => {
    // Show error toast if there's an error
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  // Calculate stats from real data
  const totalCards = flashcards.length;
  const totalMastered = flashcards.filter((card) => {
    return card.interval_display && card.interval_display.includes("day");
  }).length;

  const overallProgress =
    totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0;

  // Update the handleCreateDeck function to work with the modal
  const handleCreateDeck = async (deckData) => {
    try {
      await createDeck(deckData);
      toast.success("Deck created successfully!");
    } catch (error) {
      toast.error("Failed to create deck");
      throw error; // Re-throw to let modal handle the error
    }
  };

  const handleDeckClick = (deckId) => {
    navigate(`/dashboard/flashcards/deck/${deckId}`);
  };

  const handleLearnClick = (e, deckId) => {
    e.stopPropagation();
    navigate(`/dashboard/flashcards/learn/${deckId}`);
  };

  const getDeckStats = (deckId) => {
    const deckCards = flashcards.filter((card) => card.deck === deckId);
    const cardCount = deckCards.length;

    const today = new Date().toDateString();
    const masteredToday = deckCards.filter((card) => {
      const wasMasteredToday =
        card.interval_display &&
        card.interval_display.includes("day") &&
        card.updated_at &&
        new Date(card.updated_at).toDateString() === today;
      return wasMasteredToday;
    }).length;

    // Total mastered cards (regardless of when they were mastered)
    const masteredCards = deckCards.filter(
      (card) => card.interval_display && card.interval_display.includes("day")
    ).length;

    const progress =
      cardCount > 0 ? Math.round((masteredCards / cardCount) * 100) : 0;

    const allMastered = masteredCards === cardCount;

    return {
      cardCount,
      masteredToday, // This is the new "today" count for each deck
      masteredCards,
      progress,
      allMastered,
    };
  };

  if (isLoading && decks.length === 0) {
    return (
      <div className="space-y-8 pb-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your flashcards...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Flashcards
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Master knowledge through spaced repetition
          </p>
        </div>
        {/* In the header section, replace the existing Create Deck button with: */}
        <CreateDeckModal onCreateDeck={handleCreateDeck} />
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold text-foreground">
                  {totalCards}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reviewed Today</p>
                <p className="text-2xl font-bold text-foreground">
                  {reviewsToday}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Target className="w-5 h-5 text-green-500" />
              </div>
              <div>
                {/* Display accuracy percentage. if no dailyStats just display 100% */}
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold text-foreground">
                  {dailyStats ? `${dailyStats.accuracy_percentage}%` : "100%"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Overall Progress
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {overallProgress}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Progress - Updated to use reviews today */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Daily Goal Progress</span>
              <span className="font-medium">{reviewsToday}/50 cards</span>
            </div>
            <Progress value={(reviewsToday / 50) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {reviewsToday >= 50
                ? "🎉 Great job! You've reached your daily goal!"
                : `${50 - reviewsToday} more cards to reach your daily goal`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Flashcard Decks */}
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            Your Decks ({decks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {decks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">
                No flashcard decks yet
              </p>
              <p className="text-muted-foreground/60 mb-4">
                Create your first deck to get started
              </p>
              <Button onClick={handleCreateDeck} disabled={false}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Deck
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck, index) => {
                const stats = getDeckStats(deck.id);
                const colors = [
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-yellow-500",
                  "bg-orange-500",
                  "bg-red-500",
                  "bg-purple-500",
                ];
                const color = colors[index % colors.length]; // Cycle through colors based on index

                return (
                  <Card
                    key={deck.id}
                    className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
                    onClick={() => handleDeckClick(deck.id)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Deck Header */}
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-xl ${color}/20`}>
                            <Brain
                              className={`w-6 h-6 text-black dark:text-white`}
                              style={{ filter: "brightness(0.8)" }}
                            />
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Progress
                            </p>
                            <p className="text-lg font-bold text-foreground">
                              {stats.progress}%
                            </p>
                          </div>
                        </div>

                        {/* Deck Info */}
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {deck.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Created{" "}
                            {new Date(deck.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <Progress value={stats.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{stats.masteredCards} mastered</span>
                            <span>{stats.cardCount} total</span>
                          </div>
                        </div>

                        {/* Last Updated */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>
                            Updated:{" "}
                            {new Date(deck.updated_at).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Action Button */}
                        <Button
                          onClick={(e) => handleLearnClick(e, deck.id)}
                          disabled={stats.allMastered}
                          className={`w-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 ${
                            stats.allMastered
                              ? "bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed hover:bg-gray-400 dark:hover:bg-gray-600"
                              : "bg-primary hover:bg-primary/90 text-primary-foreground"
                          }`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {stats.allMastered
                            ? "Nothing to Learn!"
                            : "Learn Now"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default FlashcardsPage;
