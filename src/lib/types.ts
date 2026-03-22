export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category = "hld" | "lld";

export interface ConceptMeta {
  slug: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  order: number;
  estimatedReadTime: number; // in minutes
  icon?: string;
}

export interface ConceptGroup {
  category: Category;
  label: string;
  description: string;
  color: string;
  concepts: ConceptMeta[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
