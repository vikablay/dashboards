import { chartData } from "../chartjs-dashboards/data";

export const getProjectssAndMinutes = (): {
  project: {
    id: string;
    name: string;
  };
  minutes: number;
}[] => {
  //   const array = [];
  const projectsArray = chartData.reduce<
    {
      id: string;
      name: string;
    }[]
  >((acc, item) => {
    if (item.smrProjects)
      acc.push({
        id: item.smrProjects.id,
        name: item.smrProjects.displayValue,
      });
    return acc;
  }, []);

  const projects = projectsArray.filter((value, index) => {
    const duplicateIndex = projectsArray.findIndex((item) => {
      return JSON.stringify(item) === JSON.stringify(value);
    });
    return index === duplicateIndex;
  });
  // Array.from(new Set(usersArray));
  const array = projects.map((project) => {
    const minutes = chartData
      .filter((item) => item.smrProjects?.id === project.id)
      .reduce<number>((sum, item) => (sum += item.minutes), 0);
    return { project: project, minutes: minutes };
  });
  console.log("🚀 ~ getUsersAndMinutes ~ users:", projects, array);
  return array;
};
