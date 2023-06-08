/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'todo-pattern': "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRQb2llzsiGreCPIMo-ZEYnroPs_9ffKwPAg71GTazjDrLp7la5H6K09fMRy2TCOrmE8&usqp=CAU')"
      }
    },
  },
  plugins: [],
  darkMode: "class",
}