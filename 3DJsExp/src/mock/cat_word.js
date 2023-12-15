const cat_word = [
  {
    id: 1,
    category: "food",
    words: [
      { id: 1, word: "cake", weight: 4, absolute: true },
      { id: 2, word: "bank", weight: 2, absolute: false },
      { id: 3, word: "bank", weight: 3, absolute: true },
    ],
  },
  {
    id: 2,
    category: "place",
    words: [
      { id: 1, word: "cake", weight: 4, absolute: false },
      { id: 2, word: "bank", weight: 1, absolute: true },
      { id: 3, word: "cake", weight: 3, absolute: true },
    ],
  },
  { id: 3, category: "food", words: [] },
  {
    id: 4,
    category: "food",
    words: [
      { id: 1, word: "bank", weight: 4, absolute: true },
      { id: 2, word: "bank", weight: 4, absolute: true },
    ],
  },
  {
    id: 5,
    category: "food",
    words: [
      { id: 1, word: "bank", weight: 2, absolute: true },
      { id: 2, word: "bank", weight: 5, absolute: false },
    ],
  },
  {
    id: 6,
    category: "place",
    words: [
      { id: 1, word: "bank", weight: 1, absolute: true },
      { id: 2, word: "cake", weight: 0, absolute: false },
    ],
  },
  {
    id: 7,
    category: "food",
    words: [{ id: 1, word: "bank", weight: 3, absolute: true }],
  },
  {
    id: 8,
    category: "food",
    words: [
      { id: 1, word: "pie", weight: 0, absolute: true },
      { id: 2, word: "pie", weight: 5, absolute: false },
      { id: 3, word: "pie", weight: 1, absolute: false },
    ],
  },
  {
    id: 9,
    category: "place",
    words: [{ id: 1, word: "pie", weight: 3, absolute: true }],
  },
  { id: 10, category: "food", words: [] },
];

export default cat_word;
