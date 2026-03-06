export const MAJOR_CATEGORIES = [
  {
    id: "algebra_fundamentals",
    name: "Algebra i brojevi",
    topicIds: [
      "percent_proportion",
      "real_numbers",
      "algebraic_expressions",
      "complex_numbers",
      "polynomials",
    ],
  },
  {
    id: "equations_inequalities",
    name: "Jednačine i nejednačine",
    topicIds: [
      "linear_equations",
      "quadratic_equations",
      "quadratic_function",
      "irrational_equations",
      "exponential_equations",
      "logarithm",
    ],
  },
  {
    id: "functions_analysis",
    name: "Funkcije i analitika",
    topicIds: [
      "function_properties",
      "derivatives",
      "limits",
      "sequences",
      "trigonometric_expressions",
      "trigonometric_equations",
    ],
  },
  {
    id: "geometry",
    name: "Geometrija",
    topicIds: ["planimetry", "stereometry", "analytic_geometry"],
  },
  {
    id: "combinatorics_probability",
    name: "Kombinatorika i verovatnoća",
    topicIds: ["combinatorics", "binomial_formula", "probability"],
  },
] as const;

export type MajorCategoryId =
  | "algebra_fundamentals"
  | "equations_inequalities"
  | "functions_analysis"
  | "geometry"
  | "combinatorics_probability";

export const majorCategoryByTopic: Record<string, MajorCategoryId> = MAJOR_CATEGORIES.reduce((acc, cat) => {
  for (const topicId of cat.topicIds) {
    acc[topicId] = cat.id;
  }
  return acc;
}, {} as Record<string, MajorCategoryId>);

export const majorCategoryOrder = MAJOR_CATEGORIES.map((c) => c.id);

export function getMajorCategoryFromTopic(topicId: string): MajorCategoryId | null {
  return majorCategoryByTopic[topicId] ?? null;
}

export function majorCategoryLabel(categoryId: string): string {
  return MAJOR_CATEGORIES.find((cat) => cat.id === categoryId)?.name || "Ostalo";
}

export function getMajorCategoryTopicIds(categoryId: string): string[] {
  return MAJOR_CATEGORIES.find((cat) => cat.id === categoryId)?.topicIds || [];
}
