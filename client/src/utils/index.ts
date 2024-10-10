export const getInitials = (string: string) => {
  const fallback = `${string?.split(" ")[0].slice(0, 1)}${string
    ?.split(" ")[1]
    .slice(0, 1)}`;

  return fallback;
};
