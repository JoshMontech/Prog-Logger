// Assuming you have a function to convert MM:SS format into total seconds
export const convertTimeToSeconds = (timeString: string) => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};