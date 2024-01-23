export const themeSettings = () => {
  return {
    background: "#eb4034",
    sidebar: {
      width: "30%",
      // Add any additional sidebar styles as needed
    },
    content: {
      marginLeft: "30%",
      // Add any additional content styles as needed
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
      active: "bg-gray-100 dark:bg-gray-700",
      collapsed: {
        insideCollapse: "group w-full pl-8 transition duration-75",
        noIcon: "font-bold",
      },
    },
  };
};
