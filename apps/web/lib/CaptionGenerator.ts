export const generateCaption = () => {
  const captions = [
    "Creating the perfect image for you",
    "Fine-tuning the details of your vision",
    "Bringing your creative ideas to life",
    "Conjuring up the tags for your upload",
    "Crafting the perfect blend for image search",
    "Cooking up a visual masterpiece for you",
    "Unleashing the power of ML",
    "Tuning some ML power",
  ];

  return captions[Math.floor(Math.random() * captions.length)];
};
