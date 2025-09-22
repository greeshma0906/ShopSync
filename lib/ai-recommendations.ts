// AI Recommendation Engine for Aurea
// This would integrate with actual AI services in production

export interface StyleProfile {
  colors: string[];
  styles: string[];
  bodyType?: string;
  preferences: string[];
  budget: number;
}

export interface RecommendationContext {
  userProfile?: StyleProfile;
  currentItems?: any[];
  occasion?: string;
  season?: string;
}

export interface Recommendation {
  itemId: string;
  confidence: number;
  reasons: string[];
  category: string;
  matchScore: number;
}

export class AIRecommendationEngine {
  // Simulate AI analysis of uploaded photos
  static async analyzePhotos(photos: File[]): Promise<StyleProfile> {
    // In production, this would call actual AI vision APIs
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing time

    return {
      colors: ["navy", "white", "beige", "black"],
      styles: ["minimalist", "classic", "professional"],
      bodyType: "athletic",
      preferences: ["sustainable", "versatile", "quality"],
      budget: 200,
    };
  }

  // Generate capsule wardrobe recommendations
  static async generateCapsuleRecommendations(
    baseItems: any[],
    context: RecommendationContext
  ): Promise<Recommendation[]> {
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock recommendations based on base items
    return [
      {
        itemId: "rec-1",
        confidence: 92,
        reasons: [
          "Complements your existing navy blazer",
          "Versatile for multiple outfit combinations",
          "Within your specified budget",
        ],
        category: "tops",
        matchScore: 92,
      },
      {
        itemId: "rec-2",
        confidence: 88,
        reasons: [
          "Perfect neutral to pair with colorful pieces",
          "High-quality fabric matches your preferences",
          "Creates 5+ new outfit combinations",
        ],
        category: "bottoms",
        matchScore: 88,
      },
    ];
  }

  // Generate friend gift recommendations
  static async generateGiftRecommendations(
    friendPhotos: File[],
    friendProfile: any
  ): Promise<Recommendation[]> {
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [
      {
        itemId: "gift-1",
        confidence: 95,
        reasons: [
          "Matches their love for floral patterns",
          "Complements their warm color palette",
          "Perfect for their elegant style",
        ],
        category: "accessories",
        matchScore: 95,
      },
    ];
  }

  // Analyze style compatibility between items
  static calculateStyleCompatibility(item1: any, item2: any): number {
    // Mock compatibility calculation
    const colorCompatibility = this.calculateColorCompatibility(
      item1.color,
      item2.color
    );
    const styleCompatibility = this.calculateStyleCompatibility(
      item1.style,
      item2.style
    );

    return (colorCompatibility + styleCompatibility) / 2;
  }

  private static calculateColorCompatibility(
    color1: string,
    color2: string
  ): number {
    // Simplified color compatibility logic
    const neutrals = ["white", "black", "gray", "beige", "navy"];

    if (neutrals.includes(color1) || neutrals.includes(color2)) {
      return 90; // Neutrals go with everything
    }

    if (color1 === color2) {
      return 70; // Same color can work but not always ideal
    }

    return 60; // Default compatibility
  }
}

// Utility functions for recommendation display
export const formatRecommendationReasons = (reasons: string[]): string => {
  return reasons.join(" • ");
};

export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 90) return "text-green-500";
  if (confidence >= 75) return "text-yellow-500";
  return "text-orange-500";
};

export const getMatchScoreBadgeVariant = (
  score: number
): "default" | "secondary" | "outline" => {
  if (score >= 90) return "default";
  if (score >= 75) return "secondary";
  return "outline";
};
