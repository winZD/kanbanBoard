const buttonConfigs = [
  {
    label: "OK",
    className: "text-green-700 bg-green-100 rounded-xl px-4 py-2",
  },
  {
    label: "Important",
    className: "text-red-700 bg-red-100 rounded-xl px-4 py-2",
  },
  {
    label: "Mex",
    className: "text-violet-700 bg-violet-100 rounded-xl px-4 py-2",
  },
];

export const getRandomButton = () => {
  const randomIndex = Math.floor(Math.random() * buttonConfigs.length);
  return buttonConfigs[randomIndex];
};
