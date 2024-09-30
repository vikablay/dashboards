// import { chartData } from "../chartjs-dashboards/data";

export const getUsersAndMinutes = (
  data: any[]
): {
  user: {
    id: string;
    name: string;
  };
  minutes: number;
}[] => {
  const usersArray = data.map((item) => ({
    id: item.user.id,
    name: item.user.displayValue.substring(
      0,
      item.user.displayValue.lastIndexOf(" ")
    ),
  }));

  const users = usersArray.filter((value, index) => {
    const duplicateIndex = usersArray.findIndex((item) => {
      return JSON.stringify(item) === JSON.stringify(value);
    });
    return index === duplicateIndex;
  });
  // Array.from(new Set(usersArray));
  const array = users.map((user) => {
    const minutes = data
      .filter((item) => item.user.id === user.id)
      .reduce<number>((sum, item) => (sum += item.minutes), 0);
    return { user: user, minutes: minutes };
  });

  return array;
};
